<?php

namespace App\Http\Controllers;

use App\Models\TipoContacto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;

class TipoContactoController extends Controller
{
    /**
     * Lista registos com paginação e contagens eficientes para MariaDB 11.
     */
    public function index(Request $request)
    {
        Gate::authorize('tipos-contacto.visualizar');

        $query = TipoContacto::withTrashed();

        // Filtro de Tabs
        $query->when($request->input('tab'), function ($q, $tab) {
            return match ($tab) {
                'Ativos'    => $q->where('ativo', true)->whereNull('deleted_at'),
                'Inativo'   => $q->where('ativo', false)->whereNull('deleted_at'),
                'Arquivado' => $q->onlyTrashed(),
                default     => $q->whereNull('deleted_at'),
            };
        }, fn($q) => $q->whereNull('deleted_at'));

        // Filtro de Data
        $query->when($request->input('dateRange'), function ($q, $range) {
            $days = match ((int)$range) {
                0 => 0,
                1 => 7,
                2 => 30,
                3 => 365,
                default => null
            };
            if ($days !== null) {
                return $q->where('created_at', '>=', Carbon::now()->subDays($days)->startOfDay());
            }
        });

        return Inertia::render('TiposContacto/Index', [
            'tipos'   => $query->orderBy('nome')->paginate(10)->withQueryString(),
            'filters' => $request->only(['tab', 'dateRange']),
            'counts'  => [
                'Todos'     => TipoContacto::whereNull('deleted_at')->count(),
                'Ativos'    => TipoContacto::whereNull('deleted_at')->where('ativo', true)->count(),
                'Inativo'   => TipoContacto::whereNull('deleted_at')->where('ativo', false)->count(),
                'Arquivado' => TipoContacto::onlyTrashed()->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('tipos-contacto.gerir');

        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:tipos_contacto,nome',
        ]);

        TipoContacto::create(['nome' => $validated['nome'], 'ativo' => true]);

        return redirect()->back()->with('success', 'Tipo de contacto criado!');
    }

    public function update(Request $request, TipoContacto $tipos_contacto)
    {
        Gate::authorize('tipos-contacto.gerir');

        $validated = $request->validate([
            'nome'  => 'required|string|max:255|unique:tipos_contacto,nome,' . $tipos_contacto->id,
            'ativo' => 'required|boolean',
        ]);

        $tipos_contacto->update($validated);

        return redirect()->back()->with('success', 'Registo atualizado!');
    }

    public function toggleActive(TipoContacto $tipos_contacto)
    {
        Gate::authorize('tipos-contacto.gerir');

        $tipos_contacto->update(['ativo' => !$tipos_contacto->ativo]);

        return redirect()->back()->with('success', 'Estado alterado com sucesso!');
    }

    public function destroy(TipoContacto $tipos_contacto)
    {
        Gate::authorize('tipos-contacto.gerir');

        $tipos_contacto->delete();
        return redirect()->back()->with('success', 'Registo arquivado!');
    }

    public function restore($id)
    {
        Gate::authorize('tipos-contacto.restaurar');

        $tipo = TipoContacto::onlyTrashed()->findOrFail($id);
        $tipo->restore();

        return redirect()->back()->with('success', 'Registo recuperado!');
    }
}
