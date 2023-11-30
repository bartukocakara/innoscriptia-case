<?php

namespace App\Services;

use App\Repositories\Interfaces\SourceRepositoryInterface;
use App\Services\Interfaces\SourceServiceInterface;

class SourceService extends CrudService implements SourceServiceInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected SourceRepositoryInterface $sourceRepository;

    /**
     * @param SourceRepositoryInterface $sourceRepository
     * @return void
    */
    public function __construct(SourceRepositoryInterface $sourceRepository)
    {
        $this->sourceRepository = $sourceRepository;
        // Extend ettiğimiz CrudService'in __construct methoduna repositoryi gönderiyoruz.
        parent::__construct($this->sourceRepository); // Crud işlemleri yoksa kaldırınız.
        // Repository bu serviste kullanılmak üzere değişkene tanımlanıyor.
    }
}
