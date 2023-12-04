<?php

namespace App\Filters\ArticleFilters;

use App\Filters\FilterInterface;

class SourceIds implements FilterInterface
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
        $this->query->whereIn('source_id', $value);
    }
}
