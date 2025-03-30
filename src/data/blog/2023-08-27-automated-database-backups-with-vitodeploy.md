---
author: Saeed Vaziry
pubDatetime: 2023-08-27T17:22:00Z
title: Automated Database Backups with VitoDeploy
slug: automated-database-backups-with-vitodeploy
featured: false
draft: false
tags:
  - vitodeploy
  - project
  - tutorial
description: Yesterday I released an update for VitoDeploy which enables you to backup your databases into cloud!
---

Yesterday I released an update for [VitoDeploy](https://vitodeploy.com/) which enables you to backup your databases into cloud!

### Creating Backups

[VitoDeploy](https://vitodeploy.com/) provides you some storage drivers so you can connect to them.

In this case Dropbox for example. You can connect your Dropbox account to your [VitoDeploy](https://vitodeploy.com/) instance.

And then you can create backups with customized configuration.

And then [VitoDeploy](https://vitodeploy.com/) starts creating backups of your selected database and uploads them into your selected storage driver.

### Restoring Backups

You always have this option to restore a backup into the same database or different databases!

So simple to use :)

Read more about the backups on the [Documentation](https://vitodeploy.com/servers/database-backups.html)

[Github Repository](https://github.com/vitodeploy/vito)