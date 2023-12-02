<?php

namespace App\Services;

use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryService extends CrudService
{
    protected CategoryRepositoryInterface $categoryRepository;

    /**
     * @param CategoryRepositoryInterface $categoryRepository
     * @return void
    */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->categoryRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }
}
