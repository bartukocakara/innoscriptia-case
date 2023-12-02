<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::view('/docs', 'docs');

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    $router->controller(AuthController::class)->group(function ($router) {
        $router->post('/login', 'login')->name('login');
        $router->post('/logout', 'logout')->name('logout');
        $router->post('/refresh', 'refresh')->name('refresh');

    });
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::apiResource('users', UserController::class)->only('index', 'show');
    Route::apiResource('articles', ArticleController::class)->only('index', 'show');
    Route::apiResource('categories', CategoryController::class)->only('index');
    Route::apiResource('preferences', CategoryController::class)->only('index', 'show');
    Route::apiResource('sources', SourceController::class)->only('index', 'show');
    Route::apiResource('authors', AuthorController::class)->only('index', 'show');
});
