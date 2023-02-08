<?php

use App\Http\Controllers\API\CategoriaController;
use App\Http\Controllers\API\RecetaController;
use Illuminate\Support\Facades\Route;

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('/categoria',[CategoriaController::class,'index']);
Route::post('/categoria',[CategoriaController::class,'store']);

Route::post('/receta/{receta}/ingrediente/{ingrediente}',[RecetaController::class,'attach']);

Route::middleware('auth:sanctum')->group(function (){

});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/receta',[RecetaController::class,'index']);
Route::get('/receta/{receta}',[RecetaController::class,'show']);
Route::post('/receta',[RecetaController::class,'store']);

Route::put('/receta/{receta}',[RecetaController::class,'update']);
Route::delete('/receta/{receta}',[RecetaController::class,'destroy']);


Route::get('/usuario', function () {
    return view('Estos son todos los usuarios');
});

Route::get('/usuario/{id}', function ($id) {
    return view('usuario con el id: '.$id);
});

Route::put('/login', function () {
    return view('login');
});

Route::put('/register', function () {
    return view('creacion de usuarios');
});
