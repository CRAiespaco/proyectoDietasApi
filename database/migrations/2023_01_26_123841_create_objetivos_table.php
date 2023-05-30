<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('objetivos', function (Blueprint $table) {
            $table->id();
            $table->integer('edad');
            $table->float('altura');
            $table->float('peso');
            $table->float('caloriasTotales');
            $table->enum('tipoObjetivo',['bajar','subir','mantener']);
            $table->enum('genero',['hombre','mujer']);
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
        Schema::dropIfExists('objetivos');
    }
};
