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
        
        
        INSERT INTO clientes ( nombre, apellido1, apellido2, email, telefono, observaciones, fecha)
        VALUES ( JSON_EXTRACT(json_params, '$.clientes[0].nombre'), JSON_EXTRACT(json_params, '$.clientes[0].apellido1'),
        JSON_EXTRACT(json_params, '$.clientes[0].apellido2'), JSON_EXTRACT(json_params, '$.clientes[0].email'), JSON_EXTRACT(json_params, '$.clientes[0].telefono'),
        JSON_EXTRACT(json_params, '$.clientes[0].observaciones'), JSON_EXTRACT(json_params, '$.clientes[0].fecha'));
        
        SET id_cliente = LAST_INSERT_ID();
        
        INSERT INTO reservas ( id_cliente, id_turno, observaciones, fecha, num_comensales, forma_pago, precio_total, pagado_base, pagado_total, codigo_verificacion, producto_extra)
        VALUES ( id_cliente, JSON_EXTRACT(json_params, '$.reservas[0].id_turno'), JSON_EXTRACT(json_params, '$.reservas.observaciones'),
        JSON_EXTRACT(json_params, '$.reservas[0].fecha'), JSON_EXTRACT(json_params, '$.reservas[0].num_comensales'), JSON_EXTRACT(json_params, '$.reservas[0].forma_pago'),
        JSON_EXTRACT(json_params, '$.reservas[0].precio_total'), JSON_EXTRACT(json_params, '$.reservas[0].pagado_base'), JSON_EXTRACT(json_params, '$.reservas[0].pagado_total'),
        JSON_EXTRACT(json_params, '$.reservas[0].codigo_verificacion'), JSON_EXTRACT(json_params, '$.reservas[0].producto_extra'));
        
  
        
        RETURN 'hola';
        END;
        ";
        DB::unprepared($sql);
    }
    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS insert_cliente_reserva');
    }
}