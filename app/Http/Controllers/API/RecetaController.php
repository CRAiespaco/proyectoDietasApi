<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\Contr;
use App\Http\Controllers\Requests;
use App\Models\ingrediente;
use App\Models\Receta;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

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
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
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
            $this->attachRecetaIngrediente($request,$receta,$request['ingrediente']);
            $receta->fechaCreacion=$request['fechaCreacion'];
            $receta->imagen=$request['imagen'];
            $this->attachRecetaUsuario($request,$receta,$request['creado']);
            $receta->validacion=$request['validacion'];

            $receta->save();

            //Receta::create($request->all());

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
    public function update(Request $request, Receta $receta)
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
            $receta->nombre=$request['nombre'];
            $receta->valoracion=$request['valoracion'];
            $receta->pasosASeguir=$request['pasosASeguir'];
            $this->attachRecetaIngrediente($request,$receta,$request['ingrediente']);
            $receta->fechaCreacion=$request['fechaCreacion'];
            $receta->imagen=$request['imagen'];
            $this->attachRecetaUsuario($request,$receta,$request['creado']);
            $receta->validacion=$request['validacion'];

            $receta->save();

            return \response()->json($receta);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Receta $receta)
    {
        Receta::destroy($receta);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "receta"=>$receta
        ],Response::HTTP_BAD_REQUEST);
    }

    public function attachRecetaIngrediente(Request $request, Receta $receta, Ingrediente $ingrediente){
        $receta->ingrediente()->attach($ingrediente);
        return resolve($receta);
    }

    public function attachRecetaUsuario(Request $request, Receta $receta, Usuario $usuario){
        $receta->usuario()->attach($usuario);
        return resolve($usuario);
    }

    public function paginaError(){
        return redirect('/not_found',Response::HTTP_NOT_FOUND);
    }
}
