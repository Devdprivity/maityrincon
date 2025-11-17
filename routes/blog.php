<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Admin Blog Routes
|--------------------------------------------------------------------------
|
| Rutas para la administración del blog
|
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Rutas del CRUD de posts
    Route::resource('posts', PostController::class);

    // Rutas adicionales para posts
    Route::patch('posts/{post}/toggle-status', [PostController::class, 'toggleStatus'])->name('posts.toggle-status');
    Route::patch('posts/{post}/toggle-featured', [PostController::class, 'toggleFeatured'])->name('posts.toggle-featured');
    Route::delete('posts/{post}/delete-image', [PostController::class, 'deleteImage'])->name('posts.delete-image');

    // Rutas del CRUD de comentarios
    Route::get('comments', [App\Http\Controllers\CommentController::class, 'index'])->name('comments.index');
    Route::get('comments/{comment}', [App\Http\Controllers\CommentController::class, 'edit'])->name('comments.edit');
    Route::put('comments/{comment}', [App\Http\Controllers\CommentController::class, 'updateAdmin'])->name('comments.update');
    Route::patch('comments/{comment}/toggle-approval', [App\Http\Controllers\CommentController::class, 'toggleApproval'])->name('comments.toggle-approval');
    Route::delete('comments/{comment}', [App\Http\Controllers\CommentController::class, 'destroyAdmin'])->name('comments.destroy');
});
