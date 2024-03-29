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
        Schema::create('ingretiente_total_nutriciones_receta', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ingrediente_id')->constrained();
            $table->foreignId('totalNutriciones_id')->constrained();

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
        Schema::dropIfExists('ingretiente_total_nutriciones_receta');
    }
};
