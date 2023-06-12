<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    use HasFactory;
    protected $fillable = [
        'codigo',
        'producto',
        'familia',
        'id_proveedor',
        'coste',
        'iva',
        'pvp',
        'existencia_min',
        'existencia_actual',
        'estado'
    ];
}
