<?php

namespace App\Repositories\UserRepository;

use App\Repositories\BaseRepository;
use App\Models\Admin;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(Admin $admin)
    {
        $this->model = $admin;
    }

    public function getByEmail($email)
    {
        return  $this->model->where('email', $email)->first();
    }
}
