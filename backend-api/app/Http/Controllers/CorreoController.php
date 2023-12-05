<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoPrueba;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


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
                $mensaje = "Le comunicamos que dispone de las siguientes reservas en la escuela de hostelería del instituto de La Flota:<br><br>";

                foreach ($reservas as $reserva) {
                    $mensaje .= "Fecha: ".$reserva->fecha." y número de reserva: " . $reserva->codigo_verificacion . "<br>";
                    // Agregar más detalles de la reserva si es necesario

                    $mensaje .= "<img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaoAzpURdV9VKiO0XaeV4y-fxLp3_bTMZL0McH5554XfuYH1a55hU9nhNexwSbOcC2Cw8&usqp=CAU/>";

                    $mensaje .= "<br>";

                    QrCode::format('png')->generate($reserva->codigo_verificacion, '../public/qrcodes/' . $reserva->codigo_verificacion . '.png');

                    $mensaje .= '<img src=C:/xampp/htdocs/ProyectoHosteleria/backend-api/public/qrcodes/JO4DN318W.png />';

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

        public function correo(Request $request)
    {
        $to = $request->input('to');
        $mensaje = $request->input('mensaje');

        $demo = new \stdClass();
        $demo->receiver = $to;
        $demo->mensaje = nl2br($mensaje);
        Mail::to($to)->send(new CorreoPrueba($demo));
        
        return response()->json(['result' => 'ok', 'message' => 'Correo electrónico enviado'], 200);
    }
}