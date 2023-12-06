<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Interfaces\ArticleRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

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

    /**
     * Kaynakları listelemek için kullanılır.
     *
     * @param Request $request
     * @return LengthAwarePaginator|Collection
    */
    public function all(Request $request) : LengthAwarePaginator|Collection
    {
        return $this->article->with('source', 'category', 'author')->filterBy($request->all());
    }

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param string $id
     * @return Model
    */
    public function find(string $id) : Model
    {
        return $this->model->findOrFail($id);
    }
}
