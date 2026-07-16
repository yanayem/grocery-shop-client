<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RealDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories with Sub and Sub-Sub categories
        $categories = [
            [
                'name' => 'Vegetables',
                'color' => '#10b981',
                'sub' => [
                    ['name' => 'Leafy Greens', 'sub' => ['Spinach', 'Lettuce', 'Cabbage']],
                    ['name' => 'Root Vegetables', 'sub' => ['Carrots', 'Radish', 'Beetroot']],
                    ['name' => 'Potatoes & Onions', 'sub' => ['Red Potatoes', 'White Onions', 'Garlic']]
                ]
            ],
            [
                'name' => 'Fruits',
                'color' => '#f59e0b',
                'sub' => [
                    ['name' => 'Seasonal Fruits', 'sub' => ['Mango', 'Lychee', 'Watermelon']],
                    ['name' => 'Exotic Fruits', 'sub' => ['Dragon Fruit', 'Kiwi', 'Avocado']],
                    ['name' => 'Bananas & Apples', 'sub' => ['Sagor Kola', 'Green Apple', 'Red Fuji Apple']]
                ]
            ],
            [
                'name' => 'Dairy & Eggs',
                'color' => '#3b82f6',
                'sub' => [
                    ['name' => 'Milk', 'sub' => ['Liquid Milk', 'Powder Milk', 'Condensed Milk']],
                    ['name' => 'Butter & Cheese', 'sub' => ['Salted Butter', 'Cheddar Cheese', 'Mozzarella']],
                    ['name' => 'Eggs', 'sub' => ['Chicken Eggs', 'Duck Eggs', 'Quail Eggs']]
                ]
            ],
            [
                'name' => 'Meat & Fish',
                'color' => '#ef4444',
                'sub' => [
                    ['name' => 'Chicken', 'sub' => ['Whole Chicken', 'Chicken Breast', 'Drumsticks']],
                    ['name' => 'Beef', 'sub' => ['Bone-in Beef', 'Boneless Beef', 'Beef Keema']],
                    ['name' => 'Fresh Fish', 'sub' => ['Ilish', 'Rui', 'Pangas']]
                ]
            ],
        ];

        foreach ($categories as $catData) {
            $parent = Category::create([
                'name' => $catData['name'],
                'slug' => Str::slug($catData['name']),
                'color' => $catData['color'],
                'level' => 0
            ]);

            foreach ($catData['sub'] as $subData) {
                $subCategory = Category::create([
                    'name' => $subData['name'],
                    'slug' => Str::slug($subData['name']),
                    'parent_id' => $parent->_id,
                    'level' => 1
                ]);

                foreach ($subData['sub'] as $subSubName) {
                    Category::create([
                        'name' => $subSubName,
                        'slug' => Str::slug($subSubName),
                        'parent_id' => $subCategory->_id,
                        'level' => 2
                    ]);
                }
            }
        }

        // 2. Products
        $products = [
            // Vegetables
            ['name' => 'Fresh Roma Tomato', 'price' => 60, 'unit' => 'kg', 'category' => 'Vegetables', 'stock' => 100, 'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'],
            ['name' => 'Organic Spinach', 'price' => 20, 'unit' => 'bundle', 'category' => 'Vegetables', 'stock' => 50, 'image' => 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500'],
            ['name' => 'Red Onion', 'price' => 55, 'unit' => 'kg', 'category' => 'Vegetables', 'stock' => 200, 'image' => 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500'],

            // Fruits
            ['name' => 'Green Apple', 'price' => 240, 'unit' => 'kg', 'category' => 'Fruits', 'stock' => 80, 'image' => 'https://images.unsplash.com/photo-1610398010033-38a165ed2897?w=500'],
            ['name' => 'Ripe Banana (Sagor)', 'price' => 90, 'unit' => 'dozen', 'category' => 'Fruits', 'stock' => 40, 'image' => 'https://images.unsplash.com/photo-1571771894821-ad9958a35c47?w=500'],

            // Dairy
            ['name' => 'Farm Fresh Milk', 'price' => 85, 'unit' => 'litre', 'category' => 'Dairy & Eggs', 'stock' => 60, 'image' => 'https://images.unsplash.com/photo-1563636619-e9107da5a163?w=500'],
            ['name' => 'Brown Eggs', 'price' => 145, 'unit' => 'dozen', 'category' => 'Dairy & Eggs', 'stock' => 120, 'image' => 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500'],

            // Meat
            ['name' => 'Broiler Chicken', 'price' => 180, 'unit' => 'kg', 'category' => 'Meat & Fish', 'stock' => 30, 'image' => 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500'],

            // Grains
            ['name' => 'Miniket Rice (Premium)', 'price' => 72, 'unit' => 'kg', 'category' => 'Grains & Rice', 'stock' => 500, 'image' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'],
            ['name' => 'Masoor Dal (Large)', 'price' => 110, 'unit' => 'kg', 'category' => 'Grains & Rice', 'stock' => 150, 'image' => 'https://images.unsplash.com/photo-1547831441-2679f2913c7a?w=500'],
        ];

        foreach ($products as $prod) {
            Product::create([
                'name' => $prod['name'],
                'price' => $prod['price'],
                'unit' => $prod['unit'],
                'category' => $prod['category'],
                'stock' => $prod['stock'],
                'image' => $prod['image'],
                'description' => $prod['name'] . ' sourced directly from the best producers.'
            ]);
        }

        echo "Real data seeding completed!\n";
    }
}
