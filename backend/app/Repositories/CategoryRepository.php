<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected Category $category;

    /**
     * @param Category $category
     * @return void
    */
    public function __construct(Category $category)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($category);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->category = $category;
    }
}
