<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\CorreoController;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AlmacenController;


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
    Route::post('login',[AuthController::class,'login']);
    Route::post('logout',[AuthController::class,'logout']);
    Route::post('register',[AuthController::class,'register']);
    Route::get('turnos/publicados',[TurnosController::class,'turnosPublicados']);
    Route::get('reservas/plazasVacantes/{id_turno}',[ReservaController::class, 'calcularPlazasVacantes']);
    Route::post('pl/insertClienteReserva', [PlController::class, 'insertClienteReserva']);
    Route::post('/payment', [PaymentController::class, 'processPayment']);

    
    Route::post('reservas/anular/{codigoVerificacion}', [ReservaController::class, 'anularReserva']);
    Route::get('menus/{menu}', [MenuController::class, 'show']);


});

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('index', [AuthController::class, 'index']);
    Route::delete('destroy/{user}', [AuthController::class, 'destroy']);
    // Route::post('register',[AuthController::class,'register']);
    Route::put('update/{user}',[AuthController::class,'update']);
    // TABLA TURNOS
    Route::get('turnos',[TurnosController::class,'index']);
    Route::post('turnos',[TurnosController::class,'store']);
    Route::get('turnos/{turno}',[TurnosController::class,'show']);
    Route::put('turnos/{turno}',[TurnosController::class,'update']);
    Route::delete('turnos/{turno}',[TurnosController::class,'destroy']);
    Route::get('turnos2',[TurnosController::class,'exportTurnos']);

    // TABLA CLIENTES
    Route::get('clientes', [ClienteController::class, 'index']);
    Route::get('clientes/{cliente}', [ClienteController::class, 'show']);
    Route::post('clientes',[ClienteController::class,'store']);
    Route::put('clientes/{cliente}', [ClienteController::class, 'update']);
    Route::delete('clientes/{cliente}', [ClienteController::class, 'destroy']);
    // TABLA RESERVAS
    Route::get('reservas', [ReservaController::class, 'index']);
    Route::post('reservas', [ReservaController::class, 'store']);
    Route::get('reservas/{reserva}', [ReservaController::class, 'show']);
    Route::put('reservas/{reserva}', [ReservaController::class, 'update']);
    Route::delete('reservas/{reserva}', [ReservaController::class, 'destroy']);
    Route::get('reservas/turno/{reserva}',[ReservaController::class, 'getByTurno']);
    Route::get('reservasExport',[ReservaController::class,'exportReservas']);
    
    // TABLA MENU
    Route::get('menus', [MenuController::class, 'index']);
    Route::post('menus', [MenuController::class, 'store']);
    Route::put('menus/{menu}', [MenuController::class, 'update']);
    Route::delete('menus/deleteImage', [MenuController::class, 'deleteImage']);
    Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
    Route::post('menus/upload-image', [MenuController::class, 'uploadImage']);
    Route::get('menus/turno/{id_turno}',[MenuController::class, 'getByTurno']);

    // TABLA ALMACEN
    Route::get('almacenes', [AlmacenController::class, 'index']);
    Route::post('almacenes', [AlmacenController::class, 'store']);
    Route::get('almacenes/{almacen}', [AlmacenController::class, 'show']);
    Route::put('almacenes/{almacen}', [AlmacenController::class, 'update']);
    Route::delete('almacenes/{almacen}', [AlmacenController::class, 'destroy']);

    // TABLA GALERIA
    Route::get('galeria', [GaleriaController::class, 'index']);
    Route::post('galeria',[GaleriaController::class,'store']);
    Route::get('galeria/{imagen}',[GaleriaController::class,'show']);
    Route::put('galeria/{imagen}',[GaleriaController::class,'update']);
    Route::get('/galeria/search/{tipo}',[GaleriaController::class,'searchByTipo']);
    Route::delete('galeria/deleteImage',[GaleriaController::class,'deleteImage']);
    Route::delete('galeria/{imagen}',[GaleriaController::class,'destroy']);
    Route::post('galeria/upload-foto', [GaleriaController::class, 'uploadImage']);

    // LLAMADAS A FUNCIONES PL
    Route::post('pl/actualizar-cliente-reserva', [PlController::class, 'actualizarClienteReserva']);
    Route::get('obtenerPlazasLibres', [PlController::class, 'obtenerPlazasLibres']);
    Route::post('pl/updateClienteReserva', [PlController::class, 'updateClienteReserva']);
    
});
    Route::post('correo', [CorreoController::class, 'enviarCorreo']);

    //MOSTRAR IMAGENES DE INICIO Y GALERIA A CLIENTES NO LOGEADOS
    Route::get('/galeria/search/{tipo}',[GaleriaController::class,'searchByTipo']);


    





