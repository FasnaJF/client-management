<?php

namespace App\Repositories\ClientRepository;

use App\Repositories\BaseRepository;
use App\Models\Client;

class ClientRepository extends BaseRepository implements ClientRepositoryInterface
{
    public function __construct(Client $client)
    {
        $this->model = $client;
    }

}
