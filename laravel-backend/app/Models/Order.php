<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Order extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'orders';

    protected $fillable = [
        'user',
        'user_id',
        'orderItems',
        'shippingAddress',
        'paymentMethod',
        'itemsPrice',
        'shippingPrice',
        'totalPrice',
        'isPaid',
        'paidAt',
        'isDelivered',
        'deliveredAt',
    ];

    protected $casts = [
        'paidAt' => 'datetime',
        'deliveredAt' => 'datetime',
        'isPaid' => 'boolean',
        'isDelivered' => 'boolean',
    ];
}
