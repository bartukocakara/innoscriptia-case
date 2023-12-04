<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserAuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'kocakarabartu@gmail.com')->first();

        # Attach authors
        $authors = Author::all();

        $authorIds = $authors->pluck('id')->toArray();

        $user->authors()->attach($authorIds);
    }
}
