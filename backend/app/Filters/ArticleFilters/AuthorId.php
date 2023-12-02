<?php

namespace App\Filters\ArticleFilters;

use App\Filters\FilterInterface;

class AuthorId implements FilterInterface
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
        $this->query->where('authorId', $value);
    }
}
