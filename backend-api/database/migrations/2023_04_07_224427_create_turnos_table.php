<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTurnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id("id");
            $table->integer("id_admin");
            $table->integer("id_menu")->nullable();
            $table->integer("n_plazas");
            $table->string("observaciones")->nullable();
            $table->string("turno");
            $table->string("formas_pago");
            $table->boolean('visible')->default(false);
            $table->timestamps();
            $table->date('fecha'); // Nuevo atributo fecha
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turnos');
    }
}
