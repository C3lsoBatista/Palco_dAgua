<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole   = Role::firstOrCreate(['name' => 'Admin']);
        $financeRole = Role::firstOrCreate(['name' => 'Financeiro']);
        $workerRole  = Role::firstOrCreate(['name' => 'Técnico']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@palcodagua.local'],
            [
                'name'     => 'Administrador',
                'password' => bcrypt('password123'), // muda depois
                'email_verified_at' => now(),
            ]
        );

        $admin->assignRole($adminRole);
    }
}
