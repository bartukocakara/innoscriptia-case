<?php

namespace App\Services;

use App\Repositories\Interfaces\ArticleRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class ArticleService extends CrudService
{
    protected ArticleRepositoryInterface $articleRepository;

    /**
     * @param ArticleRepositoryInterface $articleRepository
     * @return void
    */
    public function __construct(ArticleRepositoryInterface $articleRepository)
    {
        $this->articleRepository = $articleRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->articleRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }

    public function slug(string $slug): Model
    {
        $article =  $this->articleRepository->findBy('slug', $slug);
        return $article->with('author', 'category', 'source')->first();
    }
}
