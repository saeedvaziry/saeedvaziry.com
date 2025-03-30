---
author: Saeed Vaziry
pubDatetime: 2024-04-24T20:13:00Z
title: Laravel and HTMX Error Handling
slug: laravel-and-htmx-error-handling
featured: false
draft: false
tags:
  - laravel
  - htmx
description: It's been a while now I am using HTMX more often especially after I migrated VitoDeploy to HTMX!
---

It's been a while now I am using HTMX more often especially after I migrated [VitoDeploy](http://vitodeploy.com/) to HTMX!

Here I will show you how you can nicely handle the server errors when using HTMX for your HTTP calls in your frontend.

---

## The Problem

When you're using HTMX and making HTTP requests to the app server, It can throw errors and exceptions and you will be only able to see these errors on the Network tab of your browser. But we need something to pop up immediately on the browser.

## The way that HTMX works

Well, like other Javascript HTTP clients, it sends HTTP requests to the server but it has the capability that you can listen for events after each request and see if a response was successful or it failed with some HTTP responses.

HTMX has multiple events but here I will use `htmx:beforeOnLoad`.

## The Idea

So the idea is to create a Blade component and a modal that will show up when any HTMX call ends up with an error!

## Let's implement some code!

OK. Create a component called `htmx-error-handler`:

```php
php artisan make:component htmx-error-handler --view
```

Put the following code inside your component:

```html
<div>
    <style>
        #htmx-error-modal-backdrop {
            display: none; /* Hide by default */
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        }
        #htmx-error-modal-content {
            background-color: #fefefe;
            margin: 50px auto; /* 200px from the top and centered */
            padding: 0;
            width: calc(100% - 100px); /* Full width minus the margin */
            height: calc(100% - 100px); /* Full height minus the margin */
            position: relative;
        }
        #htmx-error-modal-content iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
    <div id="htmx-error-modal-backdrop" onclick="closeHtmxErrorModal()">
        <div id="htmx-error-modal-content" onclick="event.stopPropagation()"></div>
    </div>
    <script>
        function closeHtmxErrorModal() {
            document.getElementById('htmx-error-modal-backdrop').style.display = 'none';
            document.getElementById('htmx-error-modal-content').innerHTML = '';
        }
        document.body.addEventListener('htmx:beforeOnLoad', function (evt) {
            if (evt.detail.xhr.status >= 400) {
                let iframe = document.createElement('iframe');
                document.getElementById('htmx-error-modal-content').appendChild(iframe);
                iframe.src = 'about:blank';
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(evt.detail.xhr.responseText);
                iframe.contentWindow.document.close();
                document.getElementById('htmx-error-modal-backdrop').style.display = 'block';
            }
        });
    </script>
</div>
```

I am sure you don't want me to explain how this is working so I skip :))

Now you need to inject the component into your main layout:

```html
<html>
    ...
    <body>
        ...
        <x-htmx-error-handler />
        ...
    </body>
</html>
```

Alright, DONE!