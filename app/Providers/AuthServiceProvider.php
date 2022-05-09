<?php

namespace App\Providers;

use App\Models\Client;
use App\Policies\ClientPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Client::class => ClientPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
}
