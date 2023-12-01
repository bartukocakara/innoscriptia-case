<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\Me\MeSettingsResource;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public AuthService $service;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * register
     *
     * @param  mixed $request
     * @return void
     */
    public function register(RegisterRequest $request)
    {
        list( $token, $user) = $this->service->register($request->validated());

        return $this->okApiResponse($this->respondWithToken($token, $user));
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request) : JsonResponse
    {
        $params = $request->validated();
        list($token, $user) = $this->service->login($params);

        if($token) {
            return $this->okApiResponse($this->respondWithToken($token, $user));
        }
        return $this->errorApiResponse(['error' =>
        ['message' => 'Unauthorized']], 401);

    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return $this->okApiResponse(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        $refreshToken = $request->bearerToken();
        if (!$refreshToken) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }

        $user = auth()->user();

        // Further logic here, e.g., revoke old token and generate a new access token

        return $this->createdApiResponse($this->respondWithToken($refreshToken, $user));
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, User $user)
    {
        $expirationTimeInMinutes = config('sanctum.expiration');

        $expirationDateTime = now()->addMinutes($expirationTimeInMinutes);
        return [
            'user' => UserResource::make($user),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expirationDateTime->toDateTimeString()
        ];
    }

        /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $service = $this->service->me(auth()->user()->id);
        return $this->okApiResponse(UserResource::make($service));
    }
}
