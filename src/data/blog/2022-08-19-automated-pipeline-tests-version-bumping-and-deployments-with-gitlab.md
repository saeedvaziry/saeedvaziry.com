---
author: Saeed Vaziry
pubDatetime: 2022-08-19T22:12:00Z
title: Automated pipeline tests, version bumping and deployments with Gitlab
slug: automated-pipeline-tests-version-bumping-and-deployments-with-gitlab
featured: false
draft: false
tags:
  - automation
  - ci/cd
  - pipeline
  - gitlab
description: I want to share with you how to set up a fully automated deployment including tests and version bumping.
---

This is one of my favorite topics! Setting up a fully automated deployment.

I want to share with you how to set up a fully automated deployment including tests and version bumping.

I am using PHP and Laravel as the sample project but please keep in mind that this post is not limited to Laravel and PHP only!

If you don’t want to read the post and jump to the Repo:

[Laravel Auto Deploy Gitlab](https://gitlab.com/saeedvaziry/laravel-auto-deploy)

## Story

When you push any commit to your main branch it will start testing, If it was successful then it will start to bump a new version and generate a tag for that commit. After that, you’ll see a tag on the tags page of Gitlab. To deploy that tag to your server, You just need to open the pipeline and start the deployment job!

If you feel confused, Don’t worry we’ll get back to this later in this post.

## Setup

Create `.gitlab-ci.yml` file at the root of your project and continue reading this post 🙂

## Tests

Before we start, I assume that you have your project ready and your project has some tests. If it doesn’t have any tests (I hope it does 🙂), skip the test part.

To create test pipelines simply add the following content to your `.gitlab-ci.yml`

```yaml
stages:
  - test

test:
  stage: test
  image: php:8.1-fpm
  services:
    - mysql:lates
  variables:
    MYSQL_DATABASE: $DB_DATABASE
    MYSQL_ROOT_PASSWORD: DbRootPass
    DB_HOST: mysql
    DB_USERNAME: root
    DB_PASSWORD: DbRootPass
  before_script:
    - apt-get update
    - apt-get install -qq libzip-dev git curl libmcrypt-dev libjpeg-dev libpng-dev libfreetype6-dev libbz2-dev zip unzip
    - docker-php-ext-install pdo_mysql zip
    - curl --silent --show-error "https://getcomposer.org/installer" | php -- --install-dir=/usr/local/bin --filename=composer
  script:
    - cp .env.example .env
    - composer install
    - php artisan db:create
    - php artisan key:generate
    - php artisan --env=testing migrate
    - php artisan test
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - vendor/
  except:
    refs:
      - tags
    variables:
      - $CI_COMMIT_TITLE =~ /^RELEASE:.+$/
```

If you push these changes you’ll see a pipeline appears on Gitlab.

If you look carefully at the code above you will see that I’ve disabled running tests on the tags because the tests are being tested on the main branch so no need to test them again on tags! but it’s up to you.

## Bumping Versions

What do I mean by this? So the idea is to generate a version using semantic versioning when there was a push to the main branch.

I am using [Semantic Release](https://github.com/semantic-release/semantic-release) library to achieve that. This library checks if there was a commit that can be considered a version then it will release a tag (version) for that. By default, it uses the Commit Analyzer with [conversational commits](https://www.conventionalcommits.org/), But you can change it of course. For example if you want to release a feature you must have a commit message like this: `feat(something): something else`

Extend the `.gitlab-ci.yml` file with the following codes:

```yaml
stages:
	- test
	- version
test:
	...
version:
  stage: version
  image: node:alpine
  before_script:
    - apk add --no-cache git
    - npm install @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/gitlab @semantic-release/npm @semantic-release/release-notes-generator conventional-changelog-conventionalcommits semantic-release
  script:
    - npx semantic-release
  only:
    - main
  variables:
    GL_TOKEN: $GL_TOKEN
  except:
    refs:
      - tags
    variables:
      - $CI_COMMIT_TITLE =~ /^RELEASE:.+$/
```

Then create a Gitlab Token on your repository with write access and put it on the pipeline environments into `GL_TOKEN` key.

And then put the following content into your `package.json` file

```yaml
...
"release": {
    "branches": [
        "main"
    ],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator"
    ]
},
...
```

If you push these changes you will see some pipelines like below:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168793409/af3ecbae-190d-4b27-8f35-df07d78982f2.png align="center")

And if it was successful:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168801780/2e89b113-cb37-4378-8d4a-de3516ca0239.png align="center")

And you should be able to see the new version has been generated on the tags page.

## Deployment

Let’s now deploy our project to the server 🚀

I assume that you have your production server ready and you already set it up and deployed the first version.

The plan is to create a new pipeline for the deployment and make it manual and only available on the tags! So you can deploy any tags (versions) manually by pressing a button.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168814005/92b94762-56af-4461-9513-69e8c8b9b51a.png align="center")

First, SSH to your server and create a new user or use the current user for the deployments.

[Generate an SSH key](https://docs.gitlab.com/ee/user/ssh.html) if you don’t have one already and make sure that you generate it without a passphrase.

```sh
# As the deployer user on server
# Copy the content of public key to authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
# Copy the private key text block
cat ~/.ssh/id_rsa
```

Copy the generated private key and store it on GitLab pipeline variables into `PROD_SERVER_KEY`

You should have these keys on your GitLab pipeline variables

```plaintext
PROD_SERVER_KEY -> The private key that you created
PROD_SERVER_IP -> Your server's IP Address
PROD_SERVER_PATH -> Root path of your application in the server
PROD_SERVER_USER -> Your server's user
```

Make sure all of them are unprotected and not masked so the pipeline can have access to them when running on the Tags.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168823821/90a88781-1b3f-4121-9d0c-9d3a07a6c383.png align="center")

Install [Laravel Envoy](https://laravel.com/docs/9.x/envoy) and configure it according to my [sample configuration](https://gitlab.com/saeedvaziry/laravel-auto-deploy/-/blob/main/Envoy.blade.php)

You can skip this step and set up your deployment script inside the `.gitlab-ci.yml`

Extend your `.gitlab-ci.yml` and add deploy stage to it.

```yaml
stages:
  - test
  - version
  - deploy
test:
	...
version:
	...
deploy:
  stage: deploy
  image: php:8.1-fpm
  variables:
    PROD_SERVER_IP: $PROD_SERVER_IP
    PROD_SERVER_USER: $PROD_SERVER_USER
    PROD_SERVER_KEY: $PROD_SERVER_KEY
    PROD_SERVER_PATH: $PROD_SERVER_PATH
  before_script:
    - apt-get update
    - apt-get install -qq libzip-dev git curl libmcrypt-dev libjpeg-dev libpng-dev libfreetype6-dev libbz2-dev zip unzip
    - docker-php-ext-install pdo_mysql zip
    - curl --silent --show-error "https://getcomposer.org/installer" | php -- --install-dir=/usr/local/bin --filename=composer
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'
    - eval $(ssh-agent -s)
    - echo "$PROD_SERVER_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan "$PROD_SERVER_IP" >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
  script:
    - composer install
    - php ./vendor/bin/envoy run deploy
  only:
    - tags
  when: manual
```

If you don’t use Laravel Envoy then just replace the `script` section with your own script.

This configuration will generate a new pipeline that is available only in tags and it is manual like the screenshot below:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1705168833035/03ce2788-aa21-4db7-8b6c-2d90e3a6c5ec.png align="center")

When you want to deploy any tag, Just open the pipeline and press the `Play` button.

You can see the whole project’s source code [here](https://gitlab.com/saeedvaziry/laravel-auto-deploy) including the pipelines.

I hope you enjoyed ❤️