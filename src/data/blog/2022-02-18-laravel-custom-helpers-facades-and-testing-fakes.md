---
author: Saeed Vaziry
pubDatetime: 2022-02-18T12:10:00Z
title: Laravel Custom Helpers, Facades, and Testing Fakes
slug: laravel-custom-helpers-facades-and-testing-fakes
featured: false
draft: false
tags:
  - laravel
  - php
description: Let’s consider that we want to create a custom helper named SSH. This helper is going to connect to a remote server via ssh and execute some commands.
---

Let’s consider that we want to create a custom helper named SSH. This helper is going to connect to a remote server via ssh and execute some commands.

### Commands

Since we might have many commands, I would create an interface first.

```php
// app/Commands/Command.php

namespace App\SSHCommands;

use App\Contracts\SSHCommand;

interface Command
{
    public function content();
}
```

And then an example command.

```php
// app/Commands/DirectoryListCommand.php

namespace App\SSHCommands;

use App\Contracts\SSHCommand;

class DirectoryListCommand implements Command
{
    public function content()
    {
        return "ls -la";
    }
}
```

### Helper

Alright. Now we want to create a Helper to use the commands. I rather create it in `app/Helpers` path.

```php
// app/Helpers/SSH.php

namespace App\Helpers;

use App\SSHCommands\Command;

class SSH
{
    /**
     * @param Command $command
     * @return void
     */
    public function exec($command)
    {
        //
    }
}
```

### Facade

To use this Helper in our application we’ll use Laravel’s Facades.

```php
// app/Facades/SSH.php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class SSH
 *
 * @package App\Facades
 *
 * @method static exec($command)
 */
class SSH extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'ssh';
    }
}
```

Now, Let’s register our Facade in the `AppServiceProvider.php`

```php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind('ssh', function () {
            return new \App\Helpers\SSH;
        });
    }
}
```

Perfect! We can use the helper in the application by simply calling the facade.

```php
\App\Facades\SSH::exec(new DirectoryListCommand());
```

To make it easy to use, You can register the SSH Facade in your `config/app.php` under the `aliases`

```php
'aliases' => [
    ...
    'View' => Illuminate\Support\Facades\View::class,
    ...
],
```

Then you can use it like bellow

```php
SSH::exec(new DirectoryListCommand());
```

### Testing

When it comes to testing, The problem is you can’t really test the SSH because it is connecting to a remote server, and in the testing environment you don’t have a remote server! So what we can do?!

The answer is faking! We must fake the `exec` command.

Let’s create a fake SSH class. I would like to create in `app/Support/Testing` path.

```php
namespace App\Support\Testing;

use PHPUnit\Framework\Assert as PHPUnit;

class SSHFake
{
    /**
     * @var \App\SSHCommands\Command
     */
    protected $executedCommand;

    /**
     * @param \App\SSHCommands\Command $command
     * @return void
     */
    public function exec($command)
    {
        $this->executedCommand = get_class($command);
    }

    /**
     * @param \App\SSHCommands\Command $command
     * @return void
     */
    public function assertExecuted($command)
    {
        if (!$this->executedCommand) {
            PHPUnit::fail("No command executed");
        }

        PHPUnit::assertTrue(
            true,
            $this->executedCommand === $command
        );
    }
}
```

Let me explain the idea. I just simulated the SSH helper here with a small difference which means that I faked it. instead of executing the command on the remote server, I am adding the command’s class name to the `executedCommand` property. And then, in the `assertExecuted` method, I am making sure that the command is executed (stored in the `executedCommand` property) 😊

The final step is to make the Facade recognize the faked Helper.

Let’s back to the SSH Facade and make a small change.

```php
// app/Facades/SSH.php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;
use App\Support\Testing\SSHFake;

/**
 * Class SSH
 *
 * @package App\Facades
 *
 * @method static exec($command)
 * @method static assertExecuted($command)
 */
class SSH extends Facade
{
    /**
     * Replace the bound instance with a fake.
     *
     * @return \App\Support\Testing\SSHFake
     */
    public static function fake()
    {
        static::swap($fake = new SSHFake());

        return $fake;
    }

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'ssh';
    }
}
```

I’ve created a static method named `fake` which returns an instance of the faked one! I’ve used the swap method of the Facade facade 🙂

And now we can test the Helper very easily. Here is an example test:

```php
namespace Tests\Feature;

use App\Facades\SSH;
use App\SSHCommands\DirectoryListCommand;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_ssh_command()
    {
        SSH::fake();
        
        SSH::exec(new DirectoryListCommand());
        
        SSH::assertExecuted(DirectoryListCommand::class);
    }
}
```

That’s it! 🎉

Thanks for reading this post. Hope you enjoyed it!

I’ll be happy to read your comments about this.