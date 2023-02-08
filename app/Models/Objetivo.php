<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objetivo extends Model
{
    use HasFactory;

    protected $fillable = ['edad','altura','peso'];

    public function usuario(){
        return $this->belongsTo(Usuario::class);
    }
}
