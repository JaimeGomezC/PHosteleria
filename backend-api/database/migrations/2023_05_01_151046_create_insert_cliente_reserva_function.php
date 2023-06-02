<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateInsertClienteReservaFunction extends Migration
{
    public function up()
    {
        $sql = "
        CREATE FUNCTION insert_cliente_reserva(json_params JSON)
        RETURNS JSON
        BEGIN
            DECLARE id_cliente INT;
            DECLARE v_codigo VARCHAR(10);
            DECLARE plazas_totales INT;
            DECLARE plazas_ocupadas INT;
            DECLARE plazas_disponibles INT;
            
            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                -- Obtener el estado de SQL y el mensaje de error y devolverlo como resultado
                GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
                RETURN JSON_OBJECT('error', CONCAT('Error: ', @sqlstate, ' - ', @errno, ' - ', @errmsg));
            END;
        
            SELECT CONV(FLOOR(RAND() * 99999999999999), 10, 36) INTO v_codigo;
        
            -- Comprobar si el código ya existe en la tabla
            WHILE EXISTS(SELECT * FROM reservas WHERE codigo_verificacion = v_codigo) DO
                -- Si el código ya existe, generar un nuevo código aleatorio
                SELECT CONV(FLOOR(RAND() * 99999999999999), 10, 36) INTO v_codigo;
            END WHILE;
        
            -- Tu código SQL para obtener las plazas totales y ocupadas por turno
            -- Reemplaza los nombres de las tablas y columnas según tu estructura de base de datos
            SELECT n_plazas INTO plazas_totales FROM turnos WHERE id = JSON_EXTRACT(json_params, '$.id_turno');
        
            IF plazas_totales IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontró el turno especificado';
            END IF;
        
            SELECT IFNULL(SUM(num_comensales), 0) INTO plazas_ocupadas FROM reservas WHERE id_turno = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_turno')) AND estado <> 'Anulado';
        	
            IF  plazas_totales < plazas_ocupadas THEN
                RETURN JSON_OBJECT('error',TRUE,'message', 'No hay plazas disponibles, se han reservado el máx de plazas');
            END IF;
            SET plazas_disponibles = plazas_totales - plazas_ocupadas;
        
            IF JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.num_comensales')) > (plazas_disponibles + ROUND(0.1 * plazas_totales)) THEN
                RETURN JSON_OBJECT('error',TRUE,'message', 'No hay plazas disponibles');
            END IF;
        
            INSERT INTO clientes (nombre, apellido1, apellido2, email, telefono, observaciones_cliente, fecha)
            VALUES 
            (
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.nombre')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.apellido1')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.apellido2')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.email')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.telefono')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.observaciones_cliente')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.fecha'))
            );
        
            SET id_cliente = LAST_INSERT_ID();
        
            INSERT INTO reservas (id_cliente, id_turno, observaciones_reserva, fecha, num_comensales, forma_pago, precio_total, pagado_base, pagado_total, codigo_verificacion, producto_extra, estado)
            VALUES 
            (
                id_cliente, 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_turno')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.observaciones_reserva')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.fecha')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.num_comensales')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.forma_pago')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.precio_total')),
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.pagado_base')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.pagado_total')),
                v_codigo, 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.producto_extra')), 
                JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.estado'))
            );
        
            RETURN JSON_OBJECT('message', CONCAT('Plazas totales: ', plazas_totales, ' plazas_ocupadas: ', plazas_ocupadas+JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.num_comensales')), ' plazas_disponibles: ', plazas_disponibles-JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.num_comensales'))));
        END
        ";
        DB::unprepared($sql);
    }
    public function down()
    {
        DB::unprepared("DROP FUNCTION IF EXISTS insert_cliente_reserva");
    }
}