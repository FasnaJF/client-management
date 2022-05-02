<?php


namespace App\Services;

use App\Repositories\ClientRepository\ClientRepositoryInterface;

class ClientService
{

    private $clientRepo;

    public function __construct(ClientRepositoryInterface $clientRepo)
    {
        $this->clientRepo = $clientRepo;
    }

    public function getAllClients()
    {
        return $this->clientRepo->getAll();
    }

    public function createClient($data)
    {
        return $this->clientRepo->create($data);
    }

    public function getClientById($id){

        return $this->clientRepo->getById($id);
    }

    public function updateClient($id, $collection = []){

        return $this->clientRepo->updateById($id,$collection);
    }

    public function deleteClient($id){

        return $this->clientRepo->deleteById($id);
    }
}
