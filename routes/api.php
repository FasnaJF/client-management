<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/register', 'HomeController@showRegistrationForm');
Route::post('/register', 'HomeController@registerUser');
Route::get('/login', 'HomeController@showLoginForm');
Route::post('/login', 'HomeController@loginUser')->name('login');
Route::post('/logout', 'HomeController@logout')->name('logout');

Route::group(['middleware' => \App\Http\Middleware\IsAdmin::class], function () {
    Route::get('/dashboard/{id}', 'DashboardController@index');
    Route::post('/createClient', 'DashboardController@createClient');
    Route::post('/updateClient', 'DashboardController@updateClient');
    Route::delete('/deleteClient/{id}', 'DashboardController@deleteClient');
});
