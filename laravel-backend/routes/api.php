<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

// Public Routes - Anyone can access these
Route::get('/products', [ProductController::class, 'index']); // Get all products
Route::get('/products/{id}', [ProductController::class, 'show']); // Get one product detail
Route::get('/categories', [CategoryController::class, 'index']); // Get all categories

// Protected Routes - User must be logged in (Firebase Auth)
Route::middleware('firebase.auth')->group(function () {
    Route::post('/users/sync', [UserController::class, 'syncUser']); // Save/Update user data
    Route::get('/users/profile', [UserController::class, 'getProfile']); // Get user info

    Route::post('/orders', [OrderController::class, 'store']); // Place a new order
    Route::get('/orders/myorders', [OrderController::class, 'myOrders']); // Get list of my orders

    // Admin Routes - Only Admins can access these
    Route::middleware(\App\Http\Middleware\CheckAdmin::class)->prefix('admin')->group(function () {
        // Product Management
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store']); // Add new product
        Route::put('/products/{id}', [ProductController::class, 'update']); // Edit product
        Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product
        Route::post('/upload', [ProductController::class, 'uploadImage']); // Upload product image

        // Category Management
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']); // Add new category
        Route::put('/categories/{id}', [CategoryController::class, 'update']); // Edit category
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Delete category

        // Order Management
        Route::get('/orders', [OrderController::class, 'index']); // See all customer orders
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']); // Change order status (e.g. Pending to Delivered)

        // Clear Demo Data - USE WITH CAUTION
        Route::post('/clear-demo-data', function () {
            \App\Models\Product::truncate();
            \App\Models\Category::truncate();
            \App\Models\Order::truncate();
            return response()->json(['message' => 'All demo data has been deleted']);
        });
    });
});
