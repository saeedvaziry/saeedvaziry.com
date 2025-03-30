---
author: Saeed Vaziry
pubDatetime: 2023-08-12T14:22:00Z
title: Free, Open-Source and Self-Hosted Server Management Tool
slug: free-open-source-and-self-hosted-server-management-tool
featured: true
draft: false
tags:
  - vitodeploy
  - project
description: VitoDeploy — Free, Open-Source and Self-Hosted Server Management Tool
---

Recently, I released a beta version of [VitoDeploy](https://vitodeploy.com) 🎉

VitoDeploy — Free, Open-Source and Self-Hosted Server Management Tool

### Background

So, Vito is technically my child. I’ve been working on it for more than 2.5 years! Back then, I really needed some tool to deploy my PHP, and Laravel applications into the production servers and since I was living in a country where I wasn’t able to have an international bank account to purchase Laravel Forge, I decided to build my own tool.

After working a year on Vito, I wanted to make some money out of it and sell it as a service but then I realized that I owe this to the community and I have to make it open-source!

Long story short, I made some changes to the original app and removed all subscriptions that I had put on it and build a nice [documentation](https://vitodeploy.com), and released it.

### What is Vito?

Its a server management tool specially built to manage PHP application servers.

Vito is a web application written by PHP and Laravel framework. It gives you a nice user interface to manage your servers.

Vito is built to help developers to deploy and manage their PHP and most specially Laravel applications into the production servers without a hassle.

### How it works?

Vito is being installed on a server and you can open and login to the web application.

The web application is connecting to your Production servers and installs all necessary tools that your PHP app needs to run on the production server.

It manages your

*   Sites
*   Databases
*   Database Backups
*   Firewall
*   Services
*   Cronjobs
*   Queues
*   SSL
*   SSH Keys
*   Source Controls
*   and more…

### How to Install?

I made the installation as simple as possible! You just need to run one single command on your Ubuntu server with the `root` user

```sh
wget https://raw.githubusercontent.com/vitodeploy/vito/2.x/scripts/install.sh && bash install.sh
```

But I recommend you to go through the [documentation](https://vitodeploy.com/docs/getting-started/installation.html)

If you enjoyed, Follow me on [Twitter](https://twitter.com/saeed_vz).