---
author: Saeed Vaziry
pubDatetime: 2022-02-20T16:22:00Z
title: How to monitor Laravel application servers
slug: how-to-monitor-laravel-application-servers
featured: false
draft: false
tags:
  - laravel
  - php
description: Laravel Monitoring is a package by myself so you can monitor your Laravel application’s server resources like CPU, Disk, and Memory
---

[Laravel Monitoring](https://github.com/saeedvaziry/laravel-monitoring) is a package by [myself](https://github.com/saeedvaziry) so you can monitor your Laravel application’s server resources like CPU, Disk, and Memory

This package provides a beautiful dashboard with a fancy chart showing the server’s resource usage from one hour to a day.

### Multi-Server support

The amazing part of this package which is my favorite part also, Is you can see monitor all of your servers in one place!

For example, consider that you have several servers running the same source code. Just install this package into your application and share a database between all of the servers so this package can write into it.

### Facade Usage

You can get the resource usage by using the below codes

```php
Monitoring::cpu()->usage(); // returns CPU usage</em>
Monitoring::memory()->usage(); // returns Memory usage</em>
Monitoring::disk()->usage(); // returns Disk usage</em>
```

Check the [Github Repo](https://github.com/saeedvaziry/laravel-monitoring) for installation and more information.