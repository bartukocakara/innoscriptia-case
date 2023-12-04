<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SourceRequest;
use App\Http\Resources\SourceResource;
use App\Services\SourceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    private SourceService $sourceService;

    /**
     * Service interface tanımlanıyor.
     *
     * @param  SourceService $sourceService
     * @return void
    */
    public function __construct(SourceService $sourceService)
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
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
    */
    public function show(string $id) : JsonResponse
    {
        return $this->okApiResponse(new SourceResource($this->sourceService->show($id)));
    }
}
