<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Transaction extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'transactions';

    protected $fillable = [
        'order_id',
        'user_id',
        'payment_method',
        'transaction_id',
        'amount',
        'status', // pending, completed, failed, refunded
        'payment_details', // JSON for gateway response
    ];

    protected $casts = [
        'amount' => 'float',
        'payment_details' => 'array',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
