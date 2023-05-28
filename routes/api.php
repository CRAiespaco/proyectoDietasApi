        <?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CategoriaController;
use App\Http\Controllers\API\RecetaController;
use App\Http\Controllers\API\IngredienteController;
use App\Http\Controllers\API\TotalNutricionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/



/**
 * Rutas de login
 */
Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);

Route::group(['middleware'=>'auth:api'], function(){
    //Aqui todas las rutas que tengan que ver con autenticacion.
});

//TODO: Validacion de datos en todos los controladores.
/**
 * Rutas para recetas.
 */
Route::get('/recetas',[RecetaController::class,'index']); //Ver todas las recetas
Route::get('/recetas/publicas',[RecetaController::class,'getRecetasPublic']); //Ver todas las recetas
Route::get('/receta/buscador',[RecetaController::class,'buscarPorPalabraClave']);//Busca una receta por el nombre del titulo.
Route::get('/receta/{id}',[RecetaController::class,'show']);//Ver una receta con un id en especifico.
Route::post('/receta',[RecetaController::class,'store']);//Guardar una receta.
Route::post('/receta/{id}/validacion/{opcion}',[RecetaController::class,'validarReceta']);//Actuliza una receta para validarla.
Route::put('/receta/{id}',[RecetaController::class,'update']);//Actualizar una receta.
//No se elimina correctamente
Route::delete('/receta/{id}',[RecetaController::class,'destroy']);//Eliminar una receta.

/**
 * Rutas para ingredientes.
 */
Route::get('/ingredientes',[IngredienteController::class,'index']);//Ver todas los ingrediente.
//TODO: No funciona con la relacion de total Nutricion darle una vuelta.
Route::get('/ingrediente/{id}',[IngredienteController::class,'show']);//Ver un ingrediente con un id en especifico.
Route::post('/ingrediente',[IngredienteController::class,'store']);//Guardar un ingrediente.
Route::put('/ingrediente/{id}',[IngredienteController::class,'update']);//Actualizar un ingrediente con el id.
Route::delete('/ingrediente/{id}',[IngredienteController::class,'destroy']);//Eliminar un ingrediente.
Route::post('/receta/{receta}/totalNutricional/{totalNutricional}',[IngredienteController::class,'attachIngradienteTotalNutricion']);//Añade un totalNutricional a un ingrediente.

/**
 * Rutas para categoria.
 */
Route::get('/categorias',[CategoriaController::class,'index']);
Route::get('/categoria/{id}',[CategoriaController::class,'show']);//Ver una categoria con un id en especifico.
Route::post('/categoria',[CategoriaController::class,'store']);//Guardar una categoria.
Route::put('/categoria/{id}',[CategoriaController::class,'update']);//Actualizar una categoria a traves de una id.
Route::delete('/categoria/{id}',[CategoriaController::class,'destroy']);//Eliminar una categoria.


//SEGUNDA PARTE...

/**
 * Rutas para totalNutricional.
 */
Route::get('/totalNutricional',[TotalNutricionController::class,'index']);//Ver todos los totalNutricional.
Route::get('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'show']);//Ver un totalNutricional con un id en especifico.
Route::post('/totalNutricional/',[TotalNutricionController::class,'store']);//Guardar un totalNutricional.
Route::put('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'update']);//Actualizar un totalNutricional.
Route::delete('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'destroy']);//Eliminar un totalNutricional.

/**
 * Rutas para usuarios.
 */
Route::get('/usuarios',[UserController::class,'index']);//Ver todos los usuarios.
Route::get('/usuario/{usuario}',[UserController::class,'show']);//Ver un usuario con un id en especifico.
Route::post('/usuario/{usuario}',[UserController::class,'store']);//Guardar un usuario.
Route::put('/usuario/{usuario}',[UserController::class,'update']);//Actualizar un usuario.
Route::delete('/usuario/{usuario}',[UserController::class,'destroy']);//Eliminar un usuario.
Route::post('/usuario/{usuario}/ingrediente/{ingrediente}',[UserController::class,'attachIngradienteUsuario']);//Añade un ingrediente a un usuario.
Route::post('/usuario/{usuario}/receta/{receta}',[UserController::class,'attachRecetaUsuario']);//Añade un receta a un usuario.

//TODO:seeder de ingredientes
