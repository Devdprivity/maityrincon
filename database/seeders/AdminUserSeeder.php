<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuario administrador (evita duplicados)
        $admin = User::firstOrCreate(
            ['email' => 'admin@psicologomaityrincon.com'],
            [
            'name' => 'Maity Rincón',
                'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
            ]
        );

        if ($admin->wasRecentlyCreated) {
            $this->command->info('✅ Usuario administrador creado exitosamente:');
        } else {
            $this->command->warn('⚠️  El usuario administrador ya existe. Se mantienen las credenciales actuales.');
        }

        $this->command->info('📧 Email: admin@psicologomaityrincon.com');
        $this->command->info('🔑 Password: admin123');
        $this->command->newLine();
        $this->command->warn('⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión por seguridad.');
    }
}