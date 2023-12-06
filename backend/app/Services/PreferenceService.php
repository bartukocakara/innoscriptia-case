<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class PreferenceService extends CrudService
{
    protected UserRepositoryInterface $userRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     * @return void
    */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->userRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }

    public function create(string $userId, array $params): bool
    {
        $user = $this->userRepository->find($userId);

        $user->sources()->sync($params['source_ids']);
        $user->categories()->sync($params['category_ids']);
        $user->authors()->sync($params['author_ids']);

        return true;
    }

    public function delete(array $params, string $userId): bool
    {
        $user = $this->userRepository->find($userId);

        $user->sources()->detach($params['source_ids'] ?? []);
        $user->categories()->detach($params['category_ids'] ?? []);
        $user->authors()->detach($params['author_ids'] ?? []);

        return true;
    }

    public function categoriesAttach(string $userId, array $params): bool
    {
        $user = $this->userRepository->findWithRelation($userId, ['categories']);

        $user->categories()->sync($params['category_ids']);

        return true;
    }

    public function sourcesAttach(string $userId, array $params): bool
    {
        $user = $this->userRepository->findWithRelation($userId, ['sources']);

        $user->sources()->sync($params['source_ids']);

        return true;
    }

    public function authorsAttach(string $userId, array $params): bool
    {
        $user = $this->userRepository->findWithRelation($userId, ['authors']);

        $user->authors()->sync($params['author_ids']);

        return true;
    }
}
