<?php

namespace App\Http\Controllers\API;

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
        return response(Receta::with('categorias','ingredientes')->get());
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
            "nombre"=>"required|string",
            "valoracion"=>"required",
            "pasosASeguir"=>"required|string",
            "ingredientes"=>"required",
            "imagen"=>"string",
        ]);
        if($validacion->fails()){
            return \response()->json([
                "Error"=>"La receta no se ha podido almacenar",
                "fallo"=>$validacion,
                "Objeto"=>$request->all(),
            ],Response::HTTP_BAD_REQUEST);
        }else{
            $receta = new Receta();
            $receta->nombre=$request['nombre'];
            $receta->valoracion=$request['valoracion'];
            $receta->pasosASeguir=$request['pasosASeguir'];
            $receta->imagen=$request['imagen'];
            $receta->validacion=$request['validacion'];
            $receta->fechaCreacion= new \DateTime();
            $receta->save();

            //Recuperar instancia de la base de datos
            $recetaGuardada = Receta::find($receta->id);

            foreach ($request['ingredientes'] as $ingrediente){
                $recetaGuardada->ingredientes()->attach($ingrediente['id'],['cantidad'=>$ingrediente['cantidad']]);
            }

            $respuesta = [
                "mensaje"=>'Receta creada correctamente',
                'receta'=>$receta,
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
    public function update(Request $request)
    {
        $reglas = [
            'nombre' => 'string|max:255',
            "valoracion"=>"numeric",
            "pasosASeguir"=>"string",
            "ingredientes"=>"",
            "imagen"=>"string",
        ];

        $receta = Receta::find($request['id']);

        if($receta){
            $validacion=Validator::make((array)$request,$reglas);

            if($validacion->passes()){
                $receta->nombre=$request['nombre'] ?? $receta->nombre;
                $receta->valoracion= $request['valoracion'] ?? $receta->valoracion;
                $receta->pasosASeguir= $request['pasosASeguir'] ?? $receta->pasosASeguir;
                $receta->imagen=$request['imagen'] ?? $receta->imagen;
                $receta->validacion=$request['validacion'] ?? $receta->validacion;
                $receta->fechaCreacion= $receta->fechaCreacion;
                $receta->save();

                return \response()->json([
                    "mensaje"=>"La receta se ha actualizado correctamente",
                    "receta"=>$receta
                ],Response::HTTP_ACCEPTED);
            }else{
                return \response('Los datos introducidos son incorrectos',Response::HTTP_BAD_REQUEST);
            }
        }else{
            return \response('La receta que intentas actualizar no existe',Response::HTTP_BAD_REQUEST);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        $receta = Receta::find($request['id']);
        if($receta){
            Receta::destroy($request['id']);
            return \response()->json([
                "mensaje"=>"La receta ha sido eliminada correctamente",
                "receta"=>$receta
            ],Response::HTTP_ACCEPTED);
        }
    }

    public function buscarPorPalabraClave(Request $request){
        $palabraClave = $request->input('titulo');
        $recetas = Receta::where('nombre','like','%'.$palabraClave.'%')->get();
        return \response()->json($recetas);
    }

    public function attachRecetaIngrediente(Ingrediente $ingrediente, Receta $receta){
        $receta->ingredientes()->attach($ingrediente);
        return \response('Se ha relacionado correctamente',Response::HTTP_ACCEPTED);
    }


    public function attachRecetaUsuario(Request $request, Receta $receta, Usuario $usuario){
        $receta->usuario()->attach($usuario);
        return response('Se ha relacionado correctamente',Response::HTTP_ACCEPTED);
    }

}
