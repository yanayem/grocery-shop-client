<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('users', function (Blueprint $collection) {
            $collection->index('email', null, null, ['unique' => true]);
            $collection->index('firebase_uid', null, null, ['unique' => true]);
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('users');
    }
};
