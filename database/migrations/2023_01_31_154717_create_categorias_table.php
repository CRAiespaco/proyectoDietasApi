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
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('arroz');
            $table->string('bebidas');
            $table->string('carnes');
            $table->string('dulces');
            $table->string('ensaladas');
            $table->string('mariscos');
            $table->string('legumbres&cereales');
            $table->string('pescados');
            $table->string('pizzas');
            $table->string('setas');
            $table->string('verduras&frutas');
            $table->string('sopas&cremas');
            $table->string('huevos');
            $table->string('pasta');
            $table->string('lacteos');
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
        Schema::dropIfExists('categorias');
    }
};
