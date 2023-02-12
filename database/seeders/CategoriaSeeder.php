<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Categoria::create([
            "nombre"=>'arroz',
        ]);
        Categoria::create([
            'nombre'=>'bebidas',
        ]);
        Categoria::create([
            'nombre'=>'carnes',
        ]);
        Categoria::create([
            'nombre'=>'dulces',
        ]);
        Categoria::create([
            'nombre'=>'ensaladas',
        ]);
        Categoria::create([
            'nombre'=>'mariscos',
        ]);
        Categoria::create([
            'nombre'=>'legumbres&cereales',
        ]);
        Categoria::create([
            'nombre'=>'pescados',
        ]);
        Categoria::create([
            'nombre'=>'pizzas',
        ]);
        Categoria::create([
            'nombre'=>'setas',
        ]);
        Categoria::create([
            'nombre'=>'verduras&frutas',
        ]);
        Categoria::create([
            'nombre'=>'sopas&cremas',
        ]);
        Categoria::create([
            'nombre'=>'huevos',
        ]);
        Categoria::create([
            'nombre'=>'pasta',
        ]);
        Categoria::create([
            'nombre'=>'lacteos',
        ]);
    }
}
