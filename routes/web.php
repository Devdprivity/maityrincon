<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas del sitio web de la psicóloga
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('services');
})->name('services');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Rutas del blog público
Route::get('/blog', [App\Http\Controllers\PostController::class, 'blog'])->name('blog.index');
Route::get('/blog/{slug}', [App\Http\Controllers\PostController::class, 'showPost'])->name('blog.show');

// Rutas para comentarios y likes (públicas, no requieren autenticación)
Route::post('/blog/{post}/comments', [App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');
Route::post('/blog/{post}/like', [App\Http\Controllers\LikeController::class, 'toggle'])->name('likes.toggle');

// Rutas para editar/eliminar comentarios (requieren autenticación)
Route::middleware(['auth'])->group(function () {
    Route::put('/comments/{comment}', [App\Http\Controllers\CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment}', [App\Http\Controllers\CommentController::class, 'destroy'])->name('comments.destroy');
});

// Rutas de tests psicológicos
Route::get('/tests/hamilton-anxiety', [App\Http\Controllers\PsychologicalTestController::class, 'showHamilton'])->name('tests.hamilton');
Route::get('/tests/beck-anxiety', [App\Http\Controllers\PsychologicalTestController::class, 'showBeckAnxiety'])->name('tests.beck-anxiety');
Route::get('/tests/beck-depression', [App\Http\Controllers\PsychologicalTestController::class, 'showBeckDepression'])->name('tests.beck-depression');

// API para guardar tests
Route::post('/api/psychological-tests', [App\Http\Controllers\PsychologicalTestController::class, 'store'])->name('tests.store');

// Rutas de autenticación
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/blog.php';
