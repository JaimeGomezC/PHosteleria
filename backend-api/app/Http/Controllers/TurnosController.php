<?php

namespace App\Http\Controllers;

use App\Models\Turnos;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TurnosExport;

class TurnosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $turno = Turnos::all();
        return response()->json($turno);
    }
    public function turnosPublicados()
    {
    $turnos = Turnos::where('visible', 1)->get();
    $response = [];

    foreach ($turnos as $turno) {
        $plazasTotales = $turno->n_plazas;
        $plazasOcupadas = Reserva::where('id_turno', $turno->id)->where('estado', '<>', 'Anulado')->sum('num_comensales');

        if ($plazasTotales <= $plazasOcupadas) {
            $disponibilidad = 'red';
        } 
         else {
            $disponibilidad = 'green';
        }

        $response[] = [
            'data' => $turno,
            'plazasTotales' => $plazasTotales,
            'plazasOcupadas' => $plazasOcupadas,
            'disponibilidad' => $disponibilidad
        ];
    }

    return response()->json(['result' => 'ok', 'data' => $response], 200);
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $turnos = new Turnos();
        $turnos->id_admin = $request->id_admin;
        $turnos->id_menu = $request->id_menu;
        $turnos->n_plazas = $request->n_plazas;
        $turnos->observaciones = $request->observaciones;
        $turnos->turno = $request->turno;
        $turnos->visible = $request->visible;
        $turnos->fecha = $request->fecha;
        $turnos->save();
        $data = [
            'result' => 'ok',
            'message' => 'Turno Creado',
            'turno' => $turnos
        ];
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Turnos  $turnos
     * @return \Illuminate\Http\Response
     */
    public function show(Turnos $turno)
    {
        return response()->json($turno);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Turnos  $turnos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Turnos $turno)
    {
        $turno->id_admin = $request->id_admin;
        $turno->id_menu = $request->id_menu;
        $turno->n_plazas = $request->n_plazas;
        $turno->observaciones = $request->observaciones;
        $turno->turno = $request->turno;
        $turno->visible = $request->visible;
        $turno->fecha = $request->fecha;
        $turno->save();
        $data = [
            'message' => 'Turno Actualizado',
            'turno' => $turno
        ];
        return response()->json($data);
    }

   
    public function destroy(Turnos $turno)
    {

    
        if (!$turno) {
            return response()->json(['error' => 'turno not found'], 404);
        }
        $turno->delete();
        return response()->json(['message' => 'Turno deleted'], 200);
       
    }
    
    public function exportTurnos()
{
    return Excel::download(new TurnosExport, 'turnos.xlsx');
}
}