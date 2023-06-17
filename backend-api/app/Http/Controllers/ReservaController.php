<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Turnos;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ReservaExport;

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
        // $reserva = new Reserva([
        //     'id_cliente' => $request->input('id_cliente'),
        //     'id_turno' => $request->input('id_turno'),
        //     'observaciones' => $request->input('observaciones'),
        //     'fecha' => $request->input('fecha'),
        //     'num_comensales' => $request->input('num_comensales'),
        //     'forma_pago' => $request->input('forma_pago'),
        //     'precio_total' => $request->input('precio_total'),
        //     'pagado_base' => $request->input('pagado_base'),
        //     'pagado_total' => $request->input('pagado_total'),
        //     'codigo_verificacion' => $request->input('codigo_verificacion'),
        //     'producto_extra' => $request->input('producto_extra'),
        // ]);
        // $reserva->save();
        $data = [
            'result' => 'ok',
            'message' => 'Turno Creado',
            'resultado' => $request->input('id_cliente')
        ];
        return response()->json($data, 201);
        // return response()->json($request, 201);
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
   // Filtrar por reserva
    public function getByTurno($id_turno)
    {
        $reservas = Reserva::where('id_turno', $id_turno)->get();
        return response()->json($reservas);
    }

    public function destroy(Reserva $reserva)
    {
        $reserva->delete();
        return response()->json(null, 204);
    }
    public function calcularPlazasVacantes($turnoId)
    {
        $turno = Turnos::find($turnoId);
        if (!$turno) {
            return response()->json(['error' => 'El turno no existe'], 404);
        }

        $plazasTotales = $turno->n_plazas;
        $plazasOcupadas = Reserva::where('id_turno', $turnoId)->sum('num_comensales');
        $plazasVacantes = $plazasTotales - $plazasOcupadas;

        return response()->json(['plazas_vacantes' => $plazasVacantes]);
    }
    public function insertClienteReserva(Request $request)
    {
        // Obtener el parámetro JSON del request
        $json_params = stripslashes(json_encode($request->input()));
        // $json_params = addslashes(json_encode($request->input()));

        // Llamar a la función insert_cliente_reserva
        $resultado = DB::select('SELECT insert_cliente_reserva(?) AS resultado', [$json_params]);

        // Retornar el resultado
        return response()->json(['result' => 'ok',
        'message' => $resultado,
        'resultado' => 'Reserva y cliente añadido'
        ]);
    }
    public function exportReservas()
    {
        return Excel::download(new ReservaExport, 'turnos.xlsx');
    }
   
    public function anularReserva($codigoVerificacion)
{
    // Buscar la reserva por el código de verificación
    $reserva = Reserva::where('codigo_verificacion', $codigoVerificacion)->first();

    // Verificar si se encontró una reserva
    if (!$reserva) {
        return response()->json(['result' => 'error', 'message' => 'Código de verificación inválido'], 404);
    }

    // Obtener la fecha del turno
    $turno = Turnos::find($reserva->id_turno);
    if (!$turno) {
        return response()->json(['result' => 'error', 'message' => 'El turno no existe'], 404);
    }
    $fechaTurno = $turno->fecha;

    // Calcular la diferencia en días entre la fecha del turno y la fecha actual
    $fechaActual = date('Y-m-d');
    $diferenciaDias = strtotime($fechaTurno) - strtotime($fechaActual);
    $diferenciaDias = floor($diferenciaDias / (60 * 60 * 24));

    // Verificar si faltan menos de 3 días para el servicio del turno
    if ($diferenciaDias < 3) {
        return response()->json(['result' => 'error', 'message' => 'No se puede anular la reserva. Faltan menos de 3 días para el servicio del turno.'], 400);
    }

    // Anular la reserva
    if ($reserva->estado == 'Pagado') {
        $reserva->estado = 'Pagada y Anulada';
    } else {
        $reserva->estado = 'Anulada';
    }
    $reserva->save();

    return response()->json(['result' => 'ok', 'message' => 'Reserva anulada'], 200);
}

public function getReservasByClienteCorreo($correo)
{
    // Buscar los clientes por correo
    $clientes = Cliente::where('email', $correo)->get();

    // Verificar si se encontraron clientes
    if ($clientes->isEmpty()) {
        return response()->json(['error' => 'Cliente no encontrado'], 404);
    }

    $reservas = [];

    // Obtener las reservas de cada cliente con estado distinto de "anulado" y "finalizado"
    foreach ($clientes as $cliente) {
        $clienteReservas = Reserva::where('id_cliente', $cliente->id)
            ->whereNotIn('estado', ['Anulada', 'Finalizado'])
            ->get();

        $reservas = array_merge($reservas, $clienteReservas->toArray());
    }

    if (empty($reservas)) {
        return response()->json(['message' => 'El cliente no tiene reservas'], 200);
    }

    return response()->json($reservas, 200);
}
}
