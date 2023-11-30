<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Interfaces\ArticleRepositoryInterface;

class ArticleRepository extends BaseRepository implements ArticleRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected Article $article;

    /**
     * @param Article $article
     * @return void
    */
    public function __construct(Article $article)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($article);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->article = $article;
    }
}
