<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = ['nombre','correo','contrasenya',];

    public function recetas(){
        return $this->belongsToMany(Receta::class);
    }

    public function ingrediente(){
        return $this->belongsToMany(Ingrediente::class);
    }

    //Proxima actualización
    /*public function objetivo(){
        return $this->HasOne(Objetivo::class);
    }*/
}
