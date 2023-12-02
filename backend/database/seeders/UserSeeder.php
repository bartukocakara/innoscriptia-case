<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Class UserSeeder
 */
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'name' => 'Bartu Kocakara',
            'email' => 'kocakarabartu@gmail.com',
            'password' => bcrypt('password')
        ]);
    }
}
