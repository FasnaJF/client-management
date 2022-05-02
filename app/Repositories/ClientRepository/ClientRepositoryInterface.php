<?php


namespace App\Repositories\ClientRepository;


use App\Repositories\BaseRepositoryInterface;

interface ClientRepositoryInterface extends BaseRepositoryInterface
{
    public function store($id, $data);
}
