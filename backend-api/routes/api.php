<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\MenuController;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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
    
});

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('index', [AuthController::class, 'index']);
    Route::delete('destroy/{user}', [AuthController::class, 'destroy']);
    // Route::post('register',[AuthController::class,'register']);
    Route::put('update/{user}',[AuthController::class,'update']);

    Route::get('turnos',[TurnosController::class,'index']);
    Route::get('turnos/publicados',[TurnosController::class,'turnosPublicados']);
    Route::post('turnos',[TurnosController::class,'store']);
    Route::get('turnos/{turno}',[TurnosController::class,'show']);
    Route::put('turnos/{turno}',[TurnosController::class,'update']);
    Route::delete('turnos/{turno}',[TurnosController::class,'destroy']);

    Route::get('clientes', [ClienteController::class, 'index']);
    Route::get('clientes/{cliente}', [ClienteController::class, 'show']);
    Route::post('clientes',[ClienteController::class,'store']);
    Route::put('clientes/{cliente}', [ClienteController::class, 'update']);
    Route::delete('clientes/{cliente}', [ClienteController::class, 'destroy']);

    Route::get('reservas', [ReservaController::class, 'index']);
    Route::post('reservas', [ReservaController::class, 'store']);
    Route::get('reservas/{reserva}', [ReservaController::class, 'show']);
    Route::put('reservas/{reserva}', [ReservaController::class, 'update']);
    Route::delete('reservas/{reserva}', [ReservaController::class, 'destroy']);
    Route::get('reservas/turno/{id_turno}',[ReservaController::class, 'getByTurno']);
    Route::post('reservas/cliente', [ReservaController::class, 'insertClienteReserva']);


   

    Route::get('menus', [MenuController::class, 'index']);
    Route::post('menus', [MenuController::class, 'store']);
    Route::get('menus/{menu}', [MenuController::class, 'show']);
    Route::put('menus/{menu}', [MenuController::class, 'update']);
    Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
    Route::post('menus/upload-image', [MenuController::class, 'uploadImage']);
    Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
    Route::get('menus/mostrarImagen/{imagen}', [MenuController::class, 'mostrarImagen']);


    Route::get('/menus/{id}/imagen', function ($id) {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu not found'], 404);
        }
        $ruta = Storage::url($menu->imagen);
        return response()->file($ruta);
    });
    Route::post('/actualizar-cliente-reserva', 'NombreControlador@actualizarClienteReserva');

});
