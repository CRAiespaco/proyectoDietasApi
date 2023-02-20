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

/* Route::middleware('auth:sanctum')->group(function (){

}); */

/**
 * Rutas de login
 */
Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);


/**
 * Rutas para recetas.
 */
Route::get('/receta',[RecetaController::class,'index']);//Ver todas las recetas.
Route::get('/receta/{receta}',[RecetaController::class,'show']);//Ver una receta con un id en especifico.
Route::post('/receta',[RecetaController::class,'store']);//Guardar una receta.
Route::put('/receta',[RecetaController::class,'update']);//Actualizar una receta.
Route::delete('/receta',[RecetaController::class,'destroy']);//Eliminar una receta.
Route::post('/receta/{receta}/ingrediente/',[RecetaController::class,'attachRecetaIngrediente']);//Añade un ingrediente a una receta.

/**
 * Rutas para ingredientes.
 */
Route::get('/ingrediente',[IngredienteController::class,'index']);//Ver todas los ingrediente.
Route::get('/ingrediente/{ingrediente}',[IngredienteController::class,'show']);//Ver un ingrediente con un id en especifico.
Route::post('/ingrediente/{ingrediente}',[IngredienteController::class,'store']);//Guardar un ingrediente.
Route::put('/ingrediente/{ingrediente}',[IngredienteController::class,'update']);//Actualizar un ingrediente.
Route::delete('/ingrediente/{ingrediente}',[IngredienteController::class,'destroy']);//Eliminar un ingrediente.
Route::post('/receta/{receta}/totalNutricional/{totalNutricional}',[IngredienteController::class,'attachIngradienteTotalNutricion']);//Añade un totalNutricional a un ingrediente.

/**
 * Rutas para totalNutricional.
 */
Route::get('/totalNutricional',[TotalNutricionController::class,'index']);//Ver todos los totalNutricional.
Route::get('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'show']);//Ver un totalNutricional con un id en especifico.
Route::post('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'store']);//Guardar un totalNutricional.
Route::put('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'update']);//Actualizar un totalNutricional.
Route::delete('/totalNutricional/{totalNutricional}',[TotalNutricionController::class,'destroy']);//Eliminar un totalNutricional.

/**
 * Rutas para usuarios.
 */
Route::get('/usuario',[UserController::class,'index']);//Ver todos los usuarios.
Route::get('/usuario/{usuario}',[UserController::class,'show']);//Ver un usuario con un id en especifico.
Route::post('/usuario/{usuario}',[UserController::class,'store']);//Guardar un usuario.
Route::put('/usuario/{usuario}',[UserController::class,'update']);//Actualizar un usuario.
Route::delete('/usuario/{usuario}',[UserController::class,'destroy']);//Eliminar un usuario.
Route::post('/usuario/{usuario}/ingrediente/{ingrediente}',[UserController::class,'attachIngradienteUsuario']);//Añade un ingrediente a un usuario.
Route::post('/usuario/{usuario}/receta/{receta}',[UserController::class,'attachRecetaUsuario']);//Añade un receta a un usuario.

/**
 * Rutas para categoria.
 */
Route::get('/categoria',[CategoriaController::class,'index']);
Route::get('/categoria/{categoria}',[CategoriaController::class,'show']);//Ver una categoria con un id en especifico.
Route::post('/categoria/{categoria}',[CategoriaController::class,'store']);//Guardar una categoria.
Route::put('/categoria/{categoria}',[CategoriaController::class,'update']);//Actualizar una categoria.
Route::delete('/categoria/{categoria}',[CategoriaController::class,'destroy']);//Eliminar una categoria.

/**
 * Ruta de error con 404.
 */
Route::get('/error',[RecetaController::class,'paginaError']);
