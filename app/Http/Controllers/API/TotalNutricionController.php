<?php

namespace App\Http\Controllers\API;

use App\Models\TotalNutricion;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TotalNutricionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       /* Validator::make($request->all(),[
            "tipoObjetivo"=>"enum:()"
        ]);  */
        return response(TotalNutricion::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion=Validator::make($request->all(),[
           "proteina"=>"decimal",
           "hidratos"=>"decimal",
           "grasas"=>"decimal",
           "Kcal"=>"decimal",
        ]);
        if($validacion->fails()){
            return response("El total nutricional no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $totalNutricion=new TotalNutricion();
            $totalNutricion->proteina=$request['proteina'];
            $totalNutricion->hidratos=$request['hidratos'];
            $totalNutricion->grasas=$request['grasas'];
            $totalNutricion->Kcal=$request['Kcal'];
        }

        $respuesta = [
            "mensaje"=>'Total nutricional creado correctamente',
            'TotalNutricion'=>$totalNutricion
        ];

        return response()->json($respuesta);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($totalNutricion)
    {
        return  response(TotalNutricion::with()->find($totalNutricion->id));
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
        $validacion=Validator::make($request->all(),[
            "proteina"=>"decimal",
            "hidratos"=>"decimal",
            "grasas"=>"decimal",
            "Kcal"=>"decimal",
        ]);
        if($validacion->fails()){
            return response("El total nutricional no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $totalNutricion=new TotalNutricion();
            $totalNutricion->proteina=$request['proteina'];
            $totalNutricion->hidratos=$request['hidratos'];
            $totalNutricion->grasas=$request['grasas'];
            $totalNutricion->Kcal=$request['Kcal'];
        }

        $respuesta = [
            "mensaje"=>'Total nutricional modificado correctamente',
            'TotalNutricion'=>$totalNutricion
        ];

        return response()->json($respuesta);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($totalNutricion)
    {
        TotalNutricion::destroy($totalNutricion);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "TotalNutricion"=>$totalNutricion
        ],Response::HTTP_BAD_REQUEST);
    }
}
