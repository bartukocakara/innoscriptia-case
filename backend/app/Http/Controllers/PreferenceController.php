<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PreferenceRequest;
use App\Http\Resources\PreferenceResource;
use App\Services\Interfaces\PreferenceServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    private PreferenceServiceInterface $preferenceService;

    /**
     * Service interface tanımlanıyor.
     *
     * @param  PreferenceServiceInterface $preferenceService
     * @return void
    */
    public function __construct(PreferenceServiceInterface $preferenceService)
    {
        $this->preferenceService = $preferenceService;
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
            PreferenceResource::collection($this->preferenceService->all($request))
                ->response()
                ->getData(true)
        );
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  PreferenceRequest $request
     * @return JsonResponse
    */
    public function store(PreferenceRequest $request) : JsonResponse
    {
        return $this->createdApiResponse($this->preferenceService->store($request->validated()));
    }

    /**
     * Kaynağı görüntülemek için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
    */
    public function show(string $id) : JsonResponse
    {
        return $this->okApiResponse(new PreferenceResource($this->preferenceService->show($id)));
    }

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param  PreferenceRequest $request
     * @param  string $id
     * @return JsonResponse
    */
    public function update(PreferenceRequest $request, string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->preferenceService->update($request->validated(), $id));
    }

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
     */
    public function destroy(string $id) : JsonResponse
    {
        return $this->noContentApiResponse($this->preferenceService->destroy($id));
    }
}
