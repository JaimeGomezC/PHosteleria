<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

class CreateInsertClienteReservaFunction extends Migration
{
    public function up()
    {
        $sql = "
        CREATE FUNCTION insert_cliente_reserva(json_params JSON)
        RETURNS varchar(300)
        BEGIN
        DECLARE id_cliente INT;  
        DECLARE v_codigo varchar(10);
        
        SELECT CONV(FLOOR(RAND() * 99999999999999), 10, 36) into v_codigo;

        -- Comprobar si el código ya existe en la tabla
        WHILE EXISTS(SELECT * FROM reservas WHERE codigo_verificacion = @v_codigo) 
        DO
        -- Si el código ya existe, generar un nuevo código aleatorio
        SELECT CONV(FLOOR(RAND() * 99999999999999), 10, 36) into v_codigo;
        END WHILE;
        
        
        
        INSERT INTO clientes ( nombre, apellido1, apellido2, email, telefono, observaciones, fecha)
        VALUES ( JSON_EXTRACT(json_params, '$.nombre'), JSON_EXTRACT(json_params, '$.apellido1'),
        JSON_EXTRACT(json_params, '$.apellido2'), JSON_EXTRACT(json_params, '$.email'), JSON_EXTRACT(json_params, '$.telefono'),
        JSON_EXTRACT(json_params, '$.observaciones'), JSON_EXTRACT(json_params, '$.fecha'));
        
        SET id_cliente = LAST_INSERT_ID();
        
        INSERT INTO reservas ( id_cliente, id_turno, observaciones, fecha, num_comensales, forma_pago, precio_total, pagado_base, pagado_total, codigo_verificacion, producto_extra)
        VALUES ( id_cliente, JSON_EXTRACT(json_params, '$.id_turno'), JSON_EXTRACT(json_params, '$.reservas.observaciones'),
        JSON_EXTRACT(json_params, '$.fecha'), JSON_EXTRACT(json_params, '$.num_comensales'), JSON_EXTRACT(json_params, '$.forma_pago'),
        JSON_EXTRACT(json_params, '$.precio_total'), JSON_EXTRACT(json_params, '$.pagado_base'), JSON_EXTRACT(json_params, '$.pagado_total'),
        v_codigo, JSON_EXTRACT(json_params, '$.producto_extra'));
        
        RETURN 'Reserva y Cliente creados';
        END;
        ";
        DB::unprepared($sql);
    }
    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS insert_cliente_reserva');
    }
}