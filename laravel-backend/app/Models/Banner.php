<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Banner extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'banners';

    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'link_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];
}
