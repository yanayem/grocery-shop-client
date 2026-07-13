<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'unit',
        'image',
        'category',
        'subCategory',
        'subSubCategory',
        'stock',
        'discount',
        'isAvailable',
    ];

    protected $casts = [
        'price' => 'float',
        'discount' => 'integer',
        'stock' => 'integer',
        'isAvailable' => 'boolean',
    ];
}
