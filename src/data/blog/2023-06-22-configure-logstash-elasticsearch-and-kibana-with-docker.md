---
author: Saeed Vaziry
pubDatetime: 2023-06-22T17:56:00Z
title: Configure Logstash, Elasticsearch, and Kibana with Docker
slug: configure-logstash-elasticsearch-and-kibana-with-docker
featured: false
draft: false
tags:
  - logstash
  - elasticsearch
  - kibana
  - docker
description: Logging is a meaningful way to monitor your application’s behavior. When it comes to production and having multiple servers running one application in different instances, You might want to have a unified logging system to check them all in one place.
---

It was a long time ago I wanted to write this post and show you how to set up a docker-compose with all you need to have a separate logging system.

Logging is a meaningful way to monitor your application’s behavior. When it comes to production and having multiple servers running one application in different instances, You might want to have a unified logging system to check them all in one place.

So finally the day has come! In this post, I am going to show you how you can configure a docker server to have Logstash, Elasticsearch, and Kibana and will show you how you can use it with PHP, Laravel

## Requirements

To get started you need to have a server. A VPS would be enough.

Then make sure you have installed `git` , `docker` and `docker-compose`.

## Installation

Clone the repo from the [Github repository](https://github.com/saeedvaziry/elk)

```sh
git clone https://github.com/saeedvaziry/elk.git
```

And then navigate to the folder

```bash
cd elk
```

Copy the `.env` file and fill it with your preferences

```bash
cp .env.example .env
```

The default `.env` should be enough but make sure you set a strong password to `ELASTIC_PASSWORD` inside the `.env`

Now you may run the following command to bring up the containers:

```bash
docker-compose up -d
```

This will download the images and boot up the containers and it may take a couple of minutes.

## Add logging integration

After all of the containers are booted you can log in to Kibana.

Simply go to `http://YOUR-SERVER-IP:5601` and log in via the Elastic credentials you have set in the `.env` file. If you’ve changed the Kibana port then you might navigate to that port instead of `5601`.

Go to the `integrations` from the side menu and find the `Custom UDP Logs`

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168689721/7c0ea718-7c44-4bef-9efe-fbccf17e99a8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168699070/e752d581-621a-4c65-a39d-56d5ee3b7c0c.png align="center")

Add Custom UDP Logs and configure it as bellow

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168708289/32a15e4e-5a8e-448e-9fb6-afe28af06740.png align="center")

Then save the integration.

Keep in mind that Listen Port here is `8000` which is the one you specified in your `.env` as `LOGSTASH_PORT_UDP`

## Configure index pattern

Go to Index Patterns and create an index pattern

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168715784/2b93ba81-6107-4cf6-afb7-490d8de9e939.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168721217/95076c1d-2f00-459e-89bd-097c2c5089a1.png align="center")

Fill in the fields as the screenshot and Create it.

You are done here!

## Send your first Log

Here is a sample PHP code so you can send your first log to Logstash

```php
<?php

$socket = fsockopen('udp://YOUR-SERVER-IP', 8000, $errno, $errstr);
if (! $socket) {
    echo "ERROR: $errno - $errstr<br />\n";
} else {
    fwrite($socket, json_encode(['message' => 'Test log message']));
    fclose($socket);
}
```

## View the Logs

After you run the code, You should be able to see the log in the Kibana on the `Discovery` menu.

Simply navigate to `Discovery` page of Kibana and select `logstash-*` pattern to view the logs you receive

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168730323/cdfa24b4-71e0-40b7-aa8c-2e9a5b47b5cf.png align="center")

Cool stuff 😎

## Use Logstash in Laravel

OK! My favorite part 🙂

You don’t have much to do here actually. Just need to create a custom log driver and send the logs via that custom driver to Logstash.

Go to your `config/logging.php` file and create the custom driver there.

```php
'logstash' => [
    'driver' => 'custom',
    'via' => \App\Loggers\Logstash::class,
    'host' => env('LOGSTASH_HOST', 'YOUR-SERVER-IP'),
    'port' => env('LOGSTASH_PORT', '8000'),
],
```

Now create `\App\Loggers\Logstash::class` and add the following code there

```php
<?php

namespace App\Loggers;

use Monolog\Formatter\LogstashFormatter;
use Monolog\Handler\SocketHandler;
use Monolog\Logger;
use Monolog\Processor\WebProcessor;
use Psr\Log\LoggerInterface;

class Logstash
{
    public function __invoke(array $config): LoggerInterface
    {
        $handler = new SocketHandler("udp://{$config['host']}:{$config['port']}");
        $handler->setFormatter(new LogstashFormatter(config('app.name')));
        $handler->pushProcessor(new WebProcessor);

        return new Logger('logstash', [$handler]);
    }
}
```

All done! Now you may send your first log like this

```php
Log::channel('logstash')->info('Hello from Laravel');
```

## Final word

Logs are always handy, Don’t remove them from your applications 🙂

I hope you enjoyed the post. Let me know what you think about it.

See you in the next one!

Cheers 🍻