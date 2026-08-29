---
author: Saeed Vaziry
pubDatetime: 2026-08-29T10:19:00Z
title: Rewriting Muxy in Rust
slug: rewriting-muxy-in-rust
featured: true
draft: false
tags:
  - muxy
  - rust
  - swift
  - gpui
  - rewrite
description: I have decided to rewrite Muxy in Rust. I have found Rust to be a fascinating programming language, especially because of its safety features in the AI era.
---

I have decided to rewrite [Muxy](https://github.com/muxy-app/muxy) in Rust. I have found Rust to be a fascinating programming language, especially because of its safety features in the AI era.

## TL;DR

Muxy is written in native Swift and is only available for Mac. In order to make the app available on other platforms, such as Linux and Windows, I have decided to embark on this journey and rewrite it in Rust.

## But really, why?

Well, I had a lot of tokens and needed to burn them :))

But seriously, I've received a lot of requests to make Muxy available on other platforms too. On the other hand, I am not a 100% Mac user. I also use a Linux desktop, and I really needed to have Muxy there too.

That's the simple answer to why I decided to do this.

## The way I looked at the problem

Rewriting almost 200K lines of Swift code in Rust is not a one-shot prompt, of course.

The biggest bottleneck is the terminal, of course, so I ran a discovery and started building a prototype to see how I could integrate Libghostty with Rust, because I wanted the Rust app to be as identical as possible to the Swift app.

When I proved that I could get the terminal working, I started a full discovery to extract a very high-level picture of the app. Something like:

- The app layout
- Git operations
- Terminal surface
- Projects and Workspaces
- Notifications
- Remote server
- etc.

I sorted these out in a way that would let me visually test the app after each top-level feature rewrite and, of course, determine the order of the rewrites.

## The plan and the SKILL

I needed to tackle the entire thing, but that's a very large scope, so breaking the idea into top-level phases and planning each phase into subphases was the right approach.

So I made the [Super Plan](https://github.com/saeedvaziry/skills#super-plan) skill and started planning the entire migration, using it as a kind of orchestrator in the PLAN.md file.

The plan file was supposed to keep track of the top-level feature rewrites and serve as persistent memory for the migration.

Now, all I needed was to plan each phase and execute it.

It's worth mentioning that I also designed the future architecture of the Rust app during the discovery phase. This was when I decided on the architecture and dependencies, such as GPUI, and locked in those decisions.

I will write another post to explain how the Super Plan skill supports these steps.

## Current status

Of the 16 top-level phases, five or six of them are done so far. The Super Plan skill is very slow as it grinds through everything and leaves only the mechanics to be executed.

Believe it or not, every phase takes a day or two to be planned and executed! 😅

But hey, it's working so far, and I can't complain.

## Stay tuned

I'll share more updates on [Twitter](https://x.com/saeed_vz) 📻
