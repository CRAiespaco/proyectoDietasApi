<?php

namespace Database\Seeders;

use App\Models\Ingrediente;
use App\Models\Receta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $receta= Receta::create([
            'nombre' => 'receta1',
            'valoracion' => 5,
            'pasosASeguir' => 'calentar',
            'validacion' => true
        ]);
        $ingredientes = Ingrediente::get();
        $receta->ingredientes()->attach($ingredientes);
        $receta->save();

    }
}
