<?php

namespace Database\Seeders;

use App\Models\Categoria;
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
        $receta1= Receta::create([
            'nombre' => 'Filete con arroz',
            'valoracion' => 2,
            'pasosASeguir' => '
Echa una cucharada de aceite de oliva en una olla y, cuando esté caliente, agrega un diente de ajo en láminas. Cuando empiece a coger color, agrega una taza de arroz. Da unas vueltas un par de minutos y añade dos tazas agua caliente y una cucharadita de sal. Cocina a fuego alto durante 7 minutos y después baja el fuego y cocina a fuego lento 8 minutos más. Si en este tiempo ha absorbido todo el agua y aún sigue duro, añade un poco más de agua. Déjalo reposar un poquito.
Pica finamente el ajo y en tiras la cebolla. Lava el brócoli y córtalo en ramilletes no muy grandes. En una sartén con aceite sofríe el ajo y la cebolla. Cuando esté blandita la cebolla añade el brócoli y saltéalo durante varios minutos a fuego medio.
Añade las tiras de lomo de cerdo a la sartén que contiene el brócoli. También vierte 4-5 cucharadas de arroz y la salsa de soja, y revuelve todos los ingredientes. Saltea a fuego medio durante un par de minutos. Sirve en platos y ¡a disfrutar!',
            'validacion' => true,
            'imagen'=>'https://www.cocinasincarne.es/wp-content/uploads/2018/05/Solomillo-ib%C3%A9rico-adobado-con-arroz-integral5.jpg'
        ]);

        $receta1->ingredientes()->attach([
            16 => ['cantidad'=>50],
            2 => ['cantidad'=>20],
            5 => ['cantidad'=>10],
            4 => ['cantidad'=>5]
        ]);
        $receta1->categorias()->attach(3);
        $receta1->save();

        $receta2 = Receta::create([
            'nombre'=>'patata paja',
            'valoracion'=>3,
            'pasosASeguir'=>'Para hacer las patatas paja, deja listos todos los ingredientes. Así pues, pela las patatas. Lava las patatas peladas y empieza a cortarlas. Si vas a hacer las patatas paja con mandolina, deberás poner las cuchillas especiales para hacer este tipo de corte y deslizar la patata con cuidado para no cortarte.Si no tienes mandolina o la tuya no tiene las cuchillas para hacer las tiras, ¿cómo cortar patatas paja? Muy sencillo, corta rodajas muy finas. Después, corta las rodajas en tiras también muy finas. De esta forma tardarás más, pero quedarán igualmente buenas y crujientes.Coloca las patatas en un bol con agua, taáplo y déjalas así durante 30 minutos. Este es otro de los secretos de la receta de patatas paja, ya que de esta forma las patatas sueltan el almidón, no se apelmazan y quedan más sueltas y crujientes a la hora de cocinarlas. Si no tienes tanto tiempo, puedes dejarlas 15 minutos.Saca las patatas y sécalas con un paño limpio o con papel de cocina.Pon una sartén con el aceite de oliva a fuego medio y, cuando el aceite esté caliente, fríe las patatas paja en tandas pequeñas para que se hagan poco a poco y queden sueltas y bien doradas.
Truco: Para hacer las patatas paja al horno, colócalas en una bandeja forrada con papel de hornear, hornea durante 10 minutos a 180 ºC, múevelas y déjalas otros 5-10 minutos.Ten preparado un plato con papel de cocina para dejar ahí las patatas conforme se vayan haciendo. Déjalas escurriendo para que el papel absorba el aceite sobrante.Añade sal al gusto y ya las tienes listas para servir. Ahora que sabes cómo se hacen las patatas paja, puedes disfrutarlas durante el aperitivo o utilizarlas para hacer otras recetas, como por ejemplo un revuelto de bacalao con patatas paja o patatas paja con jamón y huevo frito.',
            'validacion'=>true,
            'imagen'=>'https://cdn0.recetasgratis.net/es/posts/8/0/1/patatas_paja_74108_600.webp'
        ]);
        $receta2->ingredientes()->attach([
            1 => ['cantidad'=>50],
            2 => ['cantidad'=>20],
            5 => ['cantidad'=>10],
            4 => ['cantidad'=>5]
        ]);
        $receta2->categorias()->attach(14);
        $receta2->save();

        $receta3 = Receta::create([
            'nombre'=>'Ceviche de champiñones',
            'valoracion'=>3,
            'pasosASeguir'=>'Para preparar un rico ceviche de champiñones, primero debes cocinar el choclo desgranado en agua hirviendo con una cucharada de azúcar rubio. Reserva.Con la ayuda de un cuchillo, corta la cebolla en juliana (tiras delgadas) y resérvala en agua con hielo para conservar el crujiente de la cebolla.Corta los champiñones en láminas delgadas. Reserva en un bol y agrega una pizca de sal con la finalidad de que los champiñones empiecen a sudar.Con un cuchillo retira las venas del ají limo y corta en pedazos pequeños. Reserva.Ralla el jengibre con un rallador. También, debes estrujar y retirar el líquido del jengibre rallado. Reserva.',
            'validacion'=>true,
            'imagen'=>'https://cdn0.recetasgratis.net/es/posts/1/4/3/ceviche_de_champinones_75341_600.webp'
        ]);
        $receta3->ingredientes()->attach([
            6 => ['cantidad'=>50],
            2 => ['cantidad'=>20],
            5 => ['cantidad'=>10],
            4 => ['cantidad'=>5]
        ]);
        $receta3->categorias()->attach(11);
        $receta3->save();

        $receta4 = Receta::create([
            'nombre'=>'Tinga de pollo',
            'valoracion'=>3,
            'pasosASeguir'=>'Para hacer la receta de tinga de pollo, primero corta en rodajas la cebolla, preferiblemente delgadas. Si quieres, también puedes usar más cebolla para hacer aún más rendidora la receta.Licua por unos minutos los jitomates con un trozo de cebolla, un diente de ajo y los chiles chipotles. La cantidad de chiles es opcional, pero si quieres un sabor neutral de picante prueba agregando 2 o 3 chiles chipotle.En una olla con una cucharada de aceite, acitrona la cebolla. A partir de aquí el sazón será muy importante, por lo que ve añadiendo sal poco a poco.
¿Quieres conocer más opciones a la hora de cocinar las cebollas? Consulta este artículo y aprende la Receta de cebolla caramelizada paso a paso.Cuando esté ligeramente dorada y transparente, vierte la salsa que licuaste de jitomate y chipotle, prueba el sabor y vuelve a sazonar con sal al gusto. Puedes colar la salsa para obtener una textura homogénea y lisa.
Si quieres conocer otra forma de cocinar la salsa de jitomate para hacer la tinga de pollo sin chipotle, no te pierdas esta Receta de salsa de jitomate.Por último, añade el pollo desmenuzado y mezcla muy bien los ingredientes para integrar todo. Te proporcionamos un consejo de sabor de la abuela: agrega una pizca de canela en polvo, esto aportará un sabor único e intensificará todos los ingredientes de la tinga de pollo. Cocina todo por 8 minutos a fuego medio-bajo y ya estará lista para servir.Ya puedes disfrutar de una rica tinga de pollo de la abuela, fácil y rendidora. Acompáñala con tostadas, queso y crema al gusto. ¡Ya no te asaltarán más dudas acerca de cómo se hace la tinga de pollo!
Y, si además, quieres conocer cómo hacer tinga de pollo con chipotle, no te pierdas esta receta sobre Tinga de pollo con chorizo y chipotle.',
            'validacion'=>true,
            'imagen'=>'https://cdn0.recetasgratis.net/es/posts/8/0/2/tinga_de_pollo_75208_600.webp'
        ]);
        $receta4->ingredientes()->attach([
            8 => ['cantidad'=>50],
            2 => ['cantidad'=>20],
            5 => ['cantidad'=>10],
            4 => ['cantidad'=>5]
        ]);
        $receta4->categorias()->attach(3);
        $receta4->save();

        $receta5 = Receta::create([
            'nombre'=>'Carlota de fresa',
            'valoracion'=>3,
            'pasosASeguir'=>'Esta receta consta de varias preparaciones que deberás hacer por separado y unir al final. Para empezar, mezcla el agua con el azúcar en una olla alta, déjala hidratar unos minutos y luego cocínala a fuego medio, con cuidado de que el líquido no toque los bordes porque si no el azúcar se cristalizará. Bate las claras. Hecho esto, una vez que el agua con azúcar empiece a hervir, déjala unos 2 minutos o hasta que las burbujas sean bien grandes y espesas. También puedes medir la temperatura, que debe estar entre 118 y 119 ºC. Agrégala en forma de hilo sobre las claras batidas y continúa batiendo hasta que tomen temperatura ambiente, un color blanco brillante y se sostengan del batidor.
Mezcla la fruta limpia y sin los tallos con el jugo de limón y procésala para obtener un puré.
Por otro lado, bate la crema hasta que esté completamente montada. De esta forma, conseguirás una carlota de fresa y crema con una textura similar a la del mousse, ¡quedará exquisita!En un recipiente pequeño, hidrata la gelatina con 5 partes de agua, es decir, 10 gramos de gelatina con 50 ml de agua. Caliéntala 10 segundos en el microondas para activarla.En un recipiente pequeño, hidrata la gelatina con 5 partes de agua, es decir, 10 gramos de gelatina con 50 ml de agua. Caliéntala 10 segundos en el microondas para activarla.Mezcla la gelatina activada con la fresa triturada. A continuación, agrega 1 cucharada del merengue y únelo haciendo movimientos envolventes.Vuelca la preparación del punto anterior en el resto del merengue e intégralo con movimientos envolventes para que no pierda volumen.
Añade la crema batida y repite los movimientos envolventes.Ahora es momento de armar la carlota de fresa. Para ello, corta la punta de las vainillas y colócalas con el borde redondeado hacia arriba y el cóncavo hacia afuera, cubriendo las paredes de tu molde. Puedes cubrirlo previamente con film o acetato para facilitar el desmolde. Cubre también la base del mismo con más vainillas.
Puedes elaborar tus propias vainillas con esta sencilla Receta de bizcochitos de soletilla.Agrega la crema de fresa y repártela bien. Tapa el postre con film y resérvalo en el congelador durante 30 minutos o en la nevera durante 4 horas. Puedes mantener este postre en el congelador por 2 meses.¡Listo! Ya puedes disfrutar de esta exquisita carlota de fresa. Puedes decorarla con más frutas por encima o nata montada, ¡lo que más te guste! Y si quieres elaborar una calota navideña, te recomendamos colocar un lado alrededor para mejorar su presentación, ¡será como un regalo!
Descubre este otra receta para aprender a preparar este postre de distintas formas: "Carlota de limón".',
            'validacion'=>true,
            'imagen'=>'https://cdn0.recetasgratis.net/es/posts/3/9/6/carlota_de_fresa_75693_600.webp'
        ]);
        $receta5->ingredientes()->attach([
            9 => ['cantidad'=>50],
            2 => ['cantidad'=>20],
            5 => ['cantidad'=>10],
            4 => ['cantidad'=>5]
        ]);
        $receta5->categorias()->attach(16);

        $receta5->save();
    }
}
