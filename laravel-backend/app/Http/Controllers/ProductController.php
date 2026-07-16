<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products or filter by category
    public function index(Request $request)
    {
        $query = Product::query();

        // If a category name is sent, only show products from that category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->get());
    }

    // Save a new product to the database
    public function store(Request $request)
    {
        $data = $request->all();

        // Handle image upload if a file is sent
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/products'), $filename);
            $data['image'] = url('uploads/products/' . $filename);
        }

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    // Update product information
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->all();

        // Handle image upload if a new file is sent
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/products'), $filename);
            $data['image'] = url('uploads/products/' . $filename);
        }

        $product->update($data);
        return response()->json($product);
    }

    // Delete a product
    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product removed successfully']);
    }
}
