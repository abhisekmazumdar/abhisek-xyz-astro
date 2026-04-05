---
title: "How I Set Up OpenClaw on an Old Laptop"
description: "Notes on turning an old laptop into my always-on OpenClaw assistant, and even drafting this post together over Telegram."
pubDate: 2026-04-05
coverImage: ../../assets/logs/openclaw-old-laptop.jpg
---

There’s something deeply satisfying about giving old hardware a second life.

Instead of letting an aging laptop slowly retire into a drawer full of cables, forgotten chargers, and vague guilt, I decided to turn mine into something useful: a dedicated machine for running my personal OpenClaw setup.

The goal was simple. I wanted an assistant that lived on my own hardware, stayed close to my workflow, and could actually do useful things for me — not just answer questions, but help me check email, manage reminders, inspect projects, and generally behave more like a real digital sidekick than a chatbot tab I occasionally open and forget.

So I used an old laptop.

## Why an old laptop?

Because it was already there.

That’s honestly the biggest reason. Old laptops are underrated little servers. They already have:

- a screen
- a keyboard
- a battery backup
- Wi-Fi
- decent enough compute for agent workflows
- and the most important feature of all: they cost me nothing extra

For something like OpenClaw, that’s actually a pretty nice fit. I didn’t need a rack server or a mini PC or a cloud VM to get started. I just needed a machine that could stay online, run reliably, and sit quietly in the background doing useful work.

An old laptop checks all of those boxes.

## What I wanted the setup to do

I wasn’t trying to build a giant production-grade automation platform on day one. I wanted a setup that was simple and actually useful in daily life.

My rough wishlist looked like this:

- run OpenClaw reliably
- stay online for long periods
- let me talk to my assistant from Telegram
- check my Gmail
- send me reminders
- inspect local files and GitHub repos
- help with projects running on the same machine

In other words, I wanted something practical — not just impressive.

## The machine

The machine I’m using for this setup is an **HP ENVY TS 14 Sleekbook**. It’s old enough that nobody would mistake it for a shiny new server box, but that’s part of the fun.

Using older hardware forces you to be a little more intentional. You don’t throw five unnecessary layers of infrastructure at the problem. You keep things lean. You think in terms of “what’s the simplest thing that works well?”

That turned out to be a good mindset for OpenClaw.

Here’s what the laptop is running with right now:

- **Model:** HP ENVY TS 14 Sleekbook
- **CPU:** Intel Core i5-4200U @ 1.60GHz
- **Threads:** 4
- **RAM:** 7.7 GiB
- **Disk:** 913 GB total (`/`), with plenty of free space left
- **OS:** Ubuntu 24.04.4 LTS
- **Node.js:** v22.22.2
- **OpenClaw:** 2026.4.2

That’s not exactly datacenter hardware, and that’s the point. For an always-on personal assistant setup, it’s more than capable.

## The setup process

The actual setup was surprisingly approachable.

At a high level, I:

- installed and configured OpenClaw
- connected Telegram so I could message my assistant remotely
- set up a workspace for notes, memory, and project context
- connected Gmail in read-only mode
- configured scheduled checks and reminders
- enabled GitHub access and SSH auth
- used the machine as a local home base for personal projects, including my personal site at [abhisek.xyz](https://www.abhisek.xyz/) and our wedding site at [sanjeevneeabhisek.love](https://sanjeevneeabhisek.love/)

One of the nice things about OpenClaw is that it can grow with you. You can start with one useful workflow and slowly add more.

That’s what happened for me.

I started with basic chat access. Then I added email checking. Then reminders. Then GitHub access. Then project workflows. At some point, the machine stopped feeling like “an old laptop running some tools” and started feeling more like a small personal agent box.

## Drafting this post with the assistant itself

One of my favorite little details is that I’m not writing this post alone in a browser tab. I’m drafting it together with the assistant over a Telegram chat.

That feels like a small but meaningful milestone.

The same setup running on the laptop is the one helping me think through the structure of this post, clean up the writing, and turn rough notes into something publishable. There is something delightfully recursive about using the system you built to help document how you built it.

It also makes the whole thing feel more real. This isn’t a theoretical setup diagram or a polished demo environment. It’s an actual working assistant on an actual old laptop, and this post is being shaped in conversation with it.

## Making it actually stay on

One of the practical problems with using a laptop as a semi-server is the lid.

If you close the lid and the system goes to sleep, your assistant also takes a nap whether you asked for one or not.

So part of the setup was making sure the laptop could keep running even with the lid closed. That meant adjusting the power behavior so it wouldn’t suspend automatically just because the flap was shut.

That tiny detail matters a lot. A personal assistant is much more useful when it isn’t unconscious.

## What it can do now

At this point, the setup can do quite a bit of useful work for me.

A few examples:

- check my email and notify me about important messages
- send me scheduled reminders, including medication reminders
- inspect local repositories for personal projects
- clone and run websites locally, including [abhisek.xyz](https://www.abhisek.xyz/) and [sanjeevneeabhisek.love](https://sanjeevneeabhisek.love/)
- help me understand project structure and tech stacks
- work with GitHub through SSH and the GitHub CLI
- maintain notes and memory in a local workspace
- respond to me over Telegram in a way that feels conversational, not just transactional

That last part matters more than I expected.

The difference between “a tool” and “an assistant” is not just capability. It’s continuity. It’s context. It’s the feeling that the system knows what it is helping you do.

## Why I like this setup

I like this setup because it feels personal.

It lives on my hardware. It can work with my files, my projects, my routines, and my messaging flow. It’s not trying to be a generic productivity platform for everybody. It’s just my setup, shaped around what I actually need.

There’s also a nice kind of computational thrift in it. Old hardware often gets treated like e-waste-in-waiting, but for lightweight always-on workflows, it can still be incredibly useful.

Not everything needs the cloud. Sometimes a slightly stubborn old laptop and a good idea are enough.

## What’s next

There’s still plenty I want to improve.

I’d like to make the setup even smoother by:

- refining notifications
- connecting more tools and services
- improving long-term memory and context
- adding more structured project workflows
- making the whole thing a little more polished and self-maintaining

But even in its current form, it already feels worth it.

The old laptop is no longer retired. It has a job now.

And honestly, it’s doing pretty well.
