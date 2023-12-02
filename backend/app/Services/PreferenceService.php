<?php

namespace App\Services;

use App\Repositories\Interfaces\PreferenceRepositoryInterface;
use App\Services\Interfaces\PreferenceServiceInterface;

class PreferenceService extends CrudService implements PreferenceServiceInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected PreferenceRepositoryInterface $preferenceRepository;

    /**
     * @param PreferenceRepositoryInterface $preferenceRepository
     * @return void
    */
    public function __construct(PreferenceRepositoryInterface $preferenceRepository)
    {
        $this->preferenceRepository = $preferenceRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->preferenceRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }
}
