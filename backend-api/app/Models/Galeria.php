<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    use HasFactory;

    protected $table = 'galeria';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'nombre_imagen',
        'imagen_url',
        'descripcion',
        'observaciones',
        'visible',
        'id_admin',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin');
    }
}
