<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    public function objetivo(){
        return $this->hasMany(Objetivo::class);
    }

    public function receta(){
        return $this->hasMany(Receta::class);
    }

    public function ingrediente(){
        return $this->hasMany(Ingrediente::class);
    }
}
