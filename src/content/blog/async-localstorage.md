---
title: "Structured Node.js Logging: Tracing Requests with AsyncLocalStorage"
description: "How to automatically bind correlation IDs to async execution paths in Winston/Pino logs without polluting your codebase."
publishedAt: 2024-09-10
---

In distributed architectures—like the high-volume payment layers at Razorpay or core global employment platforms at Deel—logs are useless if they aren't traceable. When a checkout transaction fails or a web-hook times out, you can't just look at isolated errors. You need the complete request lifecycle: from the incoming HTTP route, through multiple databases queries, down to outbound API calls.

To achieve this, every single log line must contain a unique correlation identifier, like a `transaction_id` or `request_id`.

Historically, developers achieved this by passing the ID (or a logger instance) to every single function helper:

```javascript
// The pollution anti-pattern
async function processPayment(order, requestId) {
  logger.info('Initiating payment gateway call', { requestId });
  await gateway.charge(order.amount, requestId);
  logger.info('Payment succeeded', { requestId });
}
```

This pollutes function signatures, breaks separation of concerns, and is highly prone to human error. Fortunately, Node.js provides a built-in API called `AsyncLocalStorage` (similar to ThreadLocal in Java or Context in Go) that propagates state across asynchronous calls.

---

### The Architecture: AsyncLocalStorage (ALS)

`AsyncLocalStorage` creates an execution context that is bound to the current async execution chain. When an HTTP request enters your Express/Koa application, you create a new context store, assign a `requestId` to it, and any function invoked within that execution path can access the store—even after multiple `await` boundaries.

Here is how to set up the context store:

```javascript
// context.js
import { AsyncLocalStorage } from 'async_hooks';

export const contextStore = new AsyncLocalStorage();

export function getRequestId() {
  const store = contextStore.getStore();
  return store?.requestId || null;
}
```

---

### Integrating with a Logger (Winston)

Next, we write custom formatters for our logger (like Winston or Pino) to automatically inspect the active `AsyncLocalStorage` context store and append the correlation ID if it exists.

```javascript
// logger.js
import winston from 'winston';
import { getRequestId } from './context';

const traceFormat = winston.format((info) => {
  const reqId = getRequestId();
  if (reqId) {
    info.requestId = reqId; // Auto-inject correlation ID
  }
  return info;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    traceFormat(),
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});
```

---

### Setting Up the HTTP Middleware Boundary

Now we tie it together using an Express middleware. Each request is wrapped inside the store execution wrapper `contextStore.run()`:

```javascript
// server.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contextStore } from './context';
import { logger } from './logger';
import { processCheckout } from './checkout-service';

const app = express();

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  
  // Bind request context to this async chain
  contextStore.run({ requestId }, () => {
    logger.info(`Incoming request: ${req.method} ${req.path}`);
    next();
  });
});

app.post('/checkout', async (req, res) => {
  try {
    await processCheckout(req.body);
    res.status(200).send({ success: true });
  } catch (error) {
    logger.error('Checkout failed', { error: error.message });
    res.status(500).send({ error: 'Checkout failed' });
  }
});
```

Because of `AsyncLocalStorage`, the `processCheckout` function (and any nested database queries it executes) can just use the globally exported `logger.info()` directly. The log line will automatically contain the `requestId`, enabling clean trace query filters like `requestId:"c69a1a99..."` in Elasticsearch, Datadog, or Grafana Loki.

```javascript
// checkout-service.js
import { logger } from './logger';

export async function processCheckout(cart) {
  // Functions don't take a requestId parameter, yet logs remain fully correlated!
  logger.info('Fetching cart options from cache');
  const details = await fetchCartDetails(cart.id);
  
  logger.info('Routing to card payment provider');
  await executeCharge(details);
}
```

---

### Production Best Practices

1. **Avoid storing large objects**: Only store simple correlation keys (`userId`, `requestId`, `sessionId`) in `AsyncLocalStorage`. Storing large request payloads can prevent the garbage collector from cleaning up finished scopes, leading to memory leaks.
2. **Handle Context Losses in Event Emitters**: If you offload processing to non-awaited event emitters or standard `setTimeout` closures, Node.js can occasionally lose trace context. Wrap callbacks explicitly with `contextStore.run()` or use `AsyncResource` to bind them if necessary.
3. **Performance Overhead**: Using `AsyncLocalStorage` adds a tiny bit of CPU hook overhead due to tracking callbacks. In standard REST APIs or Web/PWA stacks, this is completely negligible compared to the massive operational visibility benefit.