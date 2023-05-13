<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function register(Request $request){
        $usuario = new User();

        $usuario->name = $request['usuario'];
        $usuario->email = $request['email'];
        $usuario->password = $request['password'];
        $usuario->save();

        Auth::login($usuario);

        return response()->json([
            "Mensaje"=>"Usuario Logeado",
            "Usuario"=>$usuario,

        ],Response::HTTP_ACCEPTED);
    }

    public function login(Request $request){

    }

    public function logout(Request $request){

    }
}
