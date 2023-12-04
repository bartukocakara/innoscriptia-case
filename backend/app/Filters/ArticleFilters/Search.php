<?php

namespace App\Filters\ArticleFilters;

use App\Filters\FilterInterface;

class Search implements FilterInterface
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
        $this->query->where(function ($query) use ($value) {
            $query->where('title', 'ilike', '%' . $value . '%')
                  ->orWhere('description', 'ilike', '%' . $value . '%');
        });
    }
}
