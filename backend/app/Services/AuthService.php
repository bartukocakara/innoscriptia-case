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
        # 1. Create player
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
        $user = auth()->user();
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
        return $this->authRepository->me($id);
    }

    /**
     * me
     *
     * @param  mixed $id
     * @return LengthAwarePaginator|Collection
     */
    public function teams(string $id, Request $request) : LengthAwarePaginator|Collection
    {
        return $this->authRepository->teams($id, $request);
    }

    /**
     * settingsList
     *
     * @param  mixed $id
     * @return Model|null
     */
    public function settingsList(string $id, Request $request) : Collection
    {
        return $this->playerSettingRepository->listByUserId($id, $request);
    }

    /**
     * me
     *
     * @param  mixed $id
     * @return Model|null
     */
    public function settingsUpdate(string $id, $params) : bool
    {
        $sportTypeId = $params['sport_type_id'];
        # player setting delete
        $this->playerSettingRepository->deleteByKey(['user_id' => $id, 'sport_type_id' => $sportTypeId]);
        # player setting insert
        $insertRows = array_map(function ($item) use($id, $sportTypeId) {
            return [
                "user_id" => $id,
                "player_setting_field_id" => $item["id"],
                "sport_type_id" => $sportTypeId,
                "value" => $item["value"]
            ];
        }, $params['player_setting_fields']);

        return $this->playerSettingRepository->insert($insertRows);
    }

    /**
     * me
     *
     * @param  mixed $id
     * @return Model|null
     */
    public function address(string $id) : Model|null
    {
        return $this->authRepository->address($id);
    }

    /**
     * settingsList
     *
     * @param  mixed $id
     * @return Model|null
     */
    public function skillsList(string $id, array $params) : Collection
    {
        $params = [
            'user_id' => auth()->user()->id,
            'sport_type_id' => $params['sport_type_id']
        ];
        return $this->playerSkillRepository->findByParams( $params);
    }
}
