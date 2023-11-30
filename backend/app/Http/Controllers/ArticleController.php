<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Services\Interfaces\ArticleServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    private ArticleServiceInterface $articleService;

    /**
     * Service interface tanımlanıyor.
     *
     * @param  ArticleServiceInterface $articleService
     * @return void
    */
    public function __construct(ArticleServiceInterface $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Kaynakları listelemek için kullanılır.
     *
     * @param  Request  $request
     * @return JsonResponse
    */
    public function index(Request $request) : JsonResponse
    {
        return $this->okApiResponse(
            ArticleResource::collection($this->articleService->all($request))
                ->response()
                ->getData(true)
        );
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  ArticleRequest $request
     * @return JsonResponse
    */
    public function store(ArticleRequest $request) : JsonResponse
    {
        return $this->createdApiResponse($this->articleService->store($request->validated()));
    }

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
    */
    public function show(string $id) : JsonResponse
    {
        return $this->okApiResponse(new ArticleResource($this->articleService->show($id)));
    }

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param  ArticleRequest $request
     * @param  string $id
     * @return JsonResponse
    */
    public function update(ArticleRequest $request, string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->articleService->update($request->validated(), $id));
    }

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
     */
    public function destroy(string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->articleService->destroy($id));
    }
}
