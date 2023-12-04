<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
{
    use HasFactory, UUID;

    protected $fillable = [
        'name',
    ];

    protected $hidden = ['pivot'];

}
