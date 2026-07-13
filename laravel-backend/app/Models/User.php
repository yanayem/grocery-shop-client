<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'firebase_uid',
        'phone',
        'address',
        'role', // admin, customer
    ];

    protected $hidden = [
        'remember_token',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id', 'firebase_uid');
    }
}
