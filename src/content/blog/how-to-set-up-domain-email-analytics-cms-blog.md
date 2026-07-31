---
title: "How to set up domain, email, analytics, CMS, and blog"
description: "The exact setup I use for adijha.com — Cloudflare for domain, Resend for email, Plausible for analytics, and Astro for blogging. Step by step."
publishedAt: 2026-06-13
draft: false
---

The boring setup stuff takes a weekend if no one tells you. I'll walk you through what I use in 10 minutes.

---

## Domain: Cloudflare Registrar

Buy your domain through Cloudflare Registrar, not GoDaddy or Namecheap.

Cloudflare charges at cost — no markup. You also get DNS management, DDoS protection, and SSL included. Moving your domain to Cloudflare later is annoying. Just start there.

One thing to know: Cloudflare doesn't support outbound transfers for the first 60 days. Plan accordingly.

## Email: Resend + custom domain

For transactional email (signups, password resets, notifications), I use **Resend**. It's built by developers, the API is clean, and the free tier covers 3,000 emails/month.

For a personal email (`hi@adijha.com`), I use **Cloudflare Email Routing** to forward it to Gmail. Free, works instantly, no inbox to manage.

Don't use Gmail SMTP for transactional email from your app. It will get flagged. Use Resend.

## Analytics: Plausible or Umami

I don't use Google Analytics. It's heavy, requires cookie banners in the EU, and gives you more data than you'll ever use.

**Plausible** ($9/month) or **Umami** (free, self-hosted) do everything you actually need — page views, bounce rate, top pages, referrers — with no cookies and a 2KB script.

I use Plausible on adijha.com. I can see what people read, where they come from, and whether traffic is growing. That's all I need.

## Blog: Astro + Markdown

adijha.com runs on **Astro**. I write posts as Markdown files and Astro compiles them to static HTML. No CMS, no database, no server to maintain.

It's fast, SEO-friendly, and free to host on Cloudflare Pages. Writing a new post is just creating a `.md` file and pushing to GitHub.

If you're technical and want a blog, this is the stack. It takes half a day to set up once.

## CMS: when you need it

If you want a visual editor or you're publishing with a non-technical team, look at **Contentlayer** (free, works with Astro) or **Sanity** (free tier, hosted CMS with a clean UI).

I don't use a CMS — I write in my editor. But if you want to write posts from a browser, Sanity is the fastest path.

## The cost breakdown

- Domain: ~$10–12/year (Cloudflare Registrar)
- Email routing: free (Cloudflare) + $0 (Resend free tier)
- Analytics: $9/month (Plausible) or $0 (Umami self-hosted)
- Blog hosting: free (Cloudflare Pages)

Total: under $20/month. Possibly free.

---

**The takeaway**

Cloudflare for domain, Resend for email, Plausible for analytics, Astro for blog. This stack costs almost nothing and does everything you need. Stop overthinking the tools and start publishing.

---


---

*Building something? Follow me on [Instagram](https://instagram.com/adityajha_builds) and [Twitter](https://x.com/adijha07) — I document everything.*
