<?php

namespace App\Services;

use App\Repositories\UserRepository\UserRepositoryInterface;

class UserService
{
    private $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

      public function createUser($data)
    {
        return $this->userRepo->create($data);
    }

    public function getUserById($id){

        return $this->userRepo->getById($id);
    }

    public function getUserByEmail($email){

        return $this->userRepo->getByEmail($email);
    }
    
    public function updateUserById($id, $collection = []){

        return $this->userRepo->updateById($id,$collection);
    }
}
