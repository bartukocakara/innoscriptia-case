<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PreferenceAuthorRequest;
use App\Http\Requests\PreferenceCategoryRequest;
use App\Http\Requests\PreferenceRequest;
use App\Http\Requests\PreferenceSourceRequest;
use App\Services\PreferenceService;
use Illuminate\Http\JsonResponse;

class PreferenceController extends Controller
{
    private PreferenceService $preferenceService;

    /**
     * Service  tanımlanıyor.
     *
     * @param  PreferenceService $preferenceService
     * @return void
    */
    public function __construct(PreferenceService $preferenceService)
    {
        $this->preferenceService = $preferenceService;
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  PreferenceRequest $request
     * @return JsonResponse
    */
    public function store(PreferenceRequest $request, string $userId) : JsonResponse
    {
        return $this->createdApiResponse($this->preferenceService->create($userId, $request->validated()));
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  PreferenceCategoryRequest $request
     * @return JsonResponse
    */
    public function categoriesAttach(PreferenceCategoryRequest $request, string $userId) : JsonResponse
    {
        return $this->createdApiResponse($this->preferenceService->categoriesAttach($userId, $request->validated()));
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  PreferenceAuthorRequest $request
     * @return JsonResponse
    */
    public function authorsAttach(PreferenceAuthorRequest $request, string $userId) : JsonResponse
    {
        return $this->createdApiResponse($this->preferenceService->authorsAttach($userId, $request->validated()));
    }

    /**
     * Yeni bir kaynağı kaydetmek için kullanılır.
     *
     * @param  PreferenceSourceRequest $request
     * @return JsonResponse
    */
    public function sourcesAttach(PreferenceSourceRequest $request, string $userId) : JsonResponse
    {
        return $this->createdApiResponse($this->preferenceService->sourcesAttach($userId, $request->validated()));
    }

    /**
     * Kaynağı güncellemek için kullanılır.
     *
     * @param  PreferenceRequest $request
     * @param  string $userId
     * @return JsonResponse
    */
    public function update(PreferenceRequest $request, string $userId) : JsonResponse
    {
        return $this->noContentApiResponse($this->preferenceService->update($request->validated(), $userId));
    }

    /**
     * Kaynağı kaldırmak için kullanılır.
     *
     * @param  string $id
     * @return JsonResponse
     */
    public function destroy(string $userId) : JsonResponse
    {
        return $this->noContentApiResponse($this->preferenceService->destroy($userId));
    }
}
