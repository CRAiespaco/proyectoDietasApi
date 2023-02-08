<?php

use App\Http\Controllers\API\CategoriaController;
use App\Http\Controllers\API\RecetaController;
use Illuminate\Support\Facades\Route;

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

/* Route::middleware('auth:sanctum')->group(function (){

}); */

/**
 * Rutas para recetas.
 */
Route::get('/receta',[RecetaController::class,'index']);//Ver todaas las recetas.
Route::get('/receta/{receta}',[RecetaController::class,'show']);//Ver una receta con un id en especifico.
Route::post('/receta/{receta}',[RecetaController::class,'store']);//Guardar una receta.
Route::put('/receta/{receta}',[RecetaController::class,'update']);//Actualizar una receta.
Route::delete('/receta/{receta}',[RecetaController::class,'destroy']);//Eliminar una receta.
Route::post('/receta/{receta}/ingrediente/{ingrediente}',[RecetaController::class,'attach']);//Añade un ingrediente a una receta.


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