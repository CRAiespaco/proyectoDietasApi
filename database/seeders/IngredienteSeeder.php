<?php

namespace Database\Seeders;

use App\Models\Ingrediente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngredienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ingrediente::create([
            'nombre'=>'patatas',
            'proteinas'=>10,
            'azucares'=>10,
            'kcal'=>200
        ]);
        Ingrediente::create([
            'nombre'=>'aceite',
            'proteinas'=>5,
            'azucares'=>5,
            'kcal'=>100
        ]);
    }
}
