<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('transactions', function (Blueprint $collection) {
            $collection->index('order_id');
            $collection->index('transaction_id');
        });

        Schema::connection($this->connection)->create('areas', function (Blueprint $collection) {
            $collection->index('name');
        });

        Schema::connection($this->connection)->create('contact_messages', function (Blueprint $collection) {
            $collection->index('email');
            $collection->index('status');
        });

        Schema::connection($this->connection)->create('carts', function (Blueprint $collection) {
            $collection->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('transactions');
        Schema::connection($this->connection)->dropIfExists('areas');
        Schema::connection($this->connection)->dropIfExists('contact_messages');
        Schema::connection($this->connection)->dropIfExists('carts');
    }
};
