<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::connection($this->connection)->create('reviews', function (Blueprint $collection) {
            $collection->index('product_id');
            $collection->index('user_id');
        });

        Schema::connection($this->connection)->create('wishlists', function (Blueprint $collection) {
            $collection->index('user_id');
            $collection->index('product_id');
        });

        Schema::connection($this->connection)->create('coupons', function (Blueprint $collection) {
            $collection->index('code', null, null, ['unique' => true]);
        });

        Schema::connection($this->connection)->create('faqs', function (Blueprint $collection) {
            $collection->index('order');
        });

        Schema::connection($this->connection)->create('settings', function (Blueprint $collection) {
            $collection->index('key', null, null, ['unique' => true]);
        });

        Schema::connection($this->connection)->create('banners', function (Blueprint $collection) {
            $collection->index('order');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('reviews');
        Schema::connection($this->connection)->dropIfExists('wishlists');
        Schema::connection($this->connection)->dropIfExists('coupons');
        Schema::connection($this->connection)->dropIfExists('faqs');
        Schema::connection($this->connection)->dropIfExists('settings');
        Schema::connection($this->connection)->dropIfExists('banners');
    }
};
