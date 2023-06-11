<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Turnos;
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
    if ($reserva->estado=='Pagado') {
        // Actualizar el estado de la reserva a "anulado"
        $reserva->estado = 'Pagada y Anulada';
        $reserva->save();

        return response()->json(['result' => 'ok', 'message' => 'Reserva anulada']);
    } 
    elseif($reserva->estado!='Pagado'){
        $reserva->estado = 'Anulada';
        $reserva->save();
        return response()->json(['result' => 'ok', 'message' => 'Reserva anulada']);
    }
    else {
        return response()->json(['result' => 'error', 'message' => 'Código de verificación inválido']);
    }
}
}
