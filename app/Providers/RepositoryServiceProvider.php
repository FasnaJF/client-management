<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository\UserRepository;
use App\Repositories\UserRepository\UserRepositoryInterface;
use App\Repositories\UserRepository\ClientRepository;
use App\Repositories\UserRepository\ClientRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    private $repositories = [
        UserRepositoryInterface::class => UserRepository::class,
        ClientRepositoryInterface::class => ClientRepository::class,
    ];
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->repositories as $contracts => $eloquentClass) {
            $this->app->bind(
                $contracts,
                $eloquentClass
            );
        }
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
