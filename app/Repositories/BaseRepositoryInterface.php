<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function create(array $params);
    public function getById($id);
    public function getAll($sortBy = null);
    public function deleteById($id);
    public function updateById($id, array $params);
    public function getModel(): Model;
}
