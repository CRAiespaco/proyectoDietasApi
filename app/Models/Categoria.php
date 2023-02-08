<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['arroz','bebidas','carnes','dulces','ensaladas','mariscos','legumbres&cereales','pescados','pizzas','setas','verduras&frutas','sopas&cremas','huevos','pasta','lacteos'];

    public function recetas(){
        return $this->belongToMany(Receta::class);
    }
}
