<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TotalNutricion extends Model
{
    use HasFactory;

    protected $fillable = ['proteinas','hidratosDeCarbono','grasas','kcal'];

    public function ingrediente(){
        return $this->hasMany(ingrediente::class);
    }
}
