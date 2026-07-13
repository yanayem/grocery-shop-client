<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Cart extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'carts';

    protected $fillable = [
        'user_id',
        'items', // Array of items with product_id, quantity, price
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
