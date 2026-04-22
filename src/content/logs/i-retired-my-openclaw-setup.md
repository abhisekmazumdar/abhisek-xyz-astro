---
title: "I Retired My OpenClaw Setup. Here's What I Learned."
description: "A follow-up to setting up OpenClaw on an old laptop — why I shut it down, what changed, and what I took away from the experiment."
pubDate: 2026-04-22
---

It was a good experiment. But I've shut it down.

If you read [How I Set Up OpenClaw on an Old Laptop](/logs/openclaw-on-an-old-laptop), you know the backstory. This is the other half of that story.

## The math stopped working

OpenClaw was eating tokens. That's fine if what comes back is useful. It mostly wasn't.

The pattern was: I'd ask for something, OpenClaw would come back with a clarifying question that didn't need to exist, I'd answer it, and by the time we got anywhere useful I'd burned through more context than the task was worth. Repeat.

I went digging on the OpenClaw subreddit. Turns out this is a known thing. OpenClaw used to work much better in tighter integration with Claude Code. The gap between how it used to feel and how it feels now is real — I felt it every session.

## The ecosystem moved

The other honest reason: most of what I was trying to use OpenClaw for, I can do now with tools already in my workflow. The specific gap it was filling has closed.

Claude Code's [Cowork](https://claude.com/product/cowork) features can handle a good chunk of what I was routing through OpenClaw. [Google Workspace Studio](https://workspace.google.com/intl/en_in/studio/) covers another slice. The use case has been absorbed from multiple directions.

It's good to do a reality check on your tool stack every now and then. When your setup solves a problem the ecosystem has already caught up on, retire the setup.

## The hardware was fighting me

Running this on the old HP ENVY added friction I kept underestimating.

The keyboard has a few dead keys. That sounds minor until you need to run a `sudo` command — which OpenClaw can't touch anyway — and you're doing an awkward dance around it. I ended up fixing this with [Deskflow](https://github.com/deskflow/deskflow), which lets you share a keyboard and mouse across machines. That helped.

But fixing the keyboard just revealed the next problem: scaling.

## The laptop couldn't scale

What I actually wanted was a capable, remotely accessible assistant. That needs proper hardware.

Running Ollama on the HP ENVY was painfully slow. I tried switching between GPU and CPU. Didn't help — the machine just didn't have the headroom. Response time for even the lightest models was too slow to be useful. The right answer was always a remote server. The old laptop was never that.

## Codex wasn't the answer either

While rethinking all of this, Codex seemed like the natural next thing to try. I gave it a real shot. It had its own frustrations — inconsistent, occasionally just wrong in obvious ways.

And then Anthropic [changed the policy](https://www.pcmag.com/news/anthropic-you-cant-use-openclaw-with-claude-without-paying-extra). As of April 2026, using OpenClaw with Claude no longer falls under your subscription — it counts as extra uses. I found out about this change on the subreddit, ironically just after I'd set up my OpenClaw instance.

## What the laptop does now

The HP ENVY gets a quieter job. I'm converting it into a home media library — probably using [Ente](https://ente.io/), which fits well with the 1TB I have on it. A much better fit for hardware that isn't built for AI workloads but is perfectly fine storing and serving photos.

## What I took away from this

Token cost isn't a footnote — it's part of the design. Workarounds compound: fix the keyboard, hit the sudo wall, hit the scaling ceiling. And if the ecosystem catches up to your custom setup, that's a win — retire it and move on.

But the learning wasn't wasted. That's actually the bigger takeaway.

Picking up a new tool — even one you end up dropping — builds new neural connections. That's not a metaphor. It's literally how the brain works. The same thing happens when you travel somewhere new: unfamiliar streets, different systems, a different way of doing things. You come back slightly rewired.

It also changed how I think about what's possible with this generation of AI tools. I'd stopped asking those questions for a while. The AI shift brought them back. Now I can't stop.

The possibilities genuinely excite me. I don't know how all of this turns out. Nobody does. But I know it's real, it's here, and it's moving fast. The internet felt the same way when it arrived — I was too young to make any real decisions about it back then. The ones who kept exploring figured it out. Those explorers built the big tech companies we know today. Now those same companies — Google, Apple — are being challenged by a new wave: OpenAI, Anthropic, and others.

History has a pattern.

I love exploring and experimenting with new things and experiences.

---

If any of this resonates or you're thinking through a similar setup, I'm always up for a conversation — find me on [LinkedIn](https://www.linkedin.com/in/abhisekmazumdar/).
