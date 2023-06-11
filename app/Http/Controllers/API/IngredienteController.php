<?php

namespace App\Http\Controllers\API;


use App\Models\ingrediente;
use App\Models\TotalNutricion;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class IngredienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Ingrediente::all());
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
            "nombre"=>"required|string",
            "imagen"=>"required|string"
        ]);
        if(false){
            return response("El ingrediente no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            //$imagen = $request->file('imagen');
            //$ruta = $imagen->store('ingredientes','public')
            $ingrediente = new Ingrediente();
            $ingrediente->nombre=$request['nombre'];
            $ingrediente->imagen=$request['imagen'];


            /*$this->attachIngradienteTotalNutricion($request,$ingrediente,$request['totalNutricional']);
            $ingrediente->peso=$request['peso'];*/
            $ingrediente->save();

            $respuesta = [
                "mensaje"=>'Ingrediente creado correctamente',
                'ingrediente'=>$ingrediente
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
    public function show(int $id)
    {
        return response(Ingrediente::find($id));
        /*return response(Ingrediente::with('totalNutricion')->find($id));*/
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
        $ingrediente = Ingrediente::find($id);
        if($ingrediente){
            $validacion = Validator::make($request->all(),[
                "nombre"=>"required|string",
                "imagen"=>"string"
            ]);

            if($validacion->fails()){
                return response("El ingrediente no se pudo modificar",Response::HTTP_BAD_REQUEST);
            }else{
                $ingrediente->nombre=$request['nombre'] ?? $ingrediente->nombre;
                $ingrediente->imagen=$request['imagen'] ?? $ingrediente->imagen;
                //$this->attachIngradienteTotalNutricion($ingrediente,$request['totalNutricional']);
                //$ingrediente->peso=$request['peso'];
                $ingrediente->save();

                return response()->json([
                    "mensaje"=>"Ingrediente actualizado correctamente",
                    "ingrediente"=>$ingrediente
                ]);
            }
        }else{
            return response()->json('El ingrediente no existe',Response::HTTP_BAD_REQUEST);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $ingrediente = Ingrediente::find($id);
        if($ingrediente){
            $ingrediente->receta()->detach();
            $ingrediente->delete();
            return response()->json([
                "mensaje"=>"Se ha borrado correctamente",
                "ingrediente"=>$ingrediente
            ],Response::HTTP_ACCEPTED);
        }else{
            return response()->json('El ingrediente no existe',Response::HTTP_BAD_REQUEST);
        }

    }

    public function attachIngradienteTotalNutricion(Ingrediente $ingrediente, TotalNutricion $totalNutricion){
        $ingrediente->totalNutricion()->attach($totalNutricion);
        return resolve($ingrediente);
    }

    public function getUrlImagen(string $nombre){
        $ruta = public_path('ingredientes');

        $archivosEncontrados = glob($ruta . '/*' . $nombre . '.*');
        if (!empty($archivosEncontrados)) {
            $archivoEncontrado = str_replace('\\','/',$archivosEncontrados[0]);
            $pathInvertido = str_replace('\\','/',public_path());
            $rutaCompleta = asset(str_replace($pathInvertido, '', $archivoEncontrado));

            return $rutaCompleta;
            // Resto del código...
        }else{
            return response('La imagen que buscas no se encuentra',404);
        }
    }

}
