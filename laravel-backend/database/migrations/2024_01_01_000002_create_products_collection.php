<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('products', function (Blueprint $collection) {
            $collection->index('category');
            $collection->index('subCategory');
            $collection->index('subSubCategory');
            $collection->index('name');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('products');
    }
};
