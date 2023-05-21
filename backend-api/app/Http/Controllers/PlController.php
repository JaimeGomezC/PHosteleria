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
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function insertClienteReserva(Request $request)
    {
        // Obtener el parámetro JSON del request
        $json_params = stripslashes(json_encode($request->input()));
        try {
            $result = DB::selectOne('SELECT insert_cliente_reserva(?) AS result', [$json_params]);

            return response()->json(['result' => $result->result]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
 /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function obtenerPlazasLibres(Request $request)
    {
        $id_turno = $request->input('id_turno');
        $plazasLibres = DB::selectOne('SELECT obtener_plazas_libres(?) AS plazas_libres', [$id_turno]);

        return response()->json(['plazas_libres' => $plazasLibres->plazas_libres]);
    }

    public function updateClienteReserva(Request $request)
    {
        // Obtener el parámetro JSON del request
        $json_params = stripslashes(json_encode($request->input()));
        try {
            $result = DB::selectOne('SELECT update_cliente_reserva(?) AS result', [$json_params]);

            return response()->json(['result' => $result->result]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
}