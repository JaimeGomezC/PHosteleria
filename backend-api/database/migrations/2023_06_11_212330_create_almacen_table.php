<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('almacen', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('producto');
            $table->string('familia');
            $table->unsignedBigInteger('id_proveedor');
            $table->decimal('coste', 8, 2);
            $table->decimal('iva', 8, 2);
            $table->decimal('pvp', 8, 2);
            $table->integer('existencia_min');
            $table->integer('existencia_actual');
            $table->string('estado');
            $table->timestamps();
            
            // $table->foreign('id_proveedor')->references('id')->on('proveedores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('almacen');
    }
}
