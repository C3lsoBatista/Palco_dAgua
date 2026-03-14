<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsTipoContactoSeeder extends Seeder
{
    public function run(): void
    {
        // Limpar cache para garantir integridade
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Definição de Permissões para Tipos de Contacto
        // Mesmo que só o Admin mexa, registar permissões permite-te 
        // mudar de ideia no futuro sem alterar o código do Controlador.
        $permissions = [
            'tipos-contacto.visualizar',
            'tipos-contacto.gerir',
            'tipos-contacto.restaurar',
        ];

        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p, 'guard_name' => 'web']);
        }

        // 2. Configuração de Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);

        // Atribuir tudo ao Admin
        $adminRole->givePermissionTo(Permission::all());

        $this->command->info('Permissões e Roles de Administração configuradas.');
    }
}
