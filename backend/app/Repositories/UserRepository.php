<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected User $user;

    /**
     * @param User $user
     * @return void
    */
    public function __construct(User $user)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($user);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->user = $user;
    }

    public function findByKey(array $params): User|null
    {
        return $this->user->where($params)->first();
    }
}
