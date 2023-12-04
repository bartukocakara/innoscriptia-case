<?php

namespace App\Filters\CategoryFilters;

use App\Filters\FilterInterface;

class UserId implements FilterInterface
{
    protected $query;

    public function __construct($query)
    {
        $this->query = $query;
    }

    /**
     * Uygulama methodu.
     *
     * @param string $value
     * @return void
    */
    public function handle($value): void
    {
        $this->query->whereHas('users', function ($query) use ($value) {
            $query->where('user_id', $value);
        });
    }
}
