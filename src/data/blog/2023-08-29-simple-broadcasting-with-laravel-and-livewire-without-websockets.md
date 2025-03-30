---
author: Saeed Vaziry
pubDatetime: 2023-08-29T10:22:00Z
title: Simple broadcasting with Laravel and Livewire without Websockets
slug: simple-broadcasting-with-laravel-and-livewire-without-websockets
featured: false
draft: false
tags:
  - laravel
  - livewire
description: Sometimes you have a small application and from cost and effort perspective you don’t want to spend more money and time on implementing Websockets in your application to give the real-time feelings to your users. And somehow you also don’t want to use Third-Parties like Pusher or Ably :)
---

Sometimes you have a small application and from cost and effort perspective you don’t want to spend more money and time on implementing Websockets in your application to give the real-time feelings to your users. And somehow you also don’t want to use Third-Parties like Pusher or Ably :)

Here I am gonna show you how you can do it in an efficient way with using Laravel and Livewire.

# **The Idea**

The idea is to create an event when when dispatching, store it in the cache and pull the cache every 5 seconds via Livewire and dispatch the event to the other components of Livewire in the FrontEnd.

Lets do it! 🚀

# **Requirements**

You need to have a Laravel app with Livewire installed and using a cache driver other than `array` or `null` . For example `redis` or `database` or even `file` .

# **Create the Event**

So lets create the event in our Laravel application.

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Broadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $userId, public string $type, public array $data)
    {
    }
}
```

This event accepts a `userId`, `type` and `data`. The `type` will be the event type you want to dispatch and the `data` which is an array will contain whatever you want to broadcast.

The `userId` will define that who should receive the broadcast!

# **Create the Listener**

To handle the event we need a listener. This listener will be in charge of storing the event in the cache driver.

```php
<?php

namespace App\Listeners;

use App\Events\Broadcast;
use Illuminate\Support\Facades\Cache;

class BroadcastListener
{
    public function __construct()
    {
    }

    public function handle(Broadcast $event): void
    {
        Cache::put('broadcast_' . $event->userId, [
            'type' => $event->type,
            'data' => $event->data
        ], now()->addMinutes(5));
    }
}
```

This will create a cache record with the type and data of the broadcast event.

The cache key will look like this `broadcast_1` or `broadcast_2` and etc.

# **Register the Event**

Now you need to register the event and its listener in the `EventServiceProvider` :

```php
<?php

namespace App\Providers;

use App\Events\Broadcast;
use App\Listeners\BroadcastListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    ...

    protected $listen = [
        ...
        Broadcast::class => [
            BroadcastListener::class,
        ],
        ...
    ];

    ...
}
```

# **The event usage**

We want to send a broadcast message to a user.

```php
event(new Broadcast($user->id, 'message-received', [
  'message_id' => 1,
  'message_text' => 'some text'
]))
```

Now lets go to the Livewire part.

# **Livewire Component**

Use the bellow command to create a Livewire component.

```bash
php artisan make:livewire Broadcast
```

## **Component**

Go to your newly generated `App\Livewire\Broadcast` component and use the following code there.

```php
<?php

namespace App\Livewire;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Cache;
use Livewire\Component;

class Broadcast extends Component
{
    public function render(): View
    {
        $key = 'broadcast_' . auth()->user()->id;
        $event = Cache::get($key);
        if ($event) {
            Cache::forget($key);
            // $this->dispatch('broadcast', $event); // for livewire 3
            $this->emit('broadcast', $event); // for livewire 2
        }

        return view('livewire.broadcast');
    }
}
```

So every time that this component is being rendered we will get the cache key of that specific user and if there was any events stored there, We will `emit` it to the other Livewire components.

## **Blade View**

Now we need to update the blade file of the component

```xml
<div wire:poll.5s></div>
```

This will fetch the broadcasts every 5 seconds. Feel free to modify it.

## **Inject to your main layout**

Now you need to inject the broadcast component into your main layout or where ever you need to use it.

```xml
<livewire:broadcast />
```

# **Use the Broadcast**

So now that everything is ready we need to listen to `broadcast` any Livewire components that we need.

For example, we have a `Messages` component (Livewire) that shows the messages to the user.

Here how it will look like

```php
<?php

namespace App\Http\Livewire;

use Illuminate\Contracts\View\View;
use Livewire\Component;

class Messages extends Component
{
    public array $messages = [];

    public function getListeners(): array
    {
        return [
            'broadcast' => 'broadcast',
        ];
    }

    public function broadcast(array $event): void
    {
        if ($event['type'] == 'message-received') {
            $this->messages[] = $event['data'];
        }
    }

    ...
}
```

And done! Now if you fire a Broadcast event, the Messages component will catch it and show it in the Frontend!

If you enjoyed it, Follow me on [Twitter](https://twitter.com/saeed_vz). I write more often