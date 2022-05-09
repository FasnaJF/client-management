<?php

namespace App\Providers;

use App\Repositories\ClientRepository\ClientRepositoryInterface;
use App\Repositories\ClientRepository\ClientRepository;
use App\Repositories\UserRepository\UserRepository;
use App\Repositories\UserRepository\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    private $repositories = [
        UserRepositoryInterface::class => UserRepository::class,
        ClientRepositoryInterface::class => ClientRepository::class,
    ];
   
    public function register()
    {
        foreach ($this->repositories as $contracts => $eloquentClass) {
            $this->app->bind(
                $contracts,
                $eloquentClass
            );
        }
    }

    public function boot()
    {
        //
    }
}
