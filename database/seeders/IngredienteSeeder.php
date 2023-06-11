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
        Ingrediente::create([ // 1
            'nombre'=>'patatas',
            'proteinas'=>10,
            'azucares'=>10,
            'kcal'=>200,
            'imagen'=>'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg'
        ]);
        Ingrediente::create([ // 2
            'nombre'=>'aceite',
            'proteinas'=>5,
            'azucares'=>5,
            'kcal'=>100,
            'imagen'=>'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/02/aceite-oliva-prolonga-vida-estudio-ha-durado-decadas-nos-da-respuesta-2612889.jpg?tf=3840x'
        ]);
        Ingrediente::create([ // 3
            'nombre'=>'tomates',
            'proteinas'=>15,
            'azucares'=>20,
            'kcal'=>200,
            'imagen'=>'https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-09/tomate-fruta-verdura-hortaliza%C2%A9iStock.jpg?itok=0wnvYNtQ'
        ]);
        Ingrediente::create([ // 4
            'nombre'=>'cebolla',
            'proteinas'=>5,
            'azucares'=>5,
            'kcal'=>100,
            'imagen'=>'https://www.citrusgourmet.com/es/206-thickbox_default/saco-de-cebollas-12-kg.jpg'
        ]);
        Ingrediente::create([ // 5
            'nombre'=>'ajo',
            'proteinas'=>2,
            'azucares'=>2,
            'kcal'=>50,
            'imagen'=>'https://as01.epimg.net/deporteyvida/imagenes/2017/10/19/portada/1508433079_059048_1508433225_noticia_normal.jpg'
        ]);
        Ingrediente::create([ // 6
            'nombre'=>'champiñones',
            'proteinas'=>8,
            'azucares'=>9,
            'kcal'=>150,
            'imagen'=>'https://s3.abcstatics.com/media/gurme/2022/01/13/s/champinones-alimentos-gurme-kiRE--1200x630@abc.jpeg'
        ]);
        Ingrediente::create([ // 7
            'nombre'=>'lomo',
            'proteinas'=>150,
            'azucares'=>100,
            'kcal'=>100,
            'imagen'=>'https://www.tesifresc.com/wp-content/uploads/2020/09/Lomo_adobado_TF.jpg'
        ]);
        Ingrediente::create([ // 8
            'nombre'=>'pollo',
            'proteinas'=>200,
            'azucares'=>50,
            'kcal'=>100,
            'imagen'=>'https://www.ocu.org/-/media/ocu/images/themes/alimentacion/alimentos/tips/pollo%20guia%20para%20elegir%20y%20conservar/456844_thumbnail.jpg?rev=0e3d5afb-0096-4cbb-8cb9-681c40b3931b&hash=BFA0625F79DEFA51156AAB8C93A66D41'
        ]);
        Ingrediente::create([ // 9
            'nombre'=>'fresas',
            'proteinas'=>10,
            'azucares'=>50,
            'kcal'=>200,
            'imagen'=>'https://www.redaccionmedica.com/images/destacados/las-fresas-mejoran-los-sintomas-de-la-enfermedad-inflamatoria-intestinal-8046.jpg'
        ]);
        Ingrediente::create([ // 10
            'nombre'=>'harina',
            'proteinas'=>10,
            'azucares'=>10,
            'kcal'=>100,
            'imagen'=>'https://imag.bonviveur.com/harina-de-trigo.jpg'
        ]);
        Ingrediente::create([ // 11
            'nombre'=>'levadura',
            'proteinas'=>1,
            'azucares'=>1,
            'kcal'=>50,
            'imagen'=>'https://levital.blog/wp-content/uploads/2016/11/shutterstock_385947814.jpg'
        ]);
        Ingrediente::create([  // 12
            'nombre'=>'agua',
            'proteinas'=>10,
            'azucares'=>1,
            'kcal'=>5,
            'imagen'=>'https://www.ocu.org/-/media/ocu/seo/alimentaci%C3%B3n/agua/agua%20jarra%201.jpg?rev=025387ed-5510-42fb-8ac7-0a9a435b87d4&hash=D4E0148B8B2FF82F664AF7B7919671A2'
        ]);
        Ingrediente::create([ // 13
            'nombre'=>'yogurt',
            'proteinas'=>35,
            'azucares'=>50,
            'kcal'=>50,
            'imagen'=>'https://biotrendies.com/wp-content/uploads/2015/06/Yogurt-natural-1200x957.jpg'
        ]);
        Ingrediente::create([ //  14
            'nombre'=>'manzanas',
            'proteinas'=>50,
            'azucares'=>30,
            'kcal'=>100,
            'imagen'=>'https://biotrendies.com/wp-content/uploads/2015/06/manzana-1200x900.jpg'
        ]);
        Ingrediente::create([ // 15
            'nombre'=>'chorizo',
            'proteinas'=>30,
            'azucares'=>20,
            'kcal'=>150,
            'imagen'=>'https://i0.wp.com/chorizoyquesolachoriceria.com/wp-content/uploads/2018/01/ristra-chorizo-ahumado.jpg?fit=1000%2C1000&ssl=1'
        ]);
        Ingrediente::create([ // 16
            'nombre'=>'cerdo',
            'proteinas'=>40,
            'azucares'=>20,
            'kcal'=>100,
            'imagen'=>'https://www.gastronomiavasca.net/uploads/image/file/7258/filete_parrilla_con_pimientos_y_cebolla.jpg'
        ]);
    }
}
