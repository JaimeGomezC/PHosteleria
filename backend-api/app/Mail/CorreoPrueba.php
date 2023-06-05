<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CorreoPrueba extends Mailable
{
    use Queueable, SerializesModels;

    public $asunto; // Define the $asunto property
    public $destinatario; // Define the $destinatario property
    public $mensaje; // Define the $mensaje property

    public function __construct($asunto, $destinatario, $mensaje)
    {
        $this->asunto = $asunto;
        $this->destinatario = $destinatario;
        $this->mensaje = $mensaje;
    }

    public function build()
    {
        return $this->subject($this->asunto)
                    ->to($this->destinatario)
                    ->view('emails.correo-prueba')
                    ->with('mensaje', $this->mensaje);
    }
}
