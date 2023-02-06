<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;

    public function objetivo(){
        return $this->belongsTo(Objetivo::class);
    }

    public function intervalo(){
        return $this->belongsTo(Intervalo::class);
    }
}
