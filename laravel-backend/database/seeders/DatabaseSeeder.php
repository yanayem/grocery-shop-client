<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Add only the essential admin user
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin User',
                'firebase_uid' => 'admin_secret_token_123', // Matching ADMIN_MASTER_KEY for local testing
                'role' => 'admin'
            ]
        );

        $this->call([
            RealDataSeeder::class,
        ]);

        echo "Seeding completed: Admin user and Real data added.\n";
    }
}
