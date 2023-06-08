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

    public function getRecetasPublic(){
        return response(Receta::where('validacion',true)->get());
    }
    //Receta --> join ingrediente --> gruoup by id_Receta sum kcal
    public function getRecetasByKcal(int $kcal){

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

            //Asociamos la cantidad a la receta.
            foreach ($request['ingredientes'] as $ingrediente){
                $recetaGuardada->ingredientes()->attach($ingrediente['id'],['cantidad'=>$ingrediente['cantidad']]);
            }

            //Asociamos las categorias a la receta.
            foreach ($request['categorias'] as $categoria){
                $recetaGuardada->categorias()->attach($categoria['id']);
            }

            $recetaGuardada->save();

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
    public function show(int $id)
    {
        return response(Receta::with('categorias','ingredientes')->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(int $id,Request $request)
    {
        $reglas = [
            'nombre' => 'string|max:255',
            "valoracion"=>"numeric",
            "pasosASeguir"=>"string",
            "ingredientes"=>"",
            "imagen"=>"string",
        ];

        $receta = Receta::find($id);

        if($receta){
            $validacion=Validator::make((array)$request,$reglas);

            if($validacion->passes()){
                $receta->nombre=$request['nombre'] ?? $receta->nombre;
                $receta->valoracion= $request['valoracion'] ?? $receta->valoracion;
                $receta->pasosASeguir= $request['pasosASeguir'] ?? $receta->pasosASeguir;
                $receta->imagen=$request['imagen'] ?? $receta->imagen;
                $receta->validacion=$request['validacion'] ?? $receta->validacion;
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
     *TODO: Ver el delete no funciona por las claves ajenas.
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $receta = Receta::find($id);

        if($receta){
            //Primero se quitan todas las relaciones y despues se elimina la receta.
            $receta->ingredientes()->detach();
            $receta->categorias()->detach();
            $receta->usuario()->dissociate();
            $receta->delete();
            return \response()->json([
                "mensaje"=>"La receta se ha eliminado correctamente",
                "receta"=>$receta

            ],Response::HTTP_ACCEPTED);
        }else{
            return response()->json([
                "mensaje" => "La receta no existe",
                "receta" => $receta
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function buscarPorPalabraClave(Request $request){
        $palabraClave = $request->input('titulo');
        $recetas = Receta::where('nombre','like','%'.$palabraClave.'%')->get();
        return \response()->json($recetas);
    }


    public function attachRecetaUsuario(Request $request, Receta $receta, Usuario $usuario){
        $receta->usuario()->attach($usuario);
        return response('Se ha relacionado correctamente',Response::HTTP_ACCEPTED);
    }

    public function validarReceta ($id,$validacion){
        $boolvalidacion = filter_var($validacion,FILTER_VALIDATE_BOOLEAN);
        $receta = Receta::find($id);
        $receta->validacion = $boolvalidacion;
        $receta->save();

        return response()->json([
            "mensaje"=>"Receta activada correctamente",
            "receta"=>$receta,
        ],Response::HTTP_ACCEPTED);
    }

    public function filtrarRecetas(Request $request){
        $categorias = $request['categorias'];
        $ingredientes = $request['ingredientes'];

        $recetas = Receta::with('categorias','ingredientes')
            ->when(count($categorias) != 0, function ($query) use ($categorias){
                $query->whereHas('categorias', function ($query) use ($categorias) {
                    $query->whereIn('categorias.id', $categorias);
                });
            })
            ->when( count($ingredientes) != 0, function ($query) use($ingredientes){
                $query->whereHas('ingredientes',function ($query) use ($ingredientes){
                    $query->whereIn('ingredientes.id',$ingredientes);
                });
            })
            ->get();

        return response()->json($recetas);
    }

    public function ultimasRecetas(){
        $ultimas = Receta::with('ingredientes')->latest()->limit(5)->get();
        return \response($ultimas);
    }

}
