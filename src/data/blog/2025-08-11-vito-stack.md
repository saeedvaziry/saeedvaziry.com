---
author: Saeed Vaziry
pubDatetime: 2025-08-11T20:13:00Z
title: Inertia, HTMX, Livewire and Filament, I tried all on Vito
slug: inertia-htmx-livewire-and-filament-I-tried-all-on-vito
featured: true
draft: false
tags:
  - vitodeploy
  - htmx
  - livewire
  - filamentphp
  - react
  - inertiajs
description: I had an interesting journey and struggles with tech stacks in VitoDeploy! Boy... what a journey! Believing or not, I have re-written Vito 4 times at least! Yes. from scratch and full refactoring 😄
---

I had an interesting journey and struggles with tech stacks in VitoDeploy! Boy... what a journey! Believing or not, I have re-written Vito 4 times at least! Yes. from scratch and full refactoring 😄

**Disclaimer, This post is not about Pros and Cons about these stacks, Its just my experience in one project.**


## How it started

Did you know Vito initially built with Inertia?! Initially I was planning to make money out of it. So kinda built it as a SaaS with Inertia and Vue and added subscriptions and plans. Then I changed my mind and I decided to make it FREE and open source. While doing it, I realised I am putting a lot of effort into the frontend part and then this story started...

## Livewire and single stack

I migrated Vito to Livewire and focused on backend and PHP only. Livewire was good enough for the first beta version of Vito. things were just working fine. I was able to write good amount of tests and keep developing the project.

Since I was following the actions pattern, It didn't take too long that I realised I am getting drowned in a lot of files that I needed to create for every new feature.

I had Actions, Jobs, SSH commands and then there was Livewire's blade files and class components and for some cases Controllers and Resources.

I said I cannot continue with this, its getting bigger and massive. I decided to make things less complicated and cut some stuff in the middle. Then this idea came up that to do things a bit more traditionally :D...

## HTMX, Simple and easy to JUST Ship!

I got to know what HTMX is and I was amazed how simple it is! So I said lets make vito simpler with HTMX and focus on shipping the features users need. Migrating everything to HTMX didn't really take much and I managed to cut a lot of files out and make things way more simpler and straitforward.

I released version 1 with simple blade files. html forms with POST methods handled by HTMX to keep the user experience better.

Things were going really good and I was keep adding good features and I had less worry on the frontend stack.

The more features I added, the more I realised that sometimes I am losing the design structure, components are falling apart and I need something really unified.

### Why HTMX was a good choice

- Vito had less frontend based features and UI complications
- Vito only needed forms to be submitted

### Why HTMX wasn't a good choice

- At some point Vito needed more frontend features that frameworks like react/vue makes them easy
- I had to write a lot of vanila JS and I really didn't have time and I just wanted to ship some features.

## FilamentPHP and Good Bye frontend 👋

This was a difficult decision. I didn't know even its gonna work or not but honestly I did it because I wanted to!

I almost deleted all the blade files. except some layout or custom components which were less than hand fingers.

It was amazing, I had the entire Vito running without frontend coding! everything was PHP classes. There was a folder in the app directory called Web and every frontend page was there in PHP classes.

Vito version 2 was great. This was purely about shipping features.

But... :(

Yes, here it comes the But! I was stuck in the same dashboard layout. Components were great but the layout was difficult. I know it was possible to customize it but come on... I would be ending doing custom blade files and there wasn't any difference with the HTMX version in the end.

So I had to make a life time decision this time. I have learned my lesson and I realized that wanting or not, I have to deal with frontend if I want to make Vito in the way I want.

## Final destination, React and Inertia

I think this is final! Do I? I hope so 😄

Migrating to Inertia and React wasn't really difficult. I enjoyed how independent Vito is from the frontend that I can change it easily.

Why React and Inertia is the best choice for Vito?

Well, First of all Inertia makes the communication between server and the frontend really simple and seemless which I love it.

Second, React's community is rich and everything is there and there is no need to build it myself.

Third, Having full control over the frontend made the current beautiful dashboard and better UX that you can easily jump to servers and sites and navigate between them. isn't it cool?


