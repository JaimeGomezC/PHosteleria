<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TurnoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("turnos")->insert(
            [
            'id_admin'=>1,
            'id_menu'=>1,
            'n_plazas'=>50,
            'observaciones'=>"pruebasss 1111",
            'turno'=>"Mañana",
            'visible'=>false,
            ]
        );
        DB::table("turnos")->insert(
            [
            'id_admin'=>1,
            'n_plazas'=>40,
            'observaciones'=>"pruebasss 222",
            'turno'=>"tarde",
            'visible'=>false,
            ]
        );
    }
}
