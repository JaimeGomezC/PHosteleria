<?php

use Illuminate\Database\Migrations\Migration;

use Illuminate\Support\Facades\DB;

class CreateFunctionObtenerPlazasLibres extends Migration
{
    public function up()
    {
        $sql = "
        CREATE FUNCTION obtener_plazas_libres(id_turno INT) RETURNS INT
            BEGIN
              DECLARE plazas_totales INT;
              DECLARE plazas_ocupadas INT;
              DECLARE plazas_libres INT;
            
              -- Obtener el número total de plazas para el turno
              SELECT n_plazas INTO plazas_totales
              FROM turnos
              WHERE id = id_turno;
            
              -- Obtener el número de plazas ocupadas para el turno
              SELECT SUM(num_comensales) INTO plazas_ocupadas
              FROM reservas
              WHERE id_turno = id_turno;
            
              -- Calcular el número de plazas libres
              SET plazas_libres = plazas_totales - IFNULL(plazas_ocupadas, 0);
            
              RETURN plazas_libres;
            END
        ";
        DB::unprepared($sql);
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS obtener_plazas_libres');
    }
}
