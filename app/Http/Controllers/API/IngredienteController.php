<?php

namespace App\Http\Controllers\API;

use App\Models\ingrediente;
use App\Models\TotalNutricion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class IngredienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Ingrediente::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(),[
            "valoracion"=>"decimal:0,2",
            "pasosASeguir"=>"required",
            "ingredientes"=>"required",
            "imagen"=>"string",
            "validacion"=>"boolean",
        ]);
        if($validacion->fails()){
            return \response("La ingrediente no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $ingrediente = new Ingrediente();
            $ingrediente->nombre=$request['nombre'];
            $ingrediente->imagen=$request['imagen'];
            $this->attachIngradienteTotalNutricion($request,$ingrediente,$request['totalNutricional']);
            $ingrediente->peso=$request['peso'];
            $ingrediente->save();

            $respuesta = [
                "mensaje"=>'ingrediente creado correctamente',
                'ingrediente'=>$ingrediente
            ];

            return \response()->json($respuesta);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Ingrediente $ingrediente)
    {
        return response(Ingrediente::with('totalNutricion')->find($ingrediente->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validacion=Validator::make((array)$request,[
            "valoracion"=>"decimal:0,2",
            "pasosASeguir"=>"required",
            "ingredientes"=>"required",
            "imagen"=>"string",
            "validacion"=>"boolean",
        ]);

        if($validacion->fails()){
            return("La receta no se pudo modificar");
        }else{
            $ingrediente = new Ingrediente();
            $ingrediente->nombre=$request['nombre'];
            $ingrediente->imagen=$request['imagen'];
            $this->attachIngradienteTotalNutricion($request,$ingrediente,$request['totalNutricional']);
            $ingrediente->peso=$request['peso'];
            $ingrediente->save();

            return \response()->json($ingrediente);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Ingrediente $ingrediente)
    {
        Ingrediente::destroy($ingrediente);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "ingrediente"=>$ingrediente
        ],Response::HTTP_BAD_REQUEST);
    }

    public function attachIngradienteTotalNutricion(Request $request, Ingrediente $ingrediente, TotalNutricion $totalNutricion){
        $ingrediente->totalNutricion()->attach($totalNutricion);
        return resolve($ingrediente);
    }
}
