<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function findByKey(array $params): User|null;
}
