---
title: "How I've Adapted to the AI Evolution of Drupal Open Source Contribution"
description: "How I use a Drupal issue agent and a set of skills as an assistant for my open source contributions — while still doing the manual review myself."
pubDate: 2026-05-31
coverImage: ../../assets/logs/adapting-to-ai-in-drupal-open-source-contribution.jpeg
---

These days a good chunk of my time goes into open source contributions — mostly reviewing and working on issues in the [Drupal AI](https://www.drupal.org/project/ai) ecosystem and a few other contrib modules. I work at [Dropsolid AI](https://dropsolid.ai), and right now my Drupal AI contribution work is sponsored by them — so a big shout out to the team for backing this. It is the kind of work where context matters a lot: a single issue can carry a long history of comments, a merge request with inline reviewer threads, a CI pipeline, and prior attempts that all need to be pieced together before you can say anything useful.

To make that faster, I built a small setup — an agent backed by a handful of [skills](https://code.claude.com/docs/en/features-overview#skills). I want to be upfront about what it actually does, because it is easy to oversell this kind of thing.

## It is an assistant, not an autopilot

The agent does not replace my review. It speeds up the boring, mechanical part of getting to a review.

When I pick up an issue, I share the link with the agent. From there it does the legwork that I would otherwise do by hand:

- Fetches the full issue, including every comment, and pulls the same context whether the queue lives on Drupal.org or has migrated to GitLab work items.
- Reads the merge request — the diff, the pipeline status, and the inline reviewer threads that are easy to miss when you are scrolling a long page.
- Cross-references the timeline, so a concern raised in a comment that never got a reply, or a fix that landed in code but was never acknowledged on the issue, gets flagged instead of slipping through.
- Drafts manual testing steps a human can actually follow, and assesses what test coverage exists versus what is missing.

On a long, noisy issue — the kind with dozens of comments stretching across months — having that summarised and laid out in front of me genuinely saves time. That is where an AI summary earns its place: not deciding anything, just compressing the history so I can see the shape of it quickly.

## I still do the manual review myself

This part matters to me, and I do not want to skip it.

After the agent gathers everything, I read the issue, the MR, and the comments myself. I go through the code changes line by line. This is not me distrusting the tool — it is because reviewing is also how I learn. Reading the actual diff is how I build a general understanding of the change that is coming in: how the module is put together, what patterns it follows, where Drupal AI is heading in general. That understanding is what makes me useful on the *next* issue. If I let a tool hand me a verdict, I would lose the thing that the work is actually for.

So the division of labour is simple. The agent gathers and surfaces. I read, judge, and decide.

## Where AI actually helps

The honest pitch is not "AI does everything." It is narrower and, I think, more valuable:

- It does the work quickly — the gathering, the fetching, the formatting — so I get to the thinking part sooner.
- It spots gaps. An open inline thread nobody circled back to, a missing test, an edge case the code does not handle.
- It catches the small things human eyes skim past — a typo, a leftover debug statement, a doc comment whose types no longer match the code.

None of that is me being replaced. It is me getting a second pair of eyes that never gets tired of reading the boilerplate, so my own attention is free for the parts that need judgement.

That is the whole point of the setup: keep the human in the loop where it counts, and let the assistant handle the rest.

And none of this time would be possible without [Dropsolid AI](https://dropsolid.ai) sponsoring my Drupal AI contribution work — thank you for making space for it.
