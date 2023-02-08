<?php

namespace App\Http\Controllers\API;

use App\Models\Categoria;
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
        Categoria::with('recetas')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return redirect ('/receta')->withCookie();

        $validacion = Validator::make($request->all(),[
            'arroz'=>'string',
            'bebidas'=>'string',
            'carnes'=>'string',
            'dulces'=>'string',
            'ensaladas'=>'string',
            'mariscos'=>'string',
            'legumbres&cereales'=>'string',
            'pescados'=>'string',
            'pizzas'=>'string',
            'setas'=>'string',
            'verduras&frutas'=>'string',
            'sopas&cremas'=>'string',
            'huevos'=>'string',
            'pasta'=>'string',
            'lacteos'=>'string',
        ]);
        if($validacion->fails()){
            return \response("La categoria no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $categoria = new Categoria();
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
    public function show($id)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
