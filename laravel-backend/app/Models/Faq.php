<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Faq extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'faqs';

    protected $fillable = [
        'question',
        'answer',
        'order',
        'is_active',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];
}
