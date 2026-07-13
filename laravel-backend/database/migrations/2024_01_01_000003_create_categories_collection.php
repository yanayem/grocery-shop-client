<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('categories', function (Blueprint $collection) {
            $collection->index('slug', null, null, ['unique' => true]);
            $collection->index('parent_id');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('categories');
    }
};
