<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserva;
use Illuminate\Support\Facades\Validator;

class ReservaController extends Controller
{
    public function index()
    {
        // Obtener todas las reservas
        $reservas = Reserva::all();
        return response()->json($reservas);
    }

    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'id_cliente' => 'required|exists:clientes,id',
            'id_turno' => 'required|exists:turnos,id',
            'observaciones' => 'nullable',
            'fecha' => 'required|date',
            'num_comensales' => 'required|integer',
            'forma_pago' => 'required|string',
            'precio_total' => 'required|numeric',
            'pagado_base' => 'required|numeric',
            'pagado_total' => 'required|numeric',
            'codigo_verificacion' => 'required|unique:reservas,codigo_verificacion',
            'producto_extra' => 'nullable',
        ]);

        // Crear una nueva reserva
        $reserva = new Reserva([
            'id_cliente' => $request->input('id_cliente'),
            'id_turno' => $request->input('id_turno'),
            'observaciones' => $request->input('observaciones'),
            'fecha' => $request->input('fecha'),
            'num_comensales' => $request->input('num_comensales'),
            'forma_pago' => $request->input('forma_pago'),
            'precio_total' => $request->input('precio_total'),
            'pagado_base' => $request->input('pagado_base'),
            'pagado_total' => $request->input('pagado_total'),
            'codigo_verificacion' => $request->input('codigo_verificacion'),
            'producto_extra' => $request->input('producto_extra'),
        ]);
        $reserva->save();

        return response()->json($reserva, 201);
    }

    public function show(Reserva $reserva)
    {
        // Obtener una reserva por su ID
        return response()->json($reserva);
    }

    public function update(Request $request, Reserva $reserva)
    {
        // Validar los datos de entrada
        $request->validate([
            'id_cliente' => 'required|exists:clientes,id',
            'id_turno' => 'required|exists:turnos,id',
            'observaciones' => 'nullable',
            'fecha' => 'required|date',
            'num_comensales' => 'required|integer',
            'forma_pago' => 'required|string',
            'precio_total' => 'required|numeric',
            'pagado_base' => 'required|numeric',
            'pagado_total' => 'required|numeric',
            'codigo_verificacion' => 'required|unique:reservas,codigo_verificacion,' . $reserva->id,
            'producto_extra' => 'nullable',
        ]);

        // Actualizar los datos de la reserva
        
    } 
    // // Filtrar por el turno
    public function getByTurno($id_turno)
    {
        $reservas = Reserva::where('id_turno', $id_turno)->get();
        return response()->json($reservas);
    }




}
