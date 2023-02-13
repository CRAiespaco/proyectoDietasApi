<?php

namespace App\Http\Controllers\API;

use App\Models\Categoria;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response(Categoria::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(),[
            "tipo"=>'required'
        ]);
        if($validacion->fails()){
            return response("La categoria no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $categoria = new Categoria();
            $categoria->tipo=$request['tipo'];
            $categoria->save();

            //Categoria::create($request->tipo);

            $respuesta=[
                "mensaje"=>'Categoria creada correctamente',
                'Categoria'=>$categoria
            ];

            return redirect ('/receta')->withCookie();
            return response()->json($respuesta);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($categoria)
    {
        return response(Categoria::all()->find($categoria->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $categoria)
    {
        $validacion = Validator::make($request->all(),[
            "tipo"=>'required'
        ]);
        if($validacion->fails()){
            return response("La categoria no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $categoria = new Categoria();
            $categoria->tipo=$request['tipo'];
            $categoria->save();

            $respuesta = [
                "mensaje"=>'Receta creada correctamente',
                'Categoria'=>$categoria
            ];

            return response()->json($respuesta);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($categoria)
    {
        Categoria::destroy($categoria);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "Categoria"=>$categoria
        ],Response::HTTP_BAD_REQUEST);
    }
}
