<?php

namespace App\Http\Controllers\API;

use App\Models\Objetivo;
use http\Env\Request;

class ObjetivoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Objetivo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(),[
            "edad"=>"int",
            "altura"=>"decimal:0,2",
            "peso"=>"decimal:0,2",
        ]);
        if($validacion->fails()){
            return response("El objetivo no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $objetivo = new Objetivo();
            $objetivo->edad=$request['edad'];
            $objetivo->altura=$request['altura'];
            $objetivo->peso=$request['peso'];
            $objetivo->tipoObjetivo=$request['tipoObjetivo'];//Mirar como se hace bien
            $objetivo->save();

            $respuesta = [
                "mensaje"=>'Objetivo creado correctamente',
                'Ingrediente'=>$objetivo
            ];

            return response()->json($respuesta);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Objetivo $objetivo)
    {
        return response(Objetivo::with('totalNutricion')->find($objetivo->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $objetivo)
    {
        $validacion=Validator::make((array)$request,[
            "edad"=>"int",
            "altura"=>"decimal:0,2",
            "peso"=>"decimal:0,2",
        ]);

        if($validacion->fails()){
            return response("El objetivo no se pudo modificar");
        }else{
            $objetivo = new Objetivo();
            $objetivo->edad=$request['edad'];
            $objetivo->altura=$request['altura'];
            $objetivo->peso=$request['peso'];
            $objetivo->tipoObjetivo=$request['tipoObjetivo'];
            $objetivo->save();

            return response()->json($objetivo);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Objetivo $objetivo)
    {
        Objetivo::destroy($objetivo);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "Ingrediente"=>$objetivo
        ],Response::HTTP_BAD_REQUEST);
    }


    public function sacarGramos(Request $request){
        $peso = $request['peso'];
        $tipoObjetivo = $request['tipoObjetivo'];
        $ejercicio = $request['ejercicio'];
        $progresion = $request['progresion'];
        $kcalDiaria = $peso * 22 * $ejercicio;
        $numPorcentaje =  ObjetivoController::porcentajeProgresion($tipoObjetivo,$progresion);
        $porcentaje =  ($kcalDiaria /100)  * $numPorcentaje;
        $kcalTotal = 0;
        if($tipoObjetivo == 'subir') $kcalTotal = $kcalDiaria + $porcentaje;
        else if($tipoObjetivo == 'bajar') $kcalTotal = $kcalDiaria - $porcentaje;
        return $kcalTotal;
    }

    public static function porcentajeProgresion($tipoObjetivo,$progresion){
        $resultado = 0;
        if($tipoObjetivo == 'subir'){
            switch ($progresion){
                case 'lento':
                    $resultado = 10;
                    break;
                case 'medio':
                    $resultado = 15;
                    break;
                case 'rapido':
                    $resultado = 20;
                    break;
            }
        }else if($tipoObjetivo == 'bajar'){
            switch ($progresion){
                case 'lento':
                    $resultado = 10;
                    break;
                case 'medio':
                    $resultado = 20;
                    break;
                case 'rapido':
                    $resultado = 30;
                    break;
            }
        }
        return $resultado;
    }


}
