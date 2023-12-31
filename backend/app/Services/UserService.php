<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;

class UserService extends CrudService
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected UserRepositoryInterface $userRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     * @return void
    */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->userRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }
}
