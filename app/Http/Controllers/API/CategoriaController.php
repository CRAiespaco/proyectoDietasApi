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
    public function index()
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
            "nombre"=>'required'
        ]);
        if($validacion->fails()){
            return response("La categoría no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $categoria = new Categoria();
            $categoria->nombre=$request['nombre'];
            $categoria->save();

            return response()->json([
                "mensaje"=>'Categoría creada correctamente',
                'categoria'=>$categoria
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Categoria::all()->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, Request $request)
    {
        $categoria = Categoria::find($id);
        if($categoria) {
            $categoria->nombre = $request['nombre'];
            $categoria->save();
            return response()->json([
                "mensaje"=>"Categoria actualizada correctamente",
                "categoria"=>$categoria
            ]);
        }else{
            return response('La categoría no existe',Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        $categoria = Categoria::find($id);
        if($categoria){
            $categoria->delete();
            return response()->json([
                "mensaje"=>"Se ha borrado correctamente",
                "categoria"=>$categoria
            ]);
        }else{
            return response()->json('La categoría no existe',Response::HTTP_BAD_REQUEST);
        }
    }

}
