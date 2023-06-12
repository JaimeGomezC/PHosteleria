<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turnos extends Model
{
    use HasFactory;
    protected $table = 'turnos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_admin',
        'n_plazas',
        'observaciones',
        'turno',
        'visible',
        'fecha',
        'formas_pago'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
