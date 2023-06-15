<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUpdateClienteReservaFunction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $sql = "
        CREATE FUNCTION update_cliente_reserva(json_params JSON)
RETURNS JSON
BEGIN
    DECLARE id_cliente INT;
    DECLARE plazas_totales INT;
    DECLARE plazas_ocupadas INT;
    DECLARE plazas_disponibles INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el estado de SQL y el mensaje de error y devolverlo como resultado
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @errmsg = MESSAGE_TEXT;
        RETURN JSON_OBJECT('error', TRUE, 'message', CONCAT('Error: ', @sqlstate, ' - ', @errno, ' - ', @errmsg));
    END;

    SELECT n_plazas INTO plazas_totales FROM turnos WHERE id = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_turno'));

    IF plazas_totales IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontró el turno especificado';
    END IF;

    SELECT IFNULL(SUM(num_comensales), 0) INTO plazas_ocupadas FROM reservas WHERE id_turno = JSON_EXTRACT(json_params, '$.id_turno');

    SET plazas_disponibles = plazas_totales - plazas_ocupadas;

    IF plazas_ocupadas >= plazas_totales THEN
        RETURN JSON_OBJECT('error', TRUE, 'message', CONCAT('Todas las plazas reservadas. Plazas totales: ', plazas_totales, ' plazas_ocupadas: ', plazas_ocupadas, ' plazas_disponibles: ', plazas_disponibles, ' id_turno:', JSON_EXTRACT(json_params, '$.id_turno')));
    END IF;

    UPDATE clientes
    SET nombre = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.nombre')),
        apellido1 = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.apellido1')),
        apellido2 = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.apellido2')),
        email = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.email')),
        telefono = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.telefono')),
        observaciones_cliente = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.observaciones_cliente')),
        fecha = STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.fecha')), '%Y-%m-%d')
    WHERE id = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_cliente'));

    UPDATE reservas
    SET id_turno = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_turno')),
        observaciones_reserva = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.observaciones_reserva')),
        fecha = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.fecha')),
        num_comensales = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.num_comensales')),
        forma_pago = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.forma_pago')),
        precio_total = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.precio_total')),
        pagado_base = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.pagado_base')),
        pagado_total = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.pagado_total')),
        producto_extra = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.producto_extra')),
        estado = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.estado'))
    WHERE id = JSON_UNQUOTE(JSON_EXTRACT(json_params, '$.id_reserva'));

    RETURN JSON_OBJECT('message', CONCAT('Plazas totales: ', plazas_totales, ' plazas_ocupadas: ', plazas_ocupadas, ' plazas_disponibles: ', plazas_disponibles, ' id_turno:', JSON_EXTRACT(json_params, '$.id_turno')));
END;
        ";
        DB::unprepared($sql);
    }
    public function down()
    {
        DB::unprepared("DROP FUNCTION IF EXISTS update_cliente_reserva");
    }
}
