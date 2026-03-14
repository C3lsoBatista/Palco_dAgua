<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

/**
 * Modelo para Tipos de Contacto.
 * Utiliza SoftDeletes para permitir o arquivo de registos sem os eliminar fisicamente.
 */
class TipoContacto extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    // Define explicitamente o nome da tabela se não seguir o padrão plural em inglês
    protected $table = 'tipos_contacto';

    protected $fillable = [
        'nome',
        'ativo',
    ];

    protected $casts = [
        'ativo' => 'boolean',
    ];
}
