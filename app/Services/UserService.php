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

    public function getAllUsers()
    {
        return $this->userRepo->getAll();
    }

    public function createUser($data)
    {
        return $this->userRepo->create($data);
    }

    public function getUserById($id){

        return $this->userRepo->getById($id);
    }

    public function updateUser($id, $collection = []){

        return $this->userRepo->updateById($id,$collection);
    }

    public function deleteUser($id){

        return $this->userRepo->deleteById($id);
    }
}
