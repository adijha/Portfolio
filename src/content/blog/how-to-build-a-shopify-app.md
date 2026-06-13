---
title: "How to build a Shopify app"
description: "A production-level guide to building a Shopify app — OAuth, Polaris, webhooks, billing, and app review — from the builder of MagicSell.ai."
publishedAt: 2026-06-13
draft: false
---

Shopify's docs are dense. Here's what I actually needed to know when building MagicSell from scratch.

---

## App types: public vs custom vs embedded

**Custom apps** are built for one specific store. No app review, faster to ship. Good if you're building something for a single merchant.

**Public apps** are listed in the Shopify App Store. They go through a review process and need to support OAuth for multi-merchant installs. This is what MagicSell is.

**Embedded apps** live inside the Shopify admin as an iframe. Most modern apps are embedded. You use App Bridge for communication between your app and the Shopify admin UI.

If you're building a product for multiple stores, you're building a public embedded app. That's the hard path — also the one that scales.

## Auth: OAuth flow and session tokens

Shopify uses OAuth for app installs. The flow: merchant installs your app → Shopify redirects them to your OAuth endpoint → you exchange the code for an access token → store the token against the shop domain.

Session tokens are separate — for authenticating individual admin UI requests without an API call. Use App Bridge's `getSessionToken()` for frontend requests and validate on your backend.

The most common mistake I made: mixing up shop access tokens (per-store, permanent after install) with session tokens (per-user, short-lived). They do different things.

## Polaris UI or custom

**Polaris** is Shopify's design system — React components built for the admin UI. They look native inside the Shopify admin. If your app lives in the admin, use Polaris. Merchants expect it. Rolling your own UI in the admin feels wrong.

For customer-facing parts of your app — storefronts, checkout extensions, landing pages — use your own UI. That's where I use custom design.

MagicSell's cart drawer is customer-facing. Custom design. The settings panel in the admin uses Polaris.

## Webhooks and the billing API

**Webhooks** are how Shopify tells your app what's happening in a store — orders created, customers added, app uninstalled. Register them through the API or your app's configuration.

Critical: always verify webhook signatures before processing. Shopify sends an HMAC header. Validate it or you're open to spoofed requests.

**Billing API** handles subscriptions and one-time charges. You create a charge, redirect the merchant to approve it, and Shopify handles the rest. Don't try to handle payments yourself — use this API. It also integrates automatically with Shopify's partner revenue share.

## App review gotchas that got me

Shopify's review team is thorough. Things that will get you rejected:

- Missing required scopes explanation in the setup
- App permissions that are broader than needed
- Test store requirements not met during review
- Broken webhooks (they test uninstall specifically)

Leave more time than you think for app review. My first submission took 3 weeks to get approved. Build the review buffer into your launch timeline.

---

**The takeaway**

Start with a custom app to learn the Shopify API. Build embedded with Polaris. Handle OAuth and session tokens carefully. Leave 3–4 weeks for app review. The Shopify ecosystem is worth learning — once you're in the App Store, distribution has a floor.

---

**Watch the full breakdown →**

I covered this in detail on Instagram. Watch here: [video link]

---

*Building something? Follow me on [Instagram](https://instagram.com/adijha07) and [Twitter](https://x.com/adijha07) — I document everything.*
