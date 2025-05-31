<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        $categories = Category::all();
        return Inertia::render('dashboard', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function detail(string $id){
        $product = Product::with('category')->findOrFail($id);
        return Inertia::render('detail-product', [
            'product' => $product,
        ]);
    }
}
