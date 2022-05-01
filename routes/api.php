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

Route::get('/register', 'AdminController@showRegistrationForm');
Route::post('/register', 'AdminController@registerUser');
Route::get('/login', 'AdminController@showLoginForm');
Route::post('/login', 'AdminController@loginUser')->name('login');
Route::post('/logout', 'AdminController@logout')->name('logout');

Route::group(['middleware' => \App\Http\Middleware\IsAdmin::class], function () {
    Route::get('/client/{id}', 'ClientController@index');
    Route::post('/createClient', 'ClientController@createClient');
    Route::post('/updateClient', 'ClientController@updateClient');
    Route::delete('/deleteClient/{id}', 'ClientController@deleteClient');
});
