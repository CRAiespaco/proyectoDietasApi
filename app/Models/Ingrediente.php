<?php

namespace App\Models;

use App\Http\Controllers\API\IngredienteController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Cast\Object_;

class Ingrediente extends Model
{
    use HasFactory;

    protected $fillable = ['nombre','imagen','valorNutricional','peso'];

    public function usuario(){
        return $this->belongsToMany(User::class);
    }

    public function receta(){
        return $this->belongsToMany(Receta::class)->withPivot('cantidad');
    }

    public function totalNutricion(){
        return $this->belongsTo(TotalNutricion::class);
    }

    public static function comprobarIngrediente(Ingrediente $ingrediente): bool
    {
        $prueba = Ingrediente::Where('nombre',$ingrediente->nombre)->get();
            if($prueba){
                return true;
            }else{
                return false;
            }
    }

}
