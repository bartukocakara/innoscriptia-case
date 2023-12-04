<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class BaseRepository
{
    protected Model $model;

    /**
     * @param Model $model
     * @return void
    */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Kaynakları listelemek için kullanılır.
     *
     * @param Request $request
     * @return LengthAwarePaginator|Collection
    */
    public function all(Request $request) : LengthAwarePaginator|Collection
    {
        return $this->model->filterBy($request->all());
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param array $data
     * @return Model
    */
    public function create(array $data) : Model
    {
        return $this->model->create($data);
    }

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param string $id
     * @return Model
    */
    public function find(string $id) : Model
    {
        return $this->model->findOrFail($id);
    }

    public function firstOrCreate($key, $data)
    {
        return $this->model->firstOrCreate([$key => $data[$key]], $data);
    }

    /**
     * Kaynağı anahtara göre bulmak için kullanılır.
     *
     * @param string $key
     * @param string $value
     * @return Model|null
    */
    public function findBy($key, $value) : Model|null
    {
        return $this->model->where($key, $value)->first();
    }

    public function findWithRelation(string $id, array $relations = []) : Model|null
    {
        return $this->model->where('id', $id)->with($relations)->first();
    }

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param array $data
     * @param string $id
     * @return bool
    */
    public function update(array $data, string $id) : bool
    {
        return $this->model->find($id)->update($data);
    }

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param string $id
     * @return bool
    */
    public function delete(string $id) : bool
    {
        return $this->model->find($id)->delete();
    }
}
