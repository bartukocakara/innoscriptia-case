<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Interfaces\UserRepositoryInterface;

class AuthService extends CrudService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    /**
     * register
     *
     * @param  array $params
     * @return array
     */
    public function register(array $params) : array
    {
        # 1. Create User
        $user = $this->userRepository->create($params);

        auth()->login($user);

        # 3. Return user with roles
        return [ auth()->user()->createToken('userToken')->plainTextToken, $user->load('roles')];
    }

    /**
     * login
     *
     * @param  array $params
     * @return array
     */
    public function login(array $params): array
    {
        $user = $this->userRepository->findByKey(['email' => $params['email']]);
        auth()->login($user);
        $token = $user?->createToken('userToken')->plainTextToken;
        if (!$token) {
            return [false, null];
        }
        $user = $user->with('categories', 'authors', 'sources')->first();
        return [$token, $user];
    }

    /**
     * me
     *
     * @param  mixed $id
     * @return Model|null
     */
    public function me(string $id) : Model|null
    {
        return $this->userRepository->find($id);
    }
}
