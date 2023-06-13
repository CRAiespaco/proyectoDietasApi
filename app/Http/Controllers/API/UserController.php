<?php

namespace App\Http\Controllers\API;

use App\Models\ingrediente;
use App\Models\Receta;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(User::all());
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
            $usuario = new User();
            $usuario->nombre=$request['nombre'];
            $usuario->correo=$request['correo'];
            $usuario->contrasenya=$request['contrasenya'];
            $this->attachIngradienteUsuario($request,$usuario,$request['ingradientes']);
            $this->attachRecetaUsuario($request,$usuario,$request['recetas']);
            $usuario->save();

            $respuesta = [
                "mensaje"=>'Usuario creado correctamente',
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
    public function show($id)
    {
        if($id == 0) return \response('El usuario no ha iniciado sesion',403);
        return response(User::with('recetas','ingredientes')->find($id));
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
            $usuario = new User();
            $usuario->nombre=$request['nombre'];
            $usuario->correo=$request['correo'];
            $usuario->contrasenya=$request['contrasenya'];
            //$this->attachIngradienteUsuario($usuario,$request['ingradientes']);
            $this->attachRecetaUsuario($usuario,$request['recetas']);
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
    public function destroy(User $usuario)
    {
        User::destroy($usuario);
        return response()->json([
            "mensaje"=>"Se ha borrado correctamente",
            "usuario"=>$usuario
        ],Response::HTTP_BAD_REQUEST);
    }

    public function register(Request $request){
        //Validar los datos

        $usuario = new User();
        $usuario->name = $request['nombre'];
        $usuario->email = $request['email'];
        $usuario->password = Hash::make($request['password']);
        $usuario->save();

        //Autenticar el usuario.
        Auth::login($usuario);
        $role = Role::findByName('user');
        $usuario->assignRole($role);

        //Nombre del token.
        $token = $usuario->createToken('auth:api')->plainTextToken;

        return \response()->json([
            'mensaje'=>'Registro hecho correctamente',
            "token"=>$token,
            "usuario"=>$usuario,
        ]);
    }


    public function login(Request $request){
        $credenciales = $request->only('email','password');
        if(Auth::attempt($credenciales)){
            $user = Auth::user();
            $token = $user->createToken('auth:api')->plainTextToken;
            if($user->hasRole('user')){
                return \response()->json([
                    'mensaje'=>'Login exitoso',
                    'user'=>$user,
                    'token'=>$token
                ]);
            }else {
                return \response('No tienes permiso para iniciar sesion.',401);
            }
        }else{
            return response('No se ha podido iniciar sesion', 401);
        }
    }


    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

    }

    public function attachIngradienteUsuario(Ingrediente $ingrediente, User $usuario){
        $usuario->ingredientes()->attach($ingrediente);
        return resolve($usuario);
    }

    public function denvincularReceta(Receta $receta,User $usuario){
        $usuario->recetas()->detach($receta->id);
        return $this->show($receta->id);
    }

    public function comprobarReceta(Receta $receta, User $usuario ){
        $recetaComprobar = $usuario->recetas()->where('receta_id', $receta->id)->first();
        if($recetaComprobar){
            return true;
        }else{
            return false;
        }
    }

    public function attachRecetaUsuario(Receta $receta, User $usuario){
        $usuario->recetas()->attach($receta);
        return response($usuario);
    }
}
