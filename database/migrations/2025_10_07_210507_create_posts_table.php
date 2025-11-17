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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Título del post
            $table->string('subtitle')->nullable(); // Subtítulo del post
            $table->text('content'); // Contenido del post
            $table->string('excerpt')->nullable(); // Resumen del post
            $table->string('image')->nullable(); // Imagen del post
            $table->string('slug')->unique(); // URL amigable
            $table->enum('status', ['draft', 'published', 'scheduled'])->default('draft'); // Estado del post
            $table->timestamp('published_at')->nullable(); // Fecha de publicación programada
            $table->boolean('featured')->default(false); // Post destacado
            $table->json('meta_data')->nullable(); // Metadatos adicionales (SEO, etc.)
            $table->timestamps();
            
            // Índices para optimizar consultas
            $table->index(['status', 'published_at']);
            $table->index('featured');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
