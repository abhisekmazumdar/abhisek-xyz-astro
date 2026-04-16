---
title: "One Repo, Any Mac"
description: "How I use a dotfiles repo to spin up any new Mac exactly the way I like it — apps, configs, and aliases all in one place."
pubDate: 2026-04-16
coverImage: ../../assets/logs/dotfiles-mac-setup.jpeg
---

New Mac. Clean slate. And the creeping dread of spending a day reinstalling everything, tweaking settings, hunting down the alias you swore you wrote down somewhere.

I stopped doing that.

A dotfiles repo means my entire development environment — every config file, every app, every macOS preference — lives in one place. One script to rule them all. Pull it down on any machine and you're back to exactly where you were.

## What's a Dotfile?

Configuration files on Unix systems traditionally start with a dot (`.zshrc`, `.gitconfig`), which is why they're called dotfiles. The trick is to keep them all in a single git repo and symlink them back to where your system expects them.

So `~/.zshrc` isn't really in your home folder — it's a pointer to `~/.dotfiles/zsh/.zshrc`. The actual file lives in the repo. Change it once, it's version-controlled, and it's the same on every machine.

## The Setup

My dotfiles repo covers:

- **Shell** — `.zshrc`, aliases, and PATH management via Oh My Zsh with custom plugins
- **Git** — `.gitconfig` with my name, email, default branch (`main`), and a global `.gitignore`
- **Apps** — a `Brewfile` that lists every binary and Mac app I use. One `brew bundle` and Ghostty, VS Code, Raycast, Bruno, Sequel Ace, and ~50 others are installed
- **macOS preferences** — a `.macos` script that sets Finder to show hidden files, cranks up keyboard repeat speed, enables tap-to-click, and configures the Dock exactly how I want it

The bootstrap is a single script: `fresh.sh`. Run it on a fresh Mac and it installs Xcode CLI tools, Oh My Zsh, Homebrew, all packages from the Brewfile, Node via nvm, PHP tooling for Drupal work, and sets up all the symlinks. There's even a `test.sh` that runs after and verifies everything landed correctly.

## Secrets Stay Out of the Repo

The repo is public. Nothing sensitive goes in it — ever.

SSH keys need to be set up before running the script (GitHub auth), and that's done separately through macOS Keychain. Any project-level credentials live in `.env` files that are always gitignored. The rule is simple: if it's a secret, it's not in dotfiles.

## Why Bother?

Honestly, I don't touch this repo often. It's not a daily tool. But the moment something goes wrong with my current setup, or I'm onboarding a new machine, it's invaluable. Everything is reproducible. Nothing is tribal knowledge locked in my head.

It's also a nice way to share what I actually use. The Brewfile is basically a public list of my toolkit.

The repo is at [github.com/abhisekmazumdar/dotfiles](https://github.com/abhisekmazumdar/dotfiles) if you want to peek or steal ideas for your own.
