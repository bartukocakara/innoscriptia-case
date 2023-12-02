<?php

namespace App\Services;

use App\Repositories\Interfaces\AuthorRepositoryInterface;

class AuthorService extends CrudService
{
    protected AuthorRepositoryInterface $authorRepository;

    /**
     * @param AuthorRepositoryInterface $authorRepository
     * @return void
    */
    public function __construct(AuthorRepositoryInterface $authorRepository)
    {
        $this->authorRepository = $authorRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->authorRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }
}
