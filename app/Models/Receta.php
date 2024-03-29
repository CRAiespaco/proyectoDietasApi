<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    use HasFactory;

    protected $fillable = ['nombre','valoracion','pasosASeguir','fechaCreacion','imagen','validacion'];

    public function categorias(){
        return $this->belongsToMany(Categoria::class);
    }

    public function ingredientes(){
        return $this->belongsToMany(Ingrediente::class)->withPivot('cantidad');
    }

    //TODO:preguntar relacion.
    public function usuario(){
        return $this->belongsToMany(User::class);
    }

/*    public function intervalo(){
        return $this->belongsTo(Intervalo::class);
    }*/

}
