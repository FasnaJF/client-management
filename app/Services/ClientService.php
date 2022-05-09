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

    public function getAllClientsByUser($adminId)
    {
        return $this->clientRepo->getAllClientsByUserId($adminId);
    }

    public function storeClient($id, $data)
    {
        return $this->clientRepo->store($id, $data);
    }

    public function getClientById($id){

        return $this->clientRepo->getById($id);
    }

    public function deleteClient($id){

        return $this->clientRepo->deleteById($id);
    }
}
