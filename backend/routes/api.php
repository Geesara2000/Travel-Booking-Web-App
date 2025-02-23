<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// User Authentication
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Admin Authentication
Route::post('/admin/login', [AdminController::class, 'login']);

// Protect routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/admin/logout', [AdminController::class, 'logout']);
});


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
