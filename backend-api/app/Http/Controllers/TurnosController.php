<?php

namespace App\Http\Controllers;

use App\Models\Turnos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

        return response()->json([
            'result' => 'ok',
            'data' => $turnos
        ], 200);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Turnos  $turnos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Turnos $id)
    {
        $menu = Turnos::find($id);
        $menu->delete();
        return response()->json(['message' => 'Menu deleted successfully']);
       
    }
}