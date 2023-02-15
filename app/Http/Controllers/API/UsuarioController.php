<?php

namespace App\Http\Controllers\API;

use App\Models\ingrediente;
use App\Models\Receta;
use App\Models\Usuario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Usuario::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validacion = Validator::make($request->all(),[
            "nombre"=>"string",
            "Correo"=>"string","required",
            "contrasenya"=>"string","required",
            "validacion"=>"boolean",
        ]);
        if($validacion->fails()){
            return \response("La usuario no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $usuario = new Usuario();
            $usuario->nombre=$request['nombre'];
            $usuario->correo=$request['correo'];
            $usuario->contrasenya=$request['contrasenya'];
            $this->attachIngradienteUsuario($request,$usuario,$request['ingradientes']);
            $this->attachRecetaUsuario($request,$usuario,$request['recetas']);
            $usuario->save();

            $respuesta = [
                "mensaje"=>'ingrediente creado correctamente',
                'usuario'=>$usuario
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
    public function show($usuario)
    {
        return response(Usuario::with('recetas','ingredientes')->find($usuario->id));
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
        $validacion=Validator::make((array)$request,[
            "nombre"=>"string",
            "Correo"=>"string","required",
            "contrasenya"=>"string","required",
            "objetivo"=>"string",
            "validacion"=>"boolean",
        ]);

        if($validacion->fails()){
            return response("La usuario no ha podido ser almacenada",Response::HTTP_BAD_REQUEST);
        }else{
            $usuario = new Usuario();
            $usuario->nombre=$request['nombre'];
            $usuario->correo=$request['correo'];
            $usuario->contrasenya=$request['contrasenya'];
            $this->attachIngradienteUsuario($request,$usuario,$request['ingradientes']);
            $this->attachRecetaUsuario($request,$usuario,$request['recetas']);
            $usuario->save();

            $respuesta = [
                "mensaje"=>'ingrediente creado correctamente',
                'usuario'=>$usuario
            ];

            return response()->json($respuesta);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        Usuario::destroy($usuario);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "usuario"=>$usuario
        ],Response::HTTP_BAD_REQUEST);
    }

    public function register(Request $request){
        //Validar los datos

        $usuario = new User();
        $usuario->name = $request['name'];
        $usuario->email = $request['email'];
        $usuario->password = Hash::make($request['password']);

        $usuario->save();

        Auth::login($usuario);

        return $usuario;
    }
    public function login(Request $request){

    }
    public function logout(Request $request){

    }

    public function attachIngradienteUsuario(Request $request, Ingrediente $ingrediente, Usuario $usuario){
        $usuario->Ingrediente()->attach($ingrediente);
        return resolve($usuario);
    }

    public function attachRecetaUsuario(Request $request, Receta $receta, Usuario $usuario){
        $usuario->Receta()->attach($receta);
        return resolve($usuario);
    }
}
