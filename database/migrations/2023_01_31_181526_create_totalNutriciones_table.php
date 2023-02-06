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
        Schema::create('totalNutriciones', function (Blueprint $table) {
            $table->id();
            $table->float('proteinas');
            $table->float('hidratosDeCarbono');
            $table->float('grasas');
            $table->float('Kcal');
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
        Schema::dropIfExists('totalNutriciones');
    }
};
