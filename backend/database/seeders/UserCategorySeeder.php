<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'kocakarabartu@gmail.com')->first();

        # Attach categories
        $categories = Category::all();

        $categoryIds = $categories->pluck('id')->toArray();

        $user->categories()->attach($categoryIds);
    }
}
