<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories,slug',
            'color' => 'nullable|string',
            'parent_id' => 'nullable|string',
            'level' => 'integer',
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }
}
