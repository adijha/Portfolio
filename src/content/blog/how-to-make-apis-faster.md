---
title: "How to make APIs faster"
description: "Slow APIs are almost always fixable. Here's the exact checklist I run — from N+1 queries to caching — with real before/after numbers."
publishedAt: 2026-06-13
draft: false
---

Your API is slow. Here's the checklist I run before blaming the database.

---

## Measure first — and measure the right thing

Most engineers look at average latency. That's the wrong metric.

A 200ms average can hide a p99 of 4 seconds. Real users hit those tail latencies. Before touching anything, I pull p50, p95, and p99 from my APM. Everything else is guessing.

If you don't have proper instrumentation, add it before optimising. You can't fix what you can't see.

## The N+1 problem

This is responsible for more slow APIs than anything else I've seen.

You fetch a list of 50 orders. For each order, your ORM quietly fires a query to get the customer. That's 51 queries where 1 should do. The database is fine. The code is the problem.

Fix: eager load related data in a single query. In most ORMs, this is a one-line change. Before doing anything else, check your query logs and look for repeating patterns.

## Caching: what to cache, where, and for how long

Not everything needs to be cached. But some things should never hit the database on repeat.

Category trees, configuration data, product metadata — these are read frequently and change rarely. Cache them at the application layer (Redis or in-memory) with a short TTL. For user-specific data, be careful. Cache invalidation bugs are worse than slow APIs.

I use Redis for most things. Set short TTLs (30s to 5 minutes depending on staleness tolerance). When in doubt, cache less and tune later.

## Pagination, field selection, and compression

If your endpoint returns 500 rows by default, fix that before anything else. Paginate with cursor-based pagination — offset pagination gets slow on large tables.

Field selection matters. Return only what the client needs. Avoid `SELECT *` at the database level. If you're on REST, consider a fields param. If you're on GraphQL, this is automatic.

Enable gzip compression on your API responses. A 200KB JSON payload becomes 40KB. For free. One line of middleware.

## Quick wins vs structural fixes

Quick wins — things I fix in under an hour:

- Add a missing database index on the column you're filtering by
- Enable query result caching
- Turn on response compression
- Add pagination to any endpoint returning lists

Structural fixes — things that take a day or more:

- Redesign the data model to avoid joins
- Move to read replicas for heavy queries
- Introduce a caching layer properly
- Break a monolithic query into smaller async calls

Start with quick wins. Sometimes you don't need the structural stuff.

---

**The takeaway**

Measure p99, not averages. Fix N+1 queries first — they're almost always there. Add caching and pagination before anything exotic. Most slow APIs have a simple cause.

---


---

*Building something? Follow me on [Instagram](https://instagram.com/adityajha_builds) and [Twitter](https://x.com/adijha07) — I document everything.*
