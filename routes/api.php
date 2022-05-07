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

Route::post('/signup', 'AdminController@registerUser');
Route::post('/signin', 'AdminController@loginUser')->name('login');
Route::post('/signout', 'AdminController@logout')->name('logout');

Route::group(['middleware' => \App\Http\Middleware\IsAdmin::class], function () {
    Route::get('/clients', 'ClientController@index');
    Route::post('/clients', 'ClientController@createClient');
    Route::put('/clients/{id}', 'ClientController@updateClient');
    Route::get('/clients/{id}', 'ClientController@getClient');
    Route::delete('/clients/{id}', 'ClientController@deleteClient');
});
