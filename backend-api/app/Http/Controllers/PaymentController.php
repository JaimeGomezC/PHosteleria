<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {
        // Configurar la biblioteca de Stripe con tus claves de API
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Obtener los detalles del pago desde el formulario
        $amount = $request->input('cantidad');
        $token = $request->input('stripeToken');
        //$description = $request->input('description');

        // Crear el cargo en Stripe
        $charge = Charge::create([
            'amount' => $amount,
            'currency' => 'eur',
            'description' => 'Pruebas',
            'source' => $token,
        ]);

        // Procesar la respuesta del pago
        if ($charge->status === 'succeeded') {
            // Pago exitoso, realizar las acciones necesarias (por ejemplo, guardar en la base de datos)
            return redirect()->back()->with('success', 'Pago exitoso');
        } else {
            // El pago falló
            return redirect()->back()->with('error', 'Error al procesar el pago');
        }
    }
}