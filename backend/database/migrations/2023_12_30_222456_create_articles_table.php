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
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title', 500);
            $table->text('description')->nullable();
            $table->string('slug');
            $table->string('url');
            $table->foreignUuid('source_id')
                  ->nullable(true);
            $table->foreign('source_id')->references('id')->on('sources');
            $table->foreignUuid('author_id')
                  ->nullable(true);
            $table->foreign('author_id')->references('id')->on('authors');
            $table->foreignUuid('category_id')
                  ->nullable(true);
            $table->foreign('category_id')->references('id')->on('categories');
            $table->mediumText('image');
            $table->string('published_at');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
