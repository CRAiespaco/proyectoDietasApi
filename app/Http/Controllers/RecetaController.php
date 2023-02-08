<?php

namespace App\Http\Controllers;

use App\Models\ingrediente;
use App\Models\Receta;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class RecetaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Receta::all());
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
            "valoracion"=>"decimal:0,2",
            "pasosASeguir"=>"required",
            "ingredientes"=>"required",
            "imagen"=>"string",
            "validacion"=>"boolean",
        ]);
        if($validacion->fails()){
            return \response("La receta no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $receta = new Receta();
            $receta->nombre=$request['nombre'];
            $receta->valoracion=$request['valoracion'];
            $receta->pasosASeguir=$request['pasosASeguir'];
            $receta->ingredientes=$request['ingredientes'];
            $receta->fechaCreacion=$request['fechaCreacion'];
            $receta->imagen=$request['imagen'];
            $receta->creado=$request['creado'];
            $receta->validacion=$request['validacion'];

            $receta->save();

            $respuesta = [
                "mensaje"=>'Receta creada correctamente',
                'Receta'=>$receta
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
    public function show(Receta $receta)
    {
        return response(Receta::with('categorias','ingredientes')->find($receta->id));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Receta $receta)
    {
        Receta::destroy($receta);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "receta"=>$receta
        ],Response::HTTP_BAD_REQUEST);
    }
}
