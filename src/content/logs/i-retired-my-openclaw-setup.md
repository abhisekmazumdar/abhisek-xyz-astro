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

It really good to always have a reailey check and keep you and ur tool stack updated. When your setup solves a problem the ecosystem has already caught up on, retire the setup.

## The hardware was fighting me

Running this on the old HP ENVY added friction I kept underestimating.

The keyboard has a few dead keys. That sounds minor until you need to run a `sudo` command — which OpenClaw can't touch anyway — and you're doing an awkward dance around it. I ended up fixing this with [Deskflow](https://github.com/deskflow/deskflow), which lets you share a keyboard and mouse across machines. That helped.

But fixing the keyboard just revealed the next problem: scaling.

## The laptop couldn't scale

What I actually wanted was a capable, remotely accessible assistant. That needs proper hardware.

Running Ollama on the HP ENVY was painfully slow. I tried switching between GPU and CPU. Didn't help — the machine just didn't have the headroom. The resposn time for any light model was taking too long to it to be good to use. The right answer was always a remote server. The old laptop was never that.

## Codex wasn't the answer either

While rethinking all of this, Codex was the only right and easy fit for me so I have it a real shot. It had its own frustrations — inconsistent, occasionally just wrong in obvious ways. And ofcorase as the name is out there that Open Claw just uses alot of token so that was somthing to add.

And then Anthropic [changed the polices](https://www.pcmag.com/news/anthropic-you-cant-use-openclaw-with-claude-without-paying-extra). As of April 2026, using OpenClaw with Claude no longer falls under your subscription — every task is billed separately on top. And that was the time I setup my openclaw just one day after this new which I was not aware of untill I saw the sub reddit.

## What the laptop does now

The HP ENVY gets a quieter job. I'm converting it into a home media library — probably using [Ente](https://ente.io/) as it has a good storage of 1tb. A much better fit for hardware that isn't built for AI workloads but is perfectly fine storing and serving photos.

## What I took away from this

Token cost isn't a footnote — it's part of the design. Workarounds compound: fix the keyboard, hit the sudo wall, hit the scaling ceiling. And if the ecosystem catches up to your custom setup, that's a win — retire it and move on.

But the learning wasn't wasted. That's actually the bigger takeaway.

Picking up a new tool — even one you end up dropping — builds new neural connections in our brain cells. That's not a metaphor. It's literally how the brain works. The same thing happens when you travel somewhere new: unfamiliar streets, different systems, a different way of doing things. You come back slightly rewired and learn alwasy something valuable for life.

It also changed how I think about what's possible with this generation of AI tools. I'd stopped asking those questions for a while before this revolauion happen with AI. Now I can't stop thinking about the possiblities and how this tools can be used.

The possibilities genuinely excite me. I don't know how all of this turns out. Nobody does. But I know it's real, it's here, and it's moving fast. The internet felt the same way when it arrived I was too yoong to make any discion on that that time. Most people didn't know what to do with it. The ones who kept exploring figured it out and now had big tech companies. Those same companies like google and apple are now beeing changlled by the new AI tech compaies like openAI and Anthropic. So that is something to learn form too.

That's where I want to be. Exploring, not watching. and have good cold black coffee and wirte about it as I'm doing now

---

If any of this resonates or you're thinking through a similar setup, I'm always up for a conversation — find me on [LinkedIn](https://www.linkedin.com/in/abhisekmazumdar/).
