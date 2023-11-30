<?php

namespace App\Repositories;

use App\Models\Source;
use App\Repositories\Interfaces\SourceRepositoryInterface;

class SourceRepository extends BaseRepository implements SourceRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected Source $source;

    /**
     * @param Source $source
     * @return void
    */
    public function __construct(Source $source)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($source);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->source = $source;
    }
}
