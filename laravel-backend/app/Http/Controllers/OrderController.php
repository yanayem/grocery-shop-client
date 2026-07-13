<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->user_info) {
            return response()->json(['message' => 'Unauthorized. Please login to place an order.'], 401);
        }

        $request->validate([
            'orderItems' => 'required|array',
            'shippingAddress' => 'required|array',
            'paymentMethod' => 'required|string',
            'totalPrice' => 'required|numeric',
        ]);

        $order = Order::create([
            'user' => $request->user_info,
            'user_id' => $request->user_info['uid'] ?? null,
            'orderItems' => $request->orderItems,
            'shippingAddress' => $request->shippingAddress,
            'paymentMethod' => $request->paymentMethod,
            'itemsPrice' => $request->itemsPrice,
            'shippingPrice' => $request->shippingPrice,
            'totalPrice' => $request->totalPrice,
        ]);

        return response()->json($order, 201);
    }

    public function myOrders(Request $request)
    {
        if (!$request->user_email) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $orders = Order::where('user.email', $request->user_email)->get();
        return response()->json($orders);
    }
}
