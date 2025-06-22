<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\InvoiceController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard routes
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/{id}', [DashboardController::class, 'detail'])->name('dashboard.detail');

    // Cart routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::get('/cart/list', [CartController::class, 'getCart'])->name('cart.list');
    Route::post('/cart/{id}/cancel', [CartController::class, 'cancel'])->name('cart.cancel');

    // Invoice routes
    Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice.index');
    Route::post('/invoice', [InvoiceController::class, 'store'])->name('invoice.store');
    Route::get('/invoice/{id}', [InvoiceController::class, 'show'])->name('invoice.show');
});

Route::middleware(['auth', EnsureAdmin::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::resource(('admin/products'), ProductController::class);
    Route::resource(('admin/categories'), CategoryController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
