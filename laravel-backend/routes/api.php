<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working!']);
});

Route::middleware('firebase.auth')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/myorders', [OrderController::class, 'myOrders']);
});
