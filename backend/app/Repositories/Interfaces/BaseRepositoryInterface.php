<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepositoryInterface
{
    /**
     * Kaynakları listelemek için kullanılır.
     *
     * @param Request $request
     * @return LengthAwarePaginator|Collection
    */
    public function all(Request $request) : LengthAwarePaginator|Collection;

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param array $data
     * @return Model
    */
    public function create(array $data) : Model;

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param string $id
     * @return Model
    */
    public function find(string $id) : Model;

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param array $data
     * @param string $id
     * @return bool
    */
    public function update(array $data, string $id) : bool;

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param string $id
     * @return bool
    */
    public function delete(string $id) : bool;
}
