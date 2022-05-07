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

    public function store($id, $data)
    {
        if ($id) {
            return $this->model->find($id)->update($data);
        }
        return $this->model->create($data);
    }

    public function getAllClientsByUserId($id){
        return $this->model->where('admin_id',$id)->get();
    }

}
