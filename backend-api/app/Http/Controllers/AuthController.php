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

    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['result' => 'ok',
        'data' => $user], 200);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer',]);

    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Email o password incorrectos'], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'result' => 'ok',
            'message' => 'Hola' . $user->name,
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'user' => $user->id,
        ]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->bearerToken();
        $token = PersonalAccessToken::findToken($accessToken); //$token->getAttribute('tokenable_id')
        $personalAccessToken = PersonalAccessToken::where('tokenable_id', $token->getAttribute('tokenable_id'))->get();
        if ($token) {
            foreach ($personalAccessToken as $token) {
                $user = $token->user;
                $token->delete();
                // Delete files associated with the $user model
            }
            return response()->json(['result' => 'ok', 'message' => 'logged out correcto, token eliminado' . $personalAccessToken]);
        } else {
            return response()->json(['result' => 'false', 'message' => 'No existe el token2 ', 'token' => $request]);
        }
    }

    public function update(Request $request, $id)
    {
        

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
       
        $user->save();
        $data = [
            'result' => 'ok',
            'message' => 'Usuario Creado',
            'turno' => $user
        ];
        return response()->json($data);
    }
}