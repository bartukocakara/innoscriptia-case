<?php

namespace App\Models;

use App\Traits\UUID;
use App\Filters\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, UUID;

    protected $fillable = [
        'name',
    ];

    protected $hidden = ['pivot'];

    public function scopeFilterBy($query, $filters)
    {
        return  (new FilterBuilder($query, $filters, 'CategoryFilters'))->apply();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_categories', 'category_id', 'user_id');
    }
}
