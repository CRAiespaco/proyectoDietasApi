<?php

namespace App\Http\Controllers\API;

use App\Models\Objetivo;

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
            return response("La ingrediente no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $objetivo = new Objetivo();
            $objetivo->edad=$request['edad'];
            $objetivo->altura=$request['altura'];
            $objetivo->peso=$request['peso'];

            $this->attachIngradienteTotalNutricion($request,$objetivo,$request['totalNutricional']);
            $objetivo->save();

            $respuesta = [
                "mensaje"=>'ingrediente creado correctamente',
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
    public function show(Ingrediente $objetivo)
    {
        return response(Ingrediente::with('totalNutricion')->find($objetivo->id));
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
            "valoracion"=>"decimal:0,2",
            "pasosASeguir"=>"required",
            "ingredientes"=>"required",
            "imagen"=>"string",
            "validacion"=>"boolean",
        ]);

        if($validacion->fails()){
            return response("La receta no se pudo modificar");
        }else{
            $objetivo = new Objetivo();
            $objetivo->edad=$request['edad'];
            $objetivo->altura=$request['altura'];
            $objetivo->peso=$request['peso'];
            $this->attachIngradienteTotalNutricion($request,$objetivo,$request['totalNutricional']);
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
    public function destroy(Ingrediente $objetivo)
    {
        Ingrediente::destroy($objetivo);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "Ingrediente"=>$objetivo
        ],Response::HTTP_BAD_REQUEST);
    }

}
