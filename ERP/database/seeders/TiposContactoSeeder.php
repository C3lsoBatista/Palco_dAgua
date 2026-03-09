<?php

namespace Database\Seeders;

use App\Models\TipoContacto;
use Illuminate\Database\Seeder;

class TiposContactoSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            ['nome' => 'Telefone'],
            ['nome' => 'Telemóvel'],
            ['nome' => 'Email'],
            ['nome' => 'Email Faturação'],
            ['nome' => 'Fax'],
        ];

        foreach ($tipos as $tipo) {
            // updateOrCreate evita duplicados se correres o seeder várias vezes
            TipoContacto::updateOrCreate(
                ['nome' => $tipo['nome']],
                ['ativo' => true]
            );
        }
    }
}