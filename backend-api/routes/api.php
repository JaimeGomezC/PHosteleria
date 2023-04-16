<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TurnosController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['middleware' => 'cors'], function(){
    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']);
    Route::post('logout',[AuthController::class,'logout']);
});

Route::middleware(['auth:sanctum'])->group(function(){
    
    
    Route::get('turnos',[TurnosController::class,'index']);
    Route::post('turnos',[TurnosController::class,'store']);
    Route::get('turnos/{turno}',[TurnosController::class,'show']);
    Route::put('turnos/{turno}',[TurnosController::class,'update']);
    Route::delete('turnos/{turno}',[TurnosController::class,'destroy']);


    
});