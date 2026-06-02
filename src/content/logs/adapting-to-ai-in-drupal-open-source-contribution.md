---
title: "How I've Adapted to the AI Evolution of Drupal Open Source Contribution"
description: "How I use a Drupal issue agent and a set of skills as an assistant for my open source contributions."
pubDate: 2026-05-31
coverImage: ../../assets/logs/adapting-to-ai-in-drupal-open-source-contribution.jpeg
---

These days a good chunk of my time goes into open source contributions, mostly reviewing and working on issues in the [Drupal AI](https://www.drupal.org/project/ai) ecosystem and a few other contrib modules that work with it. I work at [Dropsolid AI](https://dropsolid.ai), and my Drupal AI contribution work is sponsored by them. Big shout out to them for backing this.

It is the kind of work where context matters a lot: a single issue can carry a long history of comments, the merge request has inline reviewer threads that might be resolved but still hold a lot of context, and prior attempts all need to be pieced together before you can say anything useful. Issues related to other modules can also be blocking work in a specific issue. That is a lot to keep in your head, and it is easy to miss something important when you are scrolling through a long page of comments and code.

To make that faster, I built a small setup: an agent backed by a handful of [skills](https://code.claude.com/docs/en/features-overview#skills). I want to be upfront about what it actually does, because it is easy to oversell this kind of thing. I also want it on the record that this is how my contributions are evolving alongside AI, and how I am using AI as an assistant to speed up the work, not replace it.

## It is an assistant, not an autopilot.

The agent does not replace my review. It speeds up the boring, mechanical part of getting to a review. It creates a sequence to the whole process, a ritual for picking up an issue and getting started.

When I pick up an issue, I share the link with the agent. From there it does the legwork that I would otherwise do by hand:

- Fetches the full issue, including every comment, and pulls the same context whether the queue lives on Drupal.org or has migrated to GitLab work items.
- Reads the merge request: the diff, the pipeline status, and the inline reviewer threads that are easy to miss when you are scrolling a long page.
- Cross-references the timeline: this is one of the more important things I built in, and one that a default LLM won't always do on its own. A concern raised in a comment that never got a reply, or a fix that landed in code but was never acknowledged on the issue, gets flagged instead of slipping through.
- Drafts manual testing steps a human can actually follow, and assesses what test coverage exists versus what is missing.
- Fixes any typos, doc comment mismatches, and coding standard issues it spots along the way.
- Rerolls the branch if it has fallen behind the target branch. It just makes sure everything is ready so I can start working without worrying about the mechanical stuff.

On a long, noisy issue, the kind with dozens of comments stretching across months, having that summarised and laid out in front of me genuinely saves time. That is where an AI summary earns its place: not deciding anything, just compressing the history so I can see the shape of it quickly. The human puts their attention on the parts that need judgement, and the assistant handles the rest.

I also made sure all these actions are safe: they are read-only by design. I have added a lot of commands to the deny list over time whenever I find the agent starting to go off-plan. And of course, the GitLab personal access token it uses: the one [`glab`](https://docs.gitlab.com/cli/) relies on is read-only, just to make sure AI doesn't start taking over. Which it tries to do sometimes, but that is what the guardrails are for.

## The skills behind it

The agent is not one big prompt. It is a thin orchestrator on top of a set of small, focused skills, and each one only loads when the work actually needs it. That keeps every step scoped to a single job instead of one model trying to remember everything at once. The ones I lean on most fall into a few groups.

**Getting the context.** A `drupalorg-cli` skill handles the Drupal.org issue lifecycle: fetching issue details with all comments, listing MRs, looking up the issue fork, and emitting structured output built for a model to parse. This one is mostly built on top of [mglaman's `drupalorg-cli`](https://github.com/mglaman/drupalorg-cli), with some small tweaks of my own to fit the way I work. A `drupal-gitlab` skill covers the same ground on `git.drupalcode.org` for projects whose queues have migrated to GitLab work items. And a `drupal-gitlab-inline-comments` skill pulls the inline diff threads on a merge request, grouped by file and line, open versus resolved, which are the comments easiest to lose track of on a busy MR.

**Reviewing and working.** A `drupal-review-issue` skill runs the structured review, covering correctness, security, API usage, tests, and coding standards, and always produces a checklist. A `drupal-issue-reroll` skill deals with branches that have fallen behind the target branch.

**Knowing Drupal's rules.** A `drupal-coding-standards` skill runs PHPCS and PHPCBF exactly the way the Drupal pipeline does. A `drupal-automated-testing` skill covers writing and running Kernel, Functional, and Unit tests.

**Environment.** A `ddev-expert` skill handles the local DDEV containers everything runs inside.

What I like about this structure is that none of it is a black box. Each skill does one legible thing, so when the agent flags something I can see exactly which check raised it and why.

A shout out to the [ai_best_practices](https://www.drupal.org/project/ai_best_practices) project, a few of my skills got inspired from there.

## How the agent is wired

The agent itself is mostly a flow that decides which skills to reach for and when. The shape is simple. It starts by resolving whatever I paste — a Drupal.org issue URL or a GitLab work-item URL — into the issue and project it points at. Then it gathers context: the issue and its comments, the list of merge requests, the fork, the inline threads, the pipeline status. Only once all of that is in front of me does it branch into one of two paths: reviewing an existing merge request, or, if no MR exists yet, drafting an implementation plan for a new issue.

The part that matters most to me is the pauses. The whole gathering phase is read-only. The agent can fetch, read, and analyse as much as it wants, but it stops at every checkpoint and waits for me before doing anything that writes. It presents a short triage card and asks whether to continue. It presents the full review and asks which items I want fixed and which I will handle myself. Nothing gets edited, staged, committed, pushed, or posted to Drupal.org without me explicitly approving that specific step, and a "go ahead" earlier in the conversation does not carry forward to the next gate. Approvals are item-specific: if I approve two items from a review, it fixes exactly those two and leaves the rest alone, even things it noticed along the way.

That gating is deliberate. It is what keeps the tool an assistant rather than something running off on its own. The agent is allowed to be fast and thorough at gathering, and is held on a tight leash at every point where it would change something.

## I still do the manual review myself

This part matters to me, and I do not want to skip it.

After the agent gathers everything, I read the issue, the MR, and the comments myself. I go through the code changes line by line. This is not me distrusting the tool. It is because reviewing is also how I learn. Reading the actual diff is how I build a general understanding of the change coming in: how the module is put together, what patterns it follows, where Drupal AI is heading in general. That understanding is what makes me useful on the *next* issue. If I let a tool hand me a verdict, I would lose the thing that the work is actually for.

So the division of labour is simple. The agent gathers and surfaces. I read, judge, and decide.

## Where AI actually helps

The honest pitch is not "AI does everything." It is narrower and, I think, more valuable:

- It does the work quickly — the gathering, the fetching, the formatting — so I get to the thinking part sooner.
- It spots gaps: an open inline thread nobody circled back to, a missing test, an edge case the code does not handle.
- It catches the small things human eyes skim past: a typo, a leftover debug statement, a doc comment whose types no longer match the code.

None of that is me being replaced. It is me getting a second pair of eyes that never gets tired of reading the boilerplate, so my own attention is free for the parts that need judgement.

That is the whole point of the setup: keep the human in the loop where it counts, and let the assistant handle the rest.

I'm also fully aware that if you point anything at an LLM it will find something to suggest, even code it wrote a few minutes earlier. The human eye is what decides what is actually needed and what is not. I have seen the agent suggest adding a test for a change that is purely a UI text update — not wrong exactly, but not actually needed in that case. So I just ignore that suggestion and move on.

## Sorry for being selfish, but I'm not here to share the agent file

You might have noticed I have not pasted the agent's `.md` file here. That is on purpose. I think each of us has our own workflow and our own use cases, and the real value is in drafting the agent yourself, shaping it around how you actually work and deciding where your own pauses and guardrails belong. Copying mine wholesale would skip the part that makes it useful: the learning phase of figuring out how to craft an agent. So treat this as inspiration rather than a template.

If you want a great place to start building and sharing your own skills, check out [skills.sh](https://www.skills.sh/). It makes it easy to build a skill, publish it, and reuse it across different projects.

That said, I am happy to share my setup if it genuinely helps you get started. I have my skills in a private repo and I will admit I have over-engineered it a bit, set up so I can reuse it across different projects I contribute to, like Drupal core, Drupal CMS, and a general Drupal 11 setup with contrib modules codebase.

If needed just reach out: DM me on [LinkedIn](https://www.linkedin.com/in/abhisekmazumdar/) or find me on Drupal Slack as `abhisekmazumdar` and I will send it over if you really want to see it and get inspired to build your own.

And none of this would be possible without [Dropsolid AI](https://dropsolid.ai) sponsoring my Drupal AI contribution work. Thank you for making space for it.
