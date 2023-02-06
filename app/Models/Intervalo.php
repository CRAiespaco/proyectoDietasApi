<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervalo extends Model
{
    use HasFactory;

    public function horario(){
        return $this->belongsTo(Horario::class);
    }

    public function receta(){
        return $this->belongsTo(Receta::class);
    }

    public function ingrediente(){
        return $this->belongsTo(ingrediente::class);
    }


}
