<?php

namespace App\Http\Controllers\API;

use App\Models\Horario;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Horario::all());
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
            "fecha"=>"Date",
        ]);
        if($validacion->fails()){
            return response("El horario no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $horario = new Horario();
            $horario->fecha=$request['fecha'];
            $horario->save();

            $respuesta = [
                "mensaje"=>'Horario creado correctamente',
                'Horario'=>$horario
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
    public function show(Horario $horario)
    {
        return response(Horario::with('receta')->find($horario->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $horario)
    {
        $validacion=Validator::make((array)$request,[
            "fecha"=>"Date",
        ]);

        if($validacion->fails()){
            return response("El horario no se pudo modificar");
        }else{
            $horario = new Horario();
            $horario->fecha=$request['fecha'];
            $horario->save();

            return response()->json($horario);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Horario $horario)
    {
        Horario::destroy($horario);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "Horario"=>$horario
        ],Response::HTTP_BAD_REQUEST);
    }
}
