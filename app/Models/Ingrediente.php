<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ingrediente extends Model
{
    use HasFactory;

    public function usuario(){
        return $this->hasMany(Usuario::class);
    }

    public function receta(){
        return $this->hasMany(Receta::class);
    }

    public function totalNutricion(){
        return $this->belongsTo(TotalNutricion::class);
    }
}
