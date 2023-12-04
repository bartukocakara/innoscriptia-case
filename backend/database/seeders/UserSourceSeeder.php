<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Source;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'kocakarabartu@gmail.com')->first();

        # Attach authors
        $sources = Source::all();

        $sourceIds = $sources->pluck('id')->toArray();

        $user->sources()->attach($sourceIds);
    }
}
