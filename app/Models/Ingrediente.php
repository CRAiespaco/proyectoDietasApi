<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ingrediente extends Model
{
    use HasFactory;

    protected $fillable = ['nombre','imagen','valorNutricional','peso'];

    public function usuario(){
        return $this->belongsToMany(Usuario::class);
    }

    public function receta(){
        return $this->belongsToMany(Receta::class)->withPivot('cantidad');
    }

    public function totalNutricion(){
        return $this->belongsTo(TotalNutricion::class);
    }


}
