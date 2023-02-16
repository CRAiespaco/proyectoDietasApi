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
            "nombre"=>"required",
            "valoracion"=>"required",
            "pasosASeguir"=>"required",
            "ingredientes"=>"required",
            "imagen"=>"string",
        ]);
        if($validacion->fails()){
            return \response()->json([
                "Error"=>"No se ha podido almacenar",
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

            $this->anyadirIngredientes($request['ingredientes'],$receta);

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
    public function update(Request $request)
    {
        $reglas = [
            'nombre' => 'string|max:255',
            "valoracion"=>"numeric",
            "pasosASeguir"=>"string",
            "ingredientes"=>"string",
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

    public function attachRecetaIngrediente(Ingrediente $ingrediente, Receta $receta){
        $receta->ingredientes()->attach($ingrediente);
        return \response('Se ha relacionado correctamente',Response::HTTP_ACCEPTED);
    }

    public function attachRecetaUsuario(Request $request, Receta $receta, Usuario $usuario){
        $receta->usuario()->attach($usuario);
        return response('Se ha relacionado correctamente',Response::HTTP_ACCEPTED);
    }

    public function paginaError(){
        return redirect('/not_found',Response::HTTP_NOT_FOUND);
    }

    public function anyadirIngredientes(array $ingredientes, Receta $receta){
        foreach($ingredientes as $ingredienteArray => $ingrediente){
            $validacion = Validator::make($ingrediente, [
                'nombre' => 'required|string|max:255',
                'imagen' => 'required|string|max:255'
            ]);
            if(!$validacion->fails()){
                $ingredienteComprobar = new Ingrediente();

                $ingredienteComprobar->nombre = $ingrediente['nombre'];
                $ingredienteComprobar->imagen = $ingrediente['imagen'];
                if($ingredienteanyadir = Ingrediente::comprobarIngrediente($ingredienteComprobar)) {
                    $this->attachRecetaIngrediente($ingredienteanyadir,$receta);
                }else{
                    $ingredienteComprobar->save();
                    $this->attachRecetaIngrediente($ingredienteComprobar,$receta);
                }
            }else{
                return response('Los datos de los ingredientes son incorrectos',Response::HTTP_BAD_REQUEST);
            }
        }
    }
}
