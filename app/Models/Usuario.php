<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['nombre','email','password',];

    protected $hidden = ['password','remember_token'];

    public function recetas(){
        return $this->belongsToMany(Receta::class);
    }

    public function ingredientes(){
        return $this->belongsToMany(Ingrediente::class);
    }

    //Proxima actualización
    /*public function objetivo(){
        return $this->HasOne(Objetivo::class);
    }*/
}
