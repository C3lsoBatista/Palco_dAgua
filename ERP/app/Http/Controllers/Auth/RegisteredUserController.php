<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Exibe a vista de registo.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Manipula um pedido de registo de entrada.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Dispara o evento de registo (que pode enviar o mail para o Admin)
        event(new Registered($user));

        // SENIOR PRACTICE: Não autenticamos o utilizador imediatamente.
        // Redirecionamos para o login com uma mensagem informativa.
        return redirect()->route('login')->with('status', 'Conta criada com sucesso! Aguarde a validação do administrador para poder aceder.');
    }
}