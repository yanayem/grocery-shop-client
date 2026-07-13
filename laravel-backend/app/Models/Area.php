<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Area extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'areas';

    protected $fillable = [
        'name',
        'city',
        'delivery_charge',
        'is_active',
    ];

    protected $casts = [
        'delivery_charge' => 'float',
        'is_active' => 'boolean',
    ];
}
