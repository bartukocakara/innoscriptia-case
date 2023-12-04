<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_categories', function (Blueprint $table) {
            $table->foreignUuid('user_id')
                  ->nullable(true);
            $table->foreign('user_id')->references('id')->on('users');

            $table->foreignUuid('category_id')
                  ->nullable(true);
            $table->foreign('category_id')->references('id')->on('categories');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_categories');
    }
};
