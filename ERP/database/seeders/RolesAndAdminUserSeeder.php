<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Permissions
        $permissions = [
            'manage clients', 'view clients',
            'manage services', 'view services', 'execute services',
            'manage vehicles', 'register mileage',
            'manage billing',
            'manage users', 'view audit'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 2. Create Roles
        $adminRole   = Role::firstOrCreate(['name' => 'Admin']);
        $financeRole = Role::firstOrCreate(['name' => 'Financeiro']);
        $workerRole  = Role::firstOrCreate(['name' => 'Técnico']);

        // 3. Assign Permissions to Roles
        $adminRole->syncPermissions([
            'manage clients', 'view clients',
            'manage services', 'view services',
            'manage vehicles',
            'manage billing',
            'manage users', 'view audit'
        ]);

        $financeRole->syncPermissions([
            'manage clients', 'view clients',
            'manage services', 'view services',
            'manage billing'
        ]);

        $workerRole->syncPermissions([
            'view clients',
            'view services', 'execute services',
            'register mileage'
        ]);

        // 4. Create Admin User
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
