---
title: "AI vs Machine Learning for software engineers — where to go"
description: "What 'learn AI' actually means for a working software engineer — LLM APIs, fine-tuning, ML basics — and where to spend your time in 2025."
publishedAt: 2026-06-13
draft: false
---

Everyone says learn AI. Almost nobody says what that means for a working engineer. Here's the honest breakdown.

---

## AI vs ML — without the PhD version

Machine Learning is a subset of AI. It's the field of building systems that learn patterns from data.

AI, in the way most people use it today, means LLMs — large language models like GPT, Claude, or Gemini. These are ML models, but using them doesn't require understanding how they're trained.

The practical distinction for a working engineer:

**AI (LLM APIs)** — call an API, get intelligent text output. You need to know prompt engineering, context windows, and tool use. No math required.

**Machine Learning** — building models that learn from your own data. Requires statistics, Python, data pipelines, and months of learning before you ship anything useful.

For most software engineers building products, the relevant part is LLM APIs. Not from-scratch ML.

## What AI-adjacent work looks like at a normal company

Most companies using "AI" are doing one of three things:

1. Calling an LLM API and returning the result
2. Using LLMs to process or categorise internal data
3. Running embeddings for semantic search

Very few are training their own models. That's deep tech, and it requires a team of ML engineers, a lot of data, and significant compute.

If your company posts a job for an "AI engineer," they almost certainly want someone who can build products with LLM APIs — not someone who can tune a transformer.

## LLM APIs vs fine-tuning vs training

**LLM APIs** — start here. Build with OpenAI, Anthropic, or Gemini. Learn tool use (function calling), context management, retrieval-augmented generation (RAG). This is where 90% of the practical value is.

**Fine-tuning** — take an existing model and train it further on your own data. Useful when you need specific behaviour or domain expertise the base model doesn't have well. More complex, but still accessible with managed services.

**Training from scratch** — building a model from raw data. Almost never the right call unless you're at a company whose core IP is the model itself.

## The stack I'd learn if starting from scratch

1. Pick one LLM API (I use Claude and OpenAI both)
2. Learn tool use / function calling — this is how LLMs interact with real systems
3. Build one RAG project — a chatbot over a document set, for example
4. Learn embeddings basics — what they are and when to use them
5. Explore agents and multi-step LLM workflows

You can do all of this in a month with side projects. No courses needed — the documentation for these APIs is excellent.

## Where not to waste time

Don't start with ML courses if your goal is building AI products. Most of them teach you how models work theoretically — not how to ship something.

Don't learn PyTorch before you've shipped anything with an LLM API. That's like learning engine design before you can drive.

---

**The takeaway**

For working engineers building products, LLM APIs are where to start. Fine-tuning is relevant sometimes. Training from scratch is almost never your problem. Build something with an API first — the deep theory will make sense after you've shipped.

---


---

*Building something? Follow me on [Instagram](https://instagram.com/adityajha_builds) and [Twitter](https://x.com/adijha07) — I document everything.*
