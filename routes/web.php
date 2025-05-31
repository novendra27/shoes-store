<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/{id}', [DashboardController::class, 'detail'])->name('dashboard.detail');
});

Route::middleware(['auth', EnsureAdmin::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::resource(('admin/products'), ProductController::class);
    Route::resource(('admin/categories'), CategoryController::class);
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
