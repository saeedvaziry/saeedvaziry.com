---
author: Saeed Vaziry
pubDatetime: 2022-03-10T10:22:00Z
title: Mysql auto backup to Dropbox
slug: mysql-auto-backup-to-dropbox
featured: false
draft: false
tags:
  - vitodeploy
  - project
  - tutorial
description: In this article, I’m gonna show you how you can easily configure an auto backup Mysql database to a Dropbox account using Mysqldump and Cron jobs on an Ubuntu server.
---

In this article, I’m gonna show you how you can easily configure an auto backup Mysql database to a Dropbox account using Mysqldump and Cron jobs on an Ubuntu server.

## Set up the Dropbox

To store the backup files in Dropbox, You’ll need, of course, a Dropbox account and an API Key associated with it.

Go to your [Dropbox account](https://www.dropbox.com/) and generate an API Key and save it.

## Backup

Let’s make a backup with the `mysqldump` command:

```sh
sudo mysqldump -u root db_name > backup_name.sql
```

Very easy hah? 😁

Make sure that you’ve installed the `zip` app on your server. Here is the installation for Ubuntu:

```sh
sudo apt install zip
```

Then let’s zip it:

```sh
zip backup.zip backup_name.sql
```

## Upload to Dropbox

To upload the backup file to Dropbox we need `curl`. Here is the installation for Ubuntu:

```sh
sudo apt install curl
```

Replace the parameters in the below command and execute it.

```sh
curl --location --request POST 'https://content.dropboxapi.com/2/files/upload' \
--header 'Accept: application/json' \
--header 'Dropbox-API-Arg: {"path":"{PATH-ON-DROPBOX}"}' \
--header 'Content-Type: text/plain; charset=dropbox-cors-hack' \
--header 'Authorization: Bearer {YOUR-DROPBOX-API-TOKEN}' \
--data-binary '@{PATH-TO-BACKUP-FILE}'
```

You should receive a response like this

```json
{
    "name": "backup.zip",
    "path_lower": "/path/to/backup.zip",
    "path_display": "/path/to/backup.zip",
    "id": "id:XXXXXXXXX",
    "client_modified": "XXXXX",
    "server_modified": "XXXXX",
    "rev": "XXXXXXX",
    "size": 111,
    "is_downloadable": true,
    "content_hash": "XXXXXXXX"
}
```

## Automation

To automate this process we’ll use Cron jobs but first, we need to gather all steps together and create an executable file.

Create a file named `autobackup.sh` with the below content and don’t forget to replace the variables.

```sh
sudo mysqldump -u root db_name > backup_name.sql

zip backup.zip backup_name.sql

curl --location --request POST 'https://content.dropboxapi.com/2/files/upload' \
--header 'Accept: application/json' \
--header 'Dropbox-API-Arg: {"path":"{PATH-ON-DROPBOX}"}' \
--header 'Content-Type: text/plain; charset=dropbox-cors-hack' \
--header 'Authorization: Bearer {YOUR-DROPBOX-API-TOKEN}' \
--data-binary '@{PATH-TO-BACKUP-FILE}'
```

Then make the file executable:

```sh
sudo chmod +x autobackup.sh
```

Now let’s set up the Cron job.

Run the following command to open the crontab file (My favorite editor is `nano`)

```sh
EDITOR=nano crontab -e
```

And then append the following line to the end of it with your preferred [cronjob interval](https://crontab.guru/)

This example is making a backup hourly:

```sh
0 * * * * /path/to/autobackup.sh
```

That’s it! 🎉

I’ll be happy to hear your thoughts about this article.