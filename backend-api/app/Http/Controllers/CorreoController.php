<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoPrueba;

class CorreoController extends Controller
{

    public function enviarCorreo(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $cc = $request->input('cc');

        // Obtener el correo del cliente desde el parámetro 'to'
        $correoCliente = $to;

        // Obtener las reservas del cliente con el correo especificado
        $reservasController = new ReservaController();
        $reservasResponse = $reservasController->getReservasByClienteCorreo($correoCliente);

        // Verificar si se obtuvieron las reservas correctamente
        if ($reservasResponse->getStatusCode() == 200) {
            $reservas = json_decode($reservasResponse->getContent());

            // Verificar si el cliente tiene reservas
            if (count($reservas) > 0) {
                // Construir el mensaje del correo
                $mensaje = "Le recordamos que tiene las siguientes reservas en la escuela de hostelería del instituto de La Flota:<br><br>";

                foreach ($reservas as $reserva) {
                    $mensaje .= "Fecha: ".$reserva->fecha." y número de reserva: " . $reserva->codigo_verificacion . "<br>";
                    // Agregar más detalles de la reserva si es necesario
                    $mensaje .= "<br>";
                }
                $demo = new \stdClass();
                $demo->receiver = $to;
                $demo->sender = $from;
                $demo->mensaje = nl2br($mensaje);
                

                // Enviar el correo
                Mail::to($to)->send(new CorreoPrueba($demo));

                return response()->json(['result' => 'ok', 'message' => 'Correo electrónico enviado'], 200);
            } else {
                return response()->json(['result' => 'error', 'message' => 'No se encontraron reservas para el cliente'], 404);
            }
        } else {
            return $reservasResponse;
        }
    }

        public function comunicarReserva(Request $request)
    {
        $to = $request->input('to');

        $demo = new \stdClass();
        $demo->receiver = $to;
        $demo->mensaje = nl2br($mensaje);
        Mail::to($to)->send(new CorreoPrueba($demo));
        
        return response()->json(['result' => 'ok', 'message' => 'Correo electrónico enviado'], 200);
    }
}