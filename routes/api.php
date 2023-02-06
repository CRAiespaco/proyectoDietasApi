<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::get('/categoria',[CategoriaController::class,'index']);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/receta/{id}', function ($id) {
    return view('Receta con el id: '.$id);
});

Route::get('/receta', function () {
    return view('Estas son todas las recetas');
});

Route::put('/receta', function () {
    return view('creacion de receta');
});

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
