---
title: "Cloudflare stack 101"
description: "A practical guide to the full Cloudflare developer stack — what each product does, when to use it, and my real setup for running MagicSell.ai."
publishedAt: 2026-06-13
draft: false
---

Cloudflare is not just a CDN. Here's the full stack I use to run my app for nearly nothing.

---

## Pages — deploy in 30 seconds

Cloudflare Pages is my default for any frontend. Connect a GitHub repo, set build commands, done. It deploys globally across Cloudflare's edge network automatically.

Free tier is generous. Preview deployments on every PR. Custom domains with SSL in one click. I use it for adijha.com and MagicSell's marketing site.

## Workers — serverless at the edge

Workers run JavaScript (or TypeScript, Rust, Python) at the edge — not in a single region, but close to wherever the request comes from. Cold start time is near zero because Workers use V8 isolates instead of containers.

I use Workers for API routes, webhooks, and anything that needs to be fast globally. The free tier is 100,000 requests per day. For MagicSell, my webhook processing runs here.

## R2 — S3 but better for most founders

R2 is object storage with zero egress fees. That's the headline. With S3, you pay to put data in and pay again every time you read it out. With R2, reads are free.

For storing user-uploaded assets, generated files, or anything you need to serve publicly — R2 with a Worker or public bucket is the move.

## D1 — SQLite at the edge

D1 is Cloudflare's serverless SQL database. It's SQLite under the hood, so the API is familiar. You run it from Workers without managing a database server.

I use it for lightweight data that doesn't need a heavy Postgres setup. Config storage, flags, low-write tables. For MagicSell's heavy transactional work I still use a proper database — but D1 handles a lot of the auxiliary stuff.

## KV, Queues, Email Routing

**KV** is a key-value store for fast reads globally. Good for session data, feature flags, rate limiting state.

**Queues** lets you send messages between Workers asynchronously. I use this for background jobs — processing a webhook, sending an email — so the main request returns fast.

**Email Routing** forwards email from a custom domain to any inbox for free. That's how `hi@adijha.com` routes to my Gmail.

## My actual MagicSell setup

- Frontend: Cloudflare Pages
- API: Workers (TypeScript)
- Storage: R2 for assets, D1 for auxiliary data
- Background jobs: Queues
- Cost: under $10/month for my current volume

The whole thing is serverless. No EC2, no RDS, no load balancer to manage. For a solo founder building MagicSell, this matters.

---

**The takeaway**

Cloudflare's developer platform is underrated. Pages + Workers + R2 alone covers most solo founder use cases at near-zero cost. Learn it before reaching for AWS.

---


---

*Building something? Follow me on [Instagram](https://instagram.com/adijha07) and [Twitter](https://x.com/adijha07) — I document everything.*
