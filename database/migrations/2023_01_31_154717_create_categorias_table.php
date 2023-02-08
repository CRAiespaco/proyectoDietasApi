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
            $table->string('arroz')->nullable();
            $table->string('bebidas')->nullable();
            $table->string('carnes')->nullable();
            $table->string('dulces')->nullable();
            $table->string('ensaladas')->nullable();
            $table->string('mariscos')->nullable();
            $table->string('legumbres&cereales')->nullable();
            $table->string('pescados')->nullable();
            $table->string('pizzas')->nullable();
            $table->string('setas')->nullable();
            $table->string('verduras&frutas')->nullable();
            $table->string('sopas&cremas')->nullable();
            $table->string('huevos')->nullable();
            $table->string('pasta')->nullable();
            $table->string('lacteos')->nullable();
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
