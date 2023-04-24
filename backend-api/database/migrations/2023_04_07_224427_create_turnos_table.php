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
            $table->increments("id");
            $table->integer("id_admin");
            $table->integer("id_menu")->nullable();
            $table->integer("n_plazas");
            $table->string("observaciones");
            $table->string("turno");
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