---
title: "Async Generators in Node.js: Streaming High-Volume Datasets without Memory Bloat"
description: "How to process thousands of database records, sitemaps, and product feeds using async generators to control heap memory."
publishedAt: 2024-09-15
---

As applications scale, memory leaks and heap crashes become a constant battle. In my time working on video SEO at JioHotstar, we indexed over 300,000 videos on Google. When you're pulling that much database content, transforming it, and building XML sitemaps, loading everything into memory is a recipe for a Node.js heap out-of-memory error.

Similarly, in e-commerce apps like MagicSell.ai or the Shopify tools I built at Mojito Labs, sync operations have to fetch thousands of products from Shopify APIs, parse their options, and update database stores. 

If you load 50,000 product objects into an array, process them, and then save them, your memory usage spikes, leading to garbage collection lag or service crashes.

The solution is to stream the data. And the most elegant way to handle asynchronous streams in JavaScript is using **Async Generators**.

---

### What are Async Generators?

Async generators combine generator functions (which can pause and resume execution) with promises (async/await). They allow you to yield values asynchronously, creating an on-demand pull-based stream.

Instead of returning a massive array, you yield items one by one (or in small chunks). The consuming code fetches the next item only when it is ready to process it.

```javascript
async function* getProductStream(shopifyClient) {
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const { products, pageInfo } = await shopifyClient.fetchProductsPage({
      limit: 50,
      after: cursor
    });

    for (const product of products) {
      yield product; // Yield one product at a time
    }

    cursor = pageInfo.nextCursor;
    hasNextPage = pageInfo.hasNextPage;
  }
}
```

To consume this stream, JavaScript provides the `for await...of` loop:

```javascript
const productStream = getProductStream(client);

for await (const product of productStream) {
  await processAndSaveProduct(product); 
  // Node.js only holds the current product in memory, keeping heap size completely flat.
}
```

---

### Practical Use Cases

#### 1. Generating a 300k+ Video XML Sitemap
To build a sitemap for hundreds of thousands of videos, we can stream database rows from PostgreSQL, format them into XML nodes, and write them directly to a writable file stream.

```javascript
import { createWriteStream } from 'fs';
import { db } from './db-connection';

async function* streamSitemapUrls() {
  const pageSize = 1000;
  let offset = 0;

  while (true) {
    const videos = await db.select('id', 'title', 'loc_url')
      .from('videos')
      .limit(pageSize)
      .offset(offset);

    if (videos.length === 0) break;

    for (const video of videos) {
      yield `  <url><loc>${video.loc_url}</loc><video:title>${video.title}</video:title></url>\n`;
    }

    offset += pageSize;
  }
}

async function writeSitemap() {
  const writer = createWriteStream('sitemap-videos.xml');
  writer.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

  for await (const xmlChunk of streamSitemapUrls()) {
    // If write buffer is full, wait for 'drain' event to handle backpressure
    if (!writer.write(xmlChunk)) {
      await new Promise(resolve => writer.once('drain', resolve));
    }
  }

  writer.write('</urlset>');
  writer.end();
}
```

#### 2. Batching Database Upserts to Prevent Query Bottlenecks
While processing one-by-one is great for memory, database writes are more efficient in batches. We can write a generator that consumes a single-item stream and groups them into batches:

```javascript
async function* batchStream(sourceStream, batchSize = 100) {
  let batch = [];
  
  for await (const item of sourceStream) {
    batch.push(item);
    if (batch.length >= batchSize) {
      yield batch;
      batch = [];
    }
  }
  
  if (batch.length > 0) {
    yield batch;
  }
}

// Consuming Shopify products and upserting in batches of 100
const productsPageStream = batchStream(getProductStream(client), 100);

for await (const productBatch of productsPageStream) {
  await db('products').insert(productBatch).onConflict('id').merge();
}
```

---

### Key Takeaways

1. **Backpressure management**: By using `for await...of`, the consumer controls the speed of the producer. If a database insert takes 50ms, the next batch isn’t fetched from the API until the current insert completes.
2. **Garbage Collection Optimization**: Because objects are discarded as soon as they are processed in the loop, Node.js doesn't need to trigger heavy, blocking garbage collection cycles.
3. **Error Handling**: Use standard `try/catch` inside the generator. If the consumer breaks or throws, the generator's `finally` block is executed, allowing database connections or file handles to close gracefully.