<?php

namespace App\Repositories\Interfaces;

use App\Models\Source;

interface SourceRepositoryInterface extends BaseRepositoryInterface
{
    public function findBy($key, $value) : Source|null;
}
