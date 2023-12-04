<?php

namespace App\Models;

use App\Traits\UUID;
use App\Filters\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
{
    use HasFactory, UUID;

    protected $fillable = [
        'name',
    ];

    protected $hidden = ['pivot'];

    public function scopeFilterBy($query, $filters)
    {
        return  (new FilterBuilder($query, $filters, 'AuthorFilters'))->apply();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_authors', 'author_id', 'user_id');
    }
}
