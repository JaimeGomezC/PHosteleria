<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function actualizarClienteReserva(Request $request) {
        $cliente_id = $request->input('cliente_id');
        $reserva_id = $request->input('reserva_id');
        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');
    
        // Llamar a la función de MySQL para actualizar los datos
        DB::statement("SELECT actualizar_datos_cliente_reserva($cliente_id, $reserva_id, '$fecha_inicio', '$fecha_fin')");
        
        return response()->json(['mensaje' => 'Datos actualizados correctamente']);
    }
}