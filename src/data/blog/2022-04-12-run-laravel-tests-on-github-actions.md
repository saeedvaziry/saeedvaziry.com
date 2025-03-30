---
author: Saeed Vaziry
pubDatetime: 2022-04-12T10:22:00Z
title: Run Laravel tests on GitHub Actions
slug: run-laravel-tests-on-github-actions
featured: false
draft: false
tags:
  - automation
  - laravel
  - github
  - ci/cd
description: Imagine yourself in a big team coding on a single project. In our scenario the project is Laravel. There would be tens of Pull Requests waiting to merge but you need to make sure that nothing wrong after the merge. Obviously, you’ll have tests in your project but it would be very tricky to go through the all PRs and run the tests on your local.
---

Imagine yourself in a big team coding on a single project. In our scenario the project is Laravel. There would be tens of Pull Requests waiting to merge but you need to make sure that nothing goes wrong after the merge. Obviously, you’ll have tests in your project but it would be very tricky to go through the all PRs and run the tests on your local.

## GitHub Actions

Thanks to GitHub there is a feature called Actions that comes in handy in this case.

I am not going to tell you about the GitHub Actions. You can read more here.

## Create Workflow

First, you need to create a `yml` file in the `.github` directory of your project’s root. In this case, I’m using `tests.yml` and then configuring it as below.

## Configuration

For those who want to cut to the chase and jump to the configuration, Here it is.

```yaml
name: tests

on:
  push:
  pull_request:

jobs:
  tests:
    runs-on: ubuntu-20.04

    services:
      mysql:
        image: mysql
        env:
          MYSQL_DATABASE: test_db
          MYSQL_USER: user
          MYSQL_PASSWORD: password
          MYSQL_ROOT_PASSWORD: rootpassword
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    strategy:
      fail-fast: true
      matrix:
        php: [ 7.3, 7.4, 8.0, 8.1 ]
        laravel: [ ^8.0 ]

    steps:
      - uses: actions/checkout@v2

      - name: Cache Composer packages
        id: composer-cache
        uses: actions/cache@v2
        with:
          path: vendor
          key: ${{ runner.os }}-php-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-php-
      - name: Install dependencies
        if: steps.composer-cache.outputs.cache-hit != 'true'
        run: composer install --prefer-dist --no-progress --no-suggest

      - name: Run test suite
        run: vendor/bin/phpunit --verbose
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: test_db
          DB_USERNAME: user
          DB_PASSWORD: password
```

And for those who want to know what the hell happened here, I will explain some important parts.

## Database

Use this section if your tests need a database specially Mysql.

```yaml
services:
  mysql:
    image: mysql
    env:
      MYSQL_DATABASE: test_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - 3306:3306
    options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
```

You can modify the `env` variables as you wish.

## Strategy

In this part, you can define your tests should run on what Laravel or PHP versions. Very useful if you are willing to support multiple versions of Laravel or PHP.

## Steps

The important section is the `steps` section that contains the actual steps that are happening to run your tests.

I am using [actions/checkout@v2](https://github.com/actions/checkout) to handle the steps. You should too 😁 (Kidding)

The important part of this step is the part where you’re running the tests, The last part. Just make sure that the `env` variables are right. That’s it!

## Final word

If you had any trouble with setting this up, Feel free to comment here. I’ll help you as much as I can.

As always, I’ll be happy to hear your thoughts 😉.