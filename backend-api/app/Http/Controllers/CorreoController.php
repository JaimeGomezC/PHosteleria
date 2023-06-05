<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoPrueba;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $correo = new CorreoPrueba('asunto pruebas','ssevastian@gmail.com','mensaje pruebasssssaaddd');
        Mail::to($request->input('ssevastian@gmail.com'))->send($correo);

        return response()->json(['message' => 'Correo enviado']);
    }
}