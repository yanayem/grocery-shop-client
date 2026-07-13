<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('orders', function (Blueprint $collection) {
            $collection->index('user_id');
            $collection->index('user.email');
            $collection->index('status');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('orders');
    }
};
