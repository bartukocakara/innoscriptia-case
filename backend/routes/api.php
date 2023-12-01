<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
