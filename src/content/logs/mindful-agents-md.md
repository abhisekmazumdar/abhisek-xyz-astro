---
title: "Be Mindful of What Goes in Your AGENTS.md"
description: "A lesson learned about keeping your AI context files lean, intentional, and accurate."
pubDate: 2026-03-16
coverImage: ../../assets/logs/mindful-agents-md.jpeg
---

While reviewing [amazeeio's AGENTS.md](https://github.com/amazeeio/drupal-agents-md/blob/main/DDEV/AGENTS.md) on GitHub, I found myself tempted to bulk up my own `AGENTS.md` with more detail. It seemed like a good idea at the time — more context means a smarter model, right?

Not quite.

## The Context Window Cost

Your `AGENTS.md` (or `CLAUDE.md`) gets loaded into every single conversation context window. Every token in that file is a token the model has to process before it even reads your first message. Bloating it with information that does not apply to your workflow is just noise — and noise has a cost.

Take a focused workflow as an example — say, reviewing and contributing to issues in a specific open source community like [Drupal AI](https://www.drupal.org/project/ai). You do not need a file that tries to explain the entire universe of software development to your model. Keep it scoped to what actually matters for the work at hand.

## Know Your Use Case

The example I shared earlier of the `AGENTS.md` file includes a lot of DDEV-specific information — commands, environment setup, tooling details. That probably makes a lot of sense for their use case. If you are onboarding contributors to a specific project with a defined environment, spelling all of that out upfront is reasonable.

But for day-to-day development work, a lot of that information does not need to live in the context file at all. The model can run commands, explore the environment, read output, and figure things out as it goes. Preloading it with every CLI command and environment detail it might ever need is solving a problem that does not really exist — and it comes at the cost of a heavier context on every single conversation.

The point is not that one approach is wrong. It is that context files should match the actual use case. What works for a shared contributor onboarding doc is not necessarily what works for a personal development workflow.

## The Cascade Problem

This one hit harder. I came across this line in a [post on writing good CLAUDE.md files](https://www.humanlayer.dev/blog/writing-a-good-claude-md) that put it well:

> A bad line of code is a bad line of code. A bad line of an implementation plan has the potential to create a lot of bad lines of code. A bad line of research that misunderstands how the system works has the potential to result in a lot of bad lines in the plan, and therefore a lot more bad lines of code as a result.

The further upstream an error sits, the more damage it can do. A flawed assumption in your context file does not just cause one bad output — it poisons every conversation that inherits it.

## Use Skills for Repeated Workflows

If you notice the model repeating the same sequence of steps across conversations, that is a signal the workflow deserves a proper [skill](https://code.claude.com/docs/en/features-overview#skills). Skills are reusable prompt templates you invoke on demand with a slash command — `/review-pr`, `/commit`, or whatever fits your workflow.

The key difference from `AGENTS.md`: skills are only loaded into context when you actually call them. Your `AGENTS.md` loads every single time. So for workflows you use occasionally, a skill keeps them available without every conversation paying the context cost upfront.

Think of `AGENTS.md` as the always-on foundation, and skills as the on-demand tools you reach for when needed.

## What I Took Away

- Keep your `AGENTS.md` lean and specific to your actual workflow.
- Do not auto-generate it with `/init` or let an AI fill it in without careful review.
- Let the model do its job — it can explore, run commands, and reason through the environment on its own.
- Every line you add is a line the model will treat as ground truth. Make sure it earns its place.
- If the model keeps repeating the same steps, encode that pattern as a skill instead.

Less is more. A sharp, accurate context file beats a comprehensive but fuzzy one every time.
