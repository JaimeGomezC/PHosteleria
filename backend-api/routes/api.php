<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ReservaController;
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

    Route::get('clientes', [ClienteController::class, 'index']);
    Route::get('clientes/{cliente}', [ClienteController::class, 'show']);
    Route::put('clientes/{cliente}', [ClienteController::class, 'update']);
    Route::delete('clientes/{cliente}', [ClienteController::class, 'destroy']);

    Route::get('reservas', [ReservaController::class, 'index']);
    Route::post('reservas', [ReservaController::class, 'store']);
    Route::get('reservas/{reserva}', [ReservaController::class, 'show']);
    Route::put('reservas/{reserva}', [ReservaController::class, 'update']);
    Route::delete('reservas/{reserva}', [ReservaController::class, 'destroy']);
    Route::get('reservas/turno/{id_turno}',[ReservaController::class, 'getByTurno']);

});
Route::post('clientes', [ClienteController::class, 'store']);
