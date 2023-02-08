<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    //TODO:pendiente de revisar todos los tipos de categorias e incluir.
    protected $fillable = ['tipo'];

    public function recetas(){
        return $this->belongToMany(Receta::class);
    }
}
