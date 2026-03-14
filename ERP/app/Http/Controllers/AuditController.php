<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    /**
     * Mostra a listagem de todas as auditorias paginada.
     */
    public function index(Request $request)
    {
        // Embora a rota já esteja protegida pelo middleware Spatie ('permission:view audit'),
        // por segurança adicional também podemos chamar um Gate se ele existir, mas aqui o middleware é suficiente.
        
        $query = Audit::with('user');

        // Text Search
        $query->when($request->input('search'), function ($q, $search) {
            $q->where('event', 'like', "%{$search}%")
              ->orWhere('auditable_type', 'like', "%{$search}%")
              ->orWhereHas('user', function ($uq) use ($search) {
                  $uq->where('name', 'like', "%{$search}%");
              });
        });

        // Date Filter (Syncing with TiposContacto structure)
        $query->when($request->input('dateRange'), function ($q, $range) {
            $days = match ((int)$range) {
                0 => 0,
                1 => 7,
                2 => 30,
                3 => 365,
                default => null
            };
            if ($days !== null) {
                return $q->where('created_at', '>=', now()->subDays($days)->startOfDay());
            }
        });

        // Dynamic Sorting
        $sortField = $request->input('sortField', 'created_at');
        $sortDirection = $request->input('sortDirection', 'desc');

        $allowedSorts = ['id', 'user_id', 'event', 'auditable_type', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        $audits = $query->paginate(15)->withQueryString();

        return Inertia::render('Auditoria/Index', [
            'audits' => $audits,
            'filters' => $request->only(['search', 'sortField', 'sortDirection', 'dateRange']),
        ]);
    }
}
