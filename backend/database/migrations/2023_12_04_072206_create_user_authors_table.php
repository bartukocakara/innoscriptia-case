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
        Schema::create('user_authors', function (Blueprint $table) {
            $table->foreignUuid('user_id')
                  ->nullable(true);
            $table->foreign('user_id')->references('id')->on('users');

            $table->foreignUuid('author_id')
                  ->nullable(true);
            $table->foreign('author_id')->references('id')->on('authors');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_authors');
    }
};
