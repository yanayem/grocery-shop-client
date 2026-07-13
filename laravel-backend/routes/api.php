<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working!']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::middleware('firebase.auth')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/myorders', [OrderController::class, 'myOrders']);

    // Admin Routes
    Route::get('/admin/orders', [OrderController::class, 'index']);
    Route::patch('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);

    Route::post('/admin/products', [ProductController::class, 'store']);
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);
    Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);
});
