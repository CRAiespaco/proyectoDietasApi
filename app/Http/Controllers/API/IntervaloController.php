<?php

namespace App\Http\Controllers\API;

use App\Models\Intervalo;
use App\Models\Receta;

class IntervaloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Intervalo::all());
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
            "horaInicio"=>"Time",
            "horaFinal"=>"Time",
            "nombre"=>"string",
        ]);
        if($validacion->fails()){
            return response("La Intervalo no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $intervalo = new Intervalo();
            $intervalo->horaInicio=$request['horaInicio'];
            $intervalo->horaFinal=$request['horaFinal'];
            $intervalo->nombre=$request['nombre'];
            $this->attachIntervaloReceta($request,$intervalo,$request['receta']);
            $intervalo->save();

            $respuesta = [
                "mensaje"=>'Intervalo creado correctamente',
                'Intervalo'=>$intervalo
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
    public function show(Intervalo $intervalo)
    {
        return response(Intervalo::with('receta')->find($intervalo->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $intervalo)
    {
        $validacion=Validator::make((array)$request,[
            "horaInicio"=>"Time",
            "horaFinal"=>"Time",
            "nombre"=>"string",

        ]);

        if($validacion->fails()){
            return response("La receta no se pudo modificar");
        }else{
            $intervalo = new Intervalo();
            $intervalo->horaInicio=$request['horaInicio'];
            $intervalo->horaFinal=$request['horaFinal'];
            $intervalo->nombre=$request['nombre'];
            $this->attachIntervaloReceta($request,$intervalo,$request['receta']);
            $intervalo->save();

            return response()->json($intervalo);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Intervalo $intervalo)
    {
        Intervalo::destroy($intervalo);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "Intervalo"=>$intervalo
        ],Response::HTTP_BAD_REQUEST);
    }

    public function attachIntervaloReceta(Request $request, Intervalo $intervalo, Receta $receta){
        $intervalo->Receta()->attach($receta);
        return resolve($intervalo);
    }
}
