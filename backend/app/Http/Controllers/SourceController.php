<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SourceRequest;
use App\Http\Resources\SourceResource;
use App\Services\Interfaces\SourceServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    private SourceServiceInterface $sourceService;

    /**
     * Service interface tanımlanıyor.
     *
     * @param  SourceServiceInterface $sourceService
     * @return void
    */
    public function __construct(SourceServiceInterface $sourceService)
    {
        $this->sourceService = $sourceService;
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
            SourceResource::collection($this->sourceService->all($request))
                ->response()
                ->getData(true)
        );
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  SourceRequest $request
     * @return JsonResponse
    */
    public function store(SourceRequest $request) : JsonResponse
    {
        return $this->createdApiResponse($this->sourceService->store($request->validated()));
    }

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
    */
    public function show(string $id) : JsonResponse
    {
        return $this->okApiResponse(new SourceResource($this->sourceService->show($id)));
    }

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param  SourceRequest $request
     * @param  string $id
     * @return JsonResponse
    */
    public function update(SourceRequest $request, string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->sourceService->update($request->validated(), $id));
    }

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
     */
    public function destroy(string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->sourceService->destroy($id));
    }
}
