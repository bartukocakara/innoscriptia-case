<?php

namespace App\Models;

use App\Traits\UUID;
use App\Filters\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory, UUID;

    protected $fillable = [
        'source_id',
        'author_id',
        'category_id',
        'title',
        'slug',
        'description',
        'url',
        'image',
        'published_at',
    ];

    public function scopeFilterBy($query, $filters)
    {
        return  (new FilterBuilder($query, $filters, 'ArticleFilters'))->apply();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
