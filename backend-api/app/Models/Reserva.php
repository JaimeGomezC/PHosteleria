<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;
    protected $table = 'reservas'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'id_cliente',
        'id_turno',
        'observaciones',
        'fecha',
        'num_comensales',
        'forma_pago',
        'precio_total',
        'pagado_base',
        'pagado_total',
        'codigo_verificacion',
        'producto_extra',
    ]; // Atributos permitidos para asignación masiva

    // Relación con el modelo Cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente');
    }

    // Relación con el modelo Turno
    public function turno()
    {
        return $this->belongsTo(Turno::class, 'id_turno');
    }
}
