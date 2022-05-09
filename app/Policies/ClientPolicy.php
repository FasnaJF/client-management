<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\Admin;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
{
    use HandlesAuthorization;

    public function view(Admin $user, Client $client)
    {
        return $user->id === $client->admin_id;
    }

    public function create()
    {
        return true;
    }

    public function update(Admin $user, Client $client)
    {
        return $user->id === $client->admin_id;
    }

    public function delete(Admin $user, Client $client)
    {
        return $user->id === $client->admin_id;
    }

    public function restore(Admin $user, Client $client)
    {
        return $user->id === $client->admin_id;
    }

    public function forceDelete(Admin $user, Client $client)
    {
        return $user->id === $client->admin_id;
    }
}
