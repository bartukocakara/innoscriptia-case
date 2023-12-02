<?php

namespace App\Services\Api;

use Illuminate\Support\Str;
use App\Repositories\AuthorRepository;
use App\Repositories\ArticleRepository;
use App\Repositories\CategoryRepository;

/**
 * Class BaseRepository
 */
class BaseApiService
{
    protected ArticleRepository $articleRepository;

    protected CategoryRepository $categoryRepository;

    protected AuthorRepository $authorRepository;

    public function __construct(
        CategoryRepository $categoryRepository,
        AuthorRepository $authorRepository,
        ArticleRepository $articleRepository,
    ) {
        $this->categoryRepository = $categoryRepository;
        $this->authorRepository = $authorRepository;
        $this->articleRepository = $articleRepository;
    }

    public function defaultDescription(): string
    {
        return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
    }

    public function defaultImage(): string
    {
        return 'https://dummyimage.com/700x350/dee2e6/6c757d.jpg';
    }

    public function defaultTitle(): string
    {
        return 'Unknown title:'.Str::random(6);
    }
}
