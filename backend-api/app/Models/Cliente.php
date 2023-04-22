<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes'; // Nombre de la tabla en la base de datos
    protected $fillable = ['nombre', 'apellido1', 'apellido2', 'email', 'telefono', 'observaciones', 'fecha'];
    use HasFactory;
    // Resto del código del modelo
}
