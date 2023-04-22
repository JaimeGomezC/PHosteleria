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
            $table->foreignId('id_cliente')->constrained('clientes');
            $table->foreignId('id_turno')->constrained('turnos');
            $table->text('observaciones')->nullable();
            $table->date('fecha');
            $table->integer('num_comensales');
            $table->string('forma_pago');
            $table->decimal('precio_total', 10, 2);
            $table->decimal('pagado_base', 10, 2);
            $table->decimal('pagado_total', 10, 2);
            $table->string('codigo_verificacion')->unique();
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
