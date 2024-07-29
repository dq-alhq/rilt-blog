<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', Controllers\DashboardController::class)->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/articles/table', [Controllers\ArticleController::class, 'table'])->name('articles.table');
    Route::get('/projects/table', [Controllers\ProjectController::class, 'table'])->name('projects.table');

    Route::get('/projects/{project}/articles/create', [Controllers\ArticleController::class, 'create_for_project'])->name('projects.articles.create');
    Route::get('/projects/{project}/articles/{article}/edit', [Controllers\ArticleController::class, 'edit_for_project'])->name('projects.articles.edit');
    Route::get('/projects/{project}/articles/table', [Controllers\ProjectController::class, 'article_table'])->name('projects.articles.table');

    Route::put('/projects/{project}/publish', [Controllers\ProjectController::class, 'publish'])->name('projects.publish');
    Route::put('/articles/{article}/publish', [Controllers\ArticleController::class, 'publish'])->name('articles.publish');

    Route::resource('/articles', Controllers\ArticleController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/projects', Controllers\ProjectController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
});

Route::middleware(['auth', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    Route::get('/admin/users', [Controllers\AdminController::class, 'users'])->name('users.index');
    Route::delete('/admin/users/{user}', [Controllers\AdminController::class, 'delete_user'])->name('users.destroy');
    Route::put('/admin/users/{user}/setuser', [Controllers\AdminController::class, 'set_user'])->name('users.set-user');
    Route::put('/admin/users/{user}/setadmin', [Controllers\AdminController::class, 'set_admin'])->name('users.set-admin');
    Route::get('/admin/publish_requests', [Controllers\AdminController::class, 'publish_request'])->name('admin.publish_request');
    Route::put('/admin/articles/{article}/publish', [Controllers\AdminController::class, 'publish_article'])->name('articles.admin.publish');
    Route::put('/admin/projects/{project}/publish', [Controllers\AdminController::class, 'publish_project'])->name('projects.admin.publish');
    Route::put('/admin/articles/{article}/reject', [Controllers\AdminController::class, 'reject_article'])->name('articles.admin.reject');
    Route::put('/admin/projects/{project}/reject', [Controllers\AdminController::class, 'reject_project'])->name('projects.admin.reject');
    Route::get('/admin/projects', [Controllers\AdminController::class, 'articles'])->name('admin.articles');
    Route::get('/admin/articles', [Controllers\AdminController::class, 'projects'])->name('admin.projects');
    Route::resource('/tags', Controllers\TagController::class)->only(['edit', 'update', 'destroy']);
});

Route::resource('/tags', Controllers\TagController::class)->only(['index', 'create', 'store']);

Route::resource('/articles', Controllers\ArticleController::class)->only(['index', 'show']);
Route::resource('/projects', Controllers\ProjectController::class)->only(['index', 'show']);


require __DIR__ . '/auth.php';
