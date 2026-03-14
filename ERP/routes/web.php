<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuditController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard'); 
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Administration ---
    Route::middleware(['permission:manage users|view audit'])->group(function () {
        // e.g. Route::resource('users', UserController::class);
        Route::get('/auditoria', [AuditController::class, 'index'])->name('auditoria.index');
    });

    // --- Billing ---
    Route::middleware(['permission:manage billing'])->group(function () {
        // e.g. Route::resource('billing', BillingController::class);
    });

    // --- Clients ---
    Route::middleware(['permission:view clients|manage clients'])->group(function () {
        // e.g. Route::resource('clients', ClientController::class);
    });

    // --- Services ---
    Route::middleware(['permission:view services|manage services|execute services'])->group(function () {
        // e.g. Route::resource('services', ServiceController::class);
    });

    // --- Vehicles ---
    Route::middleware(['permission:manage vehicles|register mileage'])->group(function () {
        // e.g. Route::resource('vehicles', VehicleController::class);
    });
    // --- Tipos de Contacto ---
    Route::middleware(['role:Admin'])->group(function () {
        Route::get('/tipos-contacto', [\App\Http\Controllers\TipoContactoController::class, 'index'])->name('tipos-contacto.index');
        Route::post('/tipos-contacto', [\App\Http\Controllers\TipoContactoController::class, 'store'])->name('tipos-contacto.store');
        Route::put('/tipos-contacto/{tipos_contacto}', [\App\Http\Controllers\TipoContactoController::class, 'update'])->name('tipos-contacto.update');
        Route::patch('/tipos-contacto/{tipos_contacto}/toggle-active', [\App\Http\Controllers\TipoContactoController::class, 'toggleActive'])->name('tipos-contacto.toggle-active');
        Route::delete('/tipos-contacto/{tipos_contacto}', [\App\Http\Controllers\TipoContactoController::class, 'destroy'])->name('tipos-contacto.destroy');
        Route::patch('/tipos-contacto/{id}/restore', [\App\Http\Controllers\TipoContactoController::class, 'restore'])->name('tipos-contacto.restore');
    });

    // --- Changelog ---
    Route::get('/changelog', [\App\Http\Controllers\ChangelogController::class, 'index'])->name('changelog.index');
});

require __DIR__.'/auth.php';
