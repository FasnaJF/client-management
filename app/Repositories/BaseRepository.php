<?php


namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

abstract class BaseRepository
{

    protected $model;
    /**
     * BaseRepository constructor.
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes)
    {
        $created =  $this->model->create($attributes);

        return $this->getById($created->id);
    }

    public function getById($id)
    {
        return $this->model->find($id);
    }

    public function getAll($sortBy = null)
    {

        if (isset($sortBy) && !empty($sortBy)) {

            return $this->model->all()->sortBy($sortBy);
        }

        return $this->model->all();
    }

    public function getCountAll()
    {

        return $this->model->count();
    }

    public function deleteById($id)
    {

        return $this->model->destroy($id);
    }

    public function updateById($id, array $params)
    {

        $this->model->find($id)->update($params);

        return $this->getById($id);
    }


    public function getModel(): Model
    {
        return $this->model;
    }


    public function with($relations)
    {
        return $this->model->with($relations);
    }
}
