<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGaleriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('galeria', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre_imagen');
            $table->string('imagen_url');
            $table->text('descripcion')->nullable();
            $table->text('observaciones')->nullable();
            $table->string('tipo');
            $table->unsignedBigInteger('id_admin');
            //$table->foreign('id_admin')->references('id')->on('admins')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('galeria');
    }
}
