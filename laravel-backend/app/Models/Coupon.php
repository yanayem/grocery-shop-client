<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Coupon extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'coupons';

    protected $fillable = [
        'code',
        'type', // fixed, percentage
        'value',
        'min_order_amount',
        'expiry_date',
        'is_active',
    ];

    protected $casts = [
        'value' => 'float',
        'min_order_amount' => 'float',
        'expiry_date' => 'datetime',
        'is_active' => 'boolean',
    ];
}
