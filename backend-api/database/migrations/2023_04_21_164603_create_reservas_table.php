<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_cliente');
            $table->unsignedBigInteger('id_turno');
            $table->text('observaciones_reserva')->nullable();
            $table->date('fecha');
            $table->integer('num_comensales');
            $table->string('forma_pago');
            $table->string('estado');
            $table->decimal('precio_total', 10, 2)->nullable();
            $table->decimal('pagado_base', 10, 2)->nullable();
            $table->decimal('pagado_total', 10, 2)->nullable();
            $table->string('codigo_verificacion')->unique()->charset('utf8mb4')->collation('utf8mb4_0900_ai_ci');
            $table->text('producto_extra')->nullable();
            $table->timestamps();
            
            // Definir las relaciones con las tablas de clientes y turnos
            $table->foreign('id_cliente')->references('id')->on('clientes');
            $table->foreign('id_turno')->references('id')->on('turnos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservas');
    }
}
