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
        Categoria::create([ // 1
            "nombre"=>'arroz',
        ]);
        Categoria::create([ // 2
            'nombre'=>'bebidas',
        ]);
        Categoria::create([ // 3
            'nombre'=>'carnes',
        ]);
        Categoria::create([ // 4
            'nombre'=>'dulces',
        ]);
        Categoria::create([ // 5
            'nombre'=>'ensaladas',
        ]);
        Categoria::create([ // 6
            'nombre'=>'mariscos',
        ]);
        Categoria::create([ // 7
            'nombre'=>'legumbres&cereales',
        ]);
        Categoria::create([ // 8
            'nombre'=>'pescados',
        ]);
        Categoria::create([ // 9
            'nombre'=>'pizzas',
        ]);
        Categoria::create([ // 10
            'nombre'=>'setas',
        ]);
        Categoria::create([ // 11
            'nombre'=>'verduras&frutas',
        ]);
        Categoria::create([ // 12
            'nombre'=>'sopas&cremas',
        ]);
        Categoria::create([ //13
            'nombre'=>'huevos',
        ]);
        Categoria::create([ // 14
            'nombre'=>'pasta',
        ]);
        Categoria::create([ // 15
            'nombre'=>'lacteos',
        ]);
        Categoria::create([ // 16
            'nombre'=>'postres',
        ]);
    }
}
