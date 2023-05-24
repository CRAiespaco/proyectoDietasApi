<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['nombre'];

    public function recetas(){
        return $this->belongToMany(Receta::class);
    }
}

/*Funcion para obtener todos los ingredientes de un intervalo (Para la fase II)
foreach($this->intervalos as $intervalo){
    $arrayIngredientes[]=$intervalo->receta->obtenerArrayRecetasPesos();
}*/
