<?php

namespace App\Repositories;

use App\Models\Author;
use App\Repositories\Interfaces\AuthorRepositoryInterface;

class AuthorRepository extends BaseRepository implements AuthorRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected Author $author;

    /**
     * @param Author $author
     * @return void
    */
    public function __construct(Author $author)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($author);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->author = $author;
    }
}
