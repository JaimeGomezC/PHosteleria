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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $turnos= new Turnos();
        $turnos->id_admin=$request->id_admin;
        $turnos->id_menu=$request->id_menu;
        $turnos->n_plazas=$request->n_plazas;
        $turnos->observaciones=$request->observaciones;
        $turnos->turno=$request->turno;
        $turnos->visible=$request->visible;
        $turnos->save();
        $data=[
            'result'=>'ok',
            'message'=>'Turno Creado',
            'turno'=>$turnos
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Turnos  $turnos
     * @return \Illuminate\Http\Response
     */
    public function edit(Turnos $turnos)
    {
        //
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
        $turno->id_admin=$request->id_admin;
        $turno->id_menu=$request->id_menu;
        $turno->n_plazas=$request->n_plazas;
        $turno->observaciones=$request->observaciones;
        $turno->turno=$request->turno;
        $turno->visible=$request->visible;
        $turno->save();
        $data=[
            'message'=>'Turno Actualizado',
            'turno'=>$turno
        ];
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Turnos  $turnos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Turnos $turno)
    {
       // Definir las reglas de validación
    $reglas = [
        'id' => 'required|exists:usuarios,id'
    ];

    // Crear una instancia del validador
    $validator = Validator::make(['id' => $turno], $reglas);
    
        if ($validator->fails()) {
            return response()->json(['mensaje' => 'Datos de solicitud inválidos'], 400);
        }
        try {
        $turno->delete();
        return response()->json(['result'=>true,'message'=>'Turno Eliminado','turno'=>$turno]);
        } catch (\Exception $e) {
            return response()->json(['result'=>false,'mensaje' => 'Error al borrar el usuario'], 500);
        }
    }
}
