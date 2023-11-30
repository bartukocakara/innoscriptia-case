<?php

namespace App\Services\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface CrudServiceInterface
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
    public function store(array $data) : Model;

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param int $id
     * @return Model
    */
    public function show(string $id) : Model;

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param array $data
     * @param int $id
     * @return bool
    */
    public function update(array $data, string $id) : bool;

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param int $id
     * @return bool
    */
    public function destroy(string $id) : bool;
}
