<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $token = $user->createToken("JWT");

            return response()->json($token->plainTextToken, 200);
        }

        // Se a autenticação falhar, você pode retornar uma resposta de erro
        return response()->json(['error' => 'Credenciais inválidas'], 401);
    }

    public function register(Request $request)
    {
        // Validar os dados do usuário
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Criar um novo usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Logar automaticamente o novo usuário
        Auth::login($user);

        // Criar e retornar um token para o novo usuário
        $token = $user->createToken("JWT");

        return response()->json($token->plainTextToken, 201);
    }
}
