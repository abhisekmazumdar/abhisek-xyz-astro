---
title: "I built a Drupal module for vectorless document search"
description: "Building ai_pageindex: a Drupal VDB provider that uses LLM reasoning over hierarchical tree indexes instead of embeddings."
pubDate: 2026-06-27
coverImage: ../../assets/logs/building_ai_pageindex.jpeg
coverImageCaption: Somewhere on a laptop
---

It started with a Google Meet where everyone bunked.

The Drupal Pune weekly sync is one of those calls where the whole group shows up and catches up: ongoing community work, upcoming meetup planning, the usual. Except that week it was just me and [Rahul Shinde](https://www.linkedin.com/in/shinderahul/). Everyone else had, well, bunked. Very college energy. Very "professor walks in, two kids in the room." Except we were the kids who had no idea there was a mass bunk.

We could have rescheduled. We didn't. We ended up talking about tech and where the Drupal ecosystem was heading. Rahul walked me through vectorless database setups and how [VectifyAI's PageIndex](https://github.com/VectifyAI/PageIndex) was doing something genuinely different. By the end of the call he said: we should build a Drupal module out of this.

So we did. [ai_pageindex](https://www.drupal.org/project/ai_pageindex) is live on drupal.org as `1.0.0-alpha1`.

That's community meetups for you. Two people, no agenda, a call most of the group skipped, one module that's now available for anyone in the Drupal community to use. Imagine what happens when you actually walk into a room full of these people.

If you're in Pune and want in on the next one: [Drupal Pune on Meetup](https://www.meetup.com/pune-drupal-group/).

Anyway, here's what we built.

## What PageIndex does differently

Embedding-based search works well for a lot of things. Short posts, articles, product descriptions, content where semantic similarity is a reasonable proxy for relevance. But it falls apart on structured long-form documents: technical manuals, legal filings, PDFs with clear sections and subsections. You end up with results that are semantically close but practically useless, because a small chunk that matches your query's cosine distance is not the same as the section that actually answers the question.

I've been thinking about this for a while in the context of Drupal sites that host that kind of content. The [Drupal AI module](https://www.drupal.org/project/ai) supports a handful of VDB providers: Pinecone, Weaviate, Milvus, Chroma. They all follow the same pattern: chunk the document, embed each chunk, store the vectors, retrieve by similarity at query time. Good infrastructure. Not always the right approach.

Instead of chopping a document into chunks and embedding them, PageIndex builds a hierarchical tree from the document structure: sections, subsections, summaries at each level. At query time, an LLM navigates that tree from the top down, deciding which branches are relevant as it goes, and returns scored excerpts with section-level citations. No vectors. No similarity math. Just an LLM reading the document's skeleton and reasoning about where the answer lives.

The VectifyAI benchmarks on FinanceBench show 98.7% accuracy against ~60-75% for embedding-based approaches on structured financial documents. That gap is what made me want to build this.

## What the benchmark showed

I ran both backends side by side against the same content: same Drupal site, same 9 nodes, same queries. Here's what the data looks like.

**Short flat articles (4 nodes):** PageIndex averaged 2,922 ms per query against Milvus at 1,074 ms. PageIndex returned zero results on 5 of 16 queries (things like "vitamins", "emperors", "exercise and wellness"), where the concept was loosely related at best. Milvus returned results for all 16, but with confidence scores in the 0.20-0.39 range on those weak queries. When PageIndex did return a result, it was the right one every time.

**Structured long-form documents (5 additional nodes: Kubernetes guide, diabetes management, remote work policy, solar installation manual, music theory):** PageIndex averaged 6,869 ms, Milvus averaged 939 ms. Top-1 accuracy was identical; both backends correctly identified the right document for every section-level and semantic query. The difference shows up in everything else they return.

For "what to do in an emergency", PageIndex returned nothing. The phrase doesn't appear in any document and the LLM correctly judged no document was a strong match. Milvus returned three results with scores of 0.19-0.22. A user would see those results even though the match is genuinely weak.

For cross-document queries like "security best practices", PageIndex surfaced two relevant documents (Kubernetes guide and Remote Work Policy) both at high confidence. Milvus returned five results with a sharp score drop after the top two.

The scores break it down clearly. PageIndex clusters at fixed bands: 0.95 for a direct match, 0.92 for semantic, 0.87 for slightly less direct. Scores below 0.75 were not observed at all. The LLM reasoning acts as its own internal filter. Milvus follows a natural cosine distribution and always returns the number of results you asked for, regardless of confidence.

The latency gap is real and won't close. It's a fundamental property of the architecture. PageIndex latency scales with document length because the LLM reasons over larger tree structures. Milvus is a vector lookup and is essentially constant regardless of document length. If you need sub-second search, PageIndex is not your answer.

## Building the module

The Drupal AI module has a clean plugin system for VDB providers. You implement `AiVdbProviderInterface`, register your plugin, and the Search API backend picks it up. The hard part was the microservice side: PageIndex is a FastAPI Python service, so I had to build a DDEV sidecar for local development and write a `PageIndexApiClient` to talk to it from Drupal.

The module ended up with three main pieces:

- **`PageIndexProvider`**: the VDB provider plugin. Handles indexing, search, deletion, and maintains an `ai_pageindex_entity_map` database table to map Drupal entity IDs to PageIndex document IDs.
- **`PageIndexApiClient`**: a service that wraps the HTTP calls to the microservice. Health check, workspace management, indexing, search, deletion.
- **`PageIndexSettingsForm`**: a settings page with a live health badge so you can confirm the microservice is reachable before wiring up an index.

The microservice itself (`pageindex-service/` in the repo) is a thin FastAPI wrapper around LiteLLM. Any LLM provider LiteLLM supports works out of the box: OpenAI, Anthropic, Ollama for fully offline setups, Azure, Groq.

## Bugs I found in ai_search along the way

Building the integration surfaced four bugs in the standalone [`ai_search`](https://www.drupal.org/project/ai_search) module. Two of them ([#3584025](https://git.drupalcode.org/project/ai_search/-/work_items/3584025), [#3584028](https://git.drupalcode.org/project/ai_search/-/work_items/3584028)) affect all providers: a missing logger injection that turns any error into a PHP fatal instead of a log entry, and a named argument spread into `querySearch()` that carries keys the function doesn't accept. Those would have surfaced eventually regardless.

The other two ([#3584026](https://git.drupalcode.org/project/ai_search/-/work_items/3584026), [#3584027](https://git.drupalcode.org/project/ai_search/-/work_items/3584027)) are specific to embedding-free providers, which is probably why they were never caught. Every existing VDB provider uses embeddings, so the code paths that handle an empty `$vector_input` were never really exercised. A `PluginException` from `getSearchVectorInput()` gets swallowed silently, and `vectorSearch()` never gets called at all when `$vector_input` is empty, so the module falls through to `querySearch()` instead and returns nothing. These two bugs together make it impossible to build a vectorless provider without patching the module.

All four are now filed and the patches are in `upstream-issues/` in the `ai_pageindex` repo if you hit them before the fixes land.

## AI assistance in building it

Being transparent about this matters, because it's relevant for anything going into the Drupal community.

A large part of the module was written with Claude Code: the plugin scaffold, the API client, the DDEV sidecar configuration, the README, and some write-up. I directed the work, made every architectural decision, debugged the actual failures when things broke (and several things broke), and reviewed majority pieces of code before it went live.

## What it is and isn't for

Use this module when:
- Content is long-form and hierarchically structured (documentation, manuals, policies, guides)
- Precision matters more than recall: showing nothing is better than showing a weak result
- You can't use an external embedding API (privacy, cost, air-gapped environment)
- You want the search to reason about document structure, not just text similarity

Use Milvus or another vector DB when:
- Latency is critical: sub-second is required
- Content is short and flat (product listings, short articles, FAQ items)
- Recall matters: you want to surface everything possibly relevant

If you want both: index into both backends, use PageIndex results as high-confidence primary results, and fall back to Milvus above a threshold when PageIndex returns nothing.

The module is on drupal.org as [ai_pageindex](https://www.drupal.org/project/ai_pageindex). Alpha for a real reason: no automated tests yet. Unit tests for `PageIndexProvider` and `PageIndexApiClient` are the obvious next step before a beta tag.

If you're one of the organizers at [DAP](https://www.drupalpune.in/drupalers-association-pune-dap) and keep bunking the weekly sync, you're missing out. And if you're in Pune and not showing up to these meetups at all, same goes for you. The Drupal community is full of people doing interesting work, and the best way to find out about it is to show up.

---

Thanks to [Dropsolid AI](https://dropsolid.ai) for the time and space to explore this kind of work.
