<?php

namespace App\Repositories;

use App\Models\Preference;
use App\Repositories\Interfaces\PreferenceRepositoryInterface;

class PreferenceRepository extends BaseRepository implements PreferenceRepositoryInterface
{
    // Crud işlemleri gerekmiyorsa extends'i kaldırınız. //

    protected Preference $preference;

    /**
     * @param Preference $preference
     * @return void
    */
    public function __construct(Preference $preference)
    {
        // Ortak crud işlemleri için BaseRepository construct'ına model gönderiliyor.
        parent::__construct($preference);
        // Model bu repoda kullanılmak üzere değişkene tanımlanıyor.
        $this->preference = $preference;
    }
}
