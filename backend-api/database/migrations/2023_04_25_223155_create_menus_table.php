<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre_menu');
            $table->string('imagen_menu');
            $table->decimal('precio_pax', 8, 2);
            $table->text('observaciones')->nullable();
            $table->integer('id_admin')->unsigned();
            /*$table->foreign('id_admin')->references('id')->on('admins')*/;
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
        Schema::dropIfExists('menus');
    }
}