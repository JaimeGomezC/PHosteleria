<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use GuzzleHttp\Psr7\Message;
use \stdClass;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator= Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:8'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token= $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data'=>$user,'access_token'=>$token,'token_type'=>'Bearer',]);

    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=>'Email o password incorrectos'],401);
        }
        $user=User::where('email',$request['email'])->firstOrFail();
        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'result'=>'ok',
            'message'=>'Hola'.$user->name,
            'accessToken'=>$token,
            'token_type'=>'Bearer',
            'user'=>$user,
        ]);
    }

    public function logout(Request $request)
    {   
       
        $accessToken = $request->bearerToken();
        $saluda='hola';
        echo ($accessToken);
         $token = PersonalAccessToken::findToken($accessToken);
        if($token){
            $token->delete();
            return response()->json(['result'=>'ok','message'=>'logged out correcto, token eliminado']);
        }else{
            return response()->json(['result'=>'false','message'=>'No existe el token2 ','token'=>$request]);
        }
        
    }
}
