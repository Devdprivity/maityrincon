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
        // Verificar si las columnas ya existen
        $hasIpAddress = Schema::hasColumn('likes', 'ip_address');
        $hasSessionId = Schema::hasColumn('likes', 'session_id');
        
        // Primero eliminar la foreign key si existe
        if (Schema::hasColumn('likes', 'user_id')) {
            try {
                Schema::table('likes', function (Blueprint $table) {
                    $table->dropForeign(['user_id']);
                });
            } catch (\Exception $e) {
                // Ignorar si no existe
            }
        }
        
        // Luego eliminar el índice único si existe
        try {
            Schema::table('likes', function (Blueprint $table) {
                $table->dropUnique(['user_id', 'post_id']);
            });
        } catch (\Exception $e) {
            // Ignorar si no existe
        }
        
        // Modificar la columna user_id
        Schema::table('likes', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->change();
        });
        
        // Agregar nuevas columnas solo si no existen
        if (!$hasIpAddress) {
            Schema::table('likes', function (Blueprint $table) {
                $table->string('ip_address')->nullable()->after('user_id');
            });
        }
        
        if (!$hasSessionId) {
            Schema::table('likes', function (Blueprint $table) {
                $table->string('session_id')->nullable()->after('ip_address');
            });
        }
        
        // Recrear la foreign key (solo para valores no null)
        Schema::table('likes', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
        // Agregar nuevos índices únicos solo si no existen
        try {
            Schema::table('likes', function (Blueprint $table) {
                // Índice único para usuarios autenticados (user_id no null)
                $table->unique(['user_id', 'post_id'], 'likes_user_post_unique');
            });
        } catch (\Exception $e) {
            // Ignorar si ya existe
        }
        
        try {
            Schema::table('likes', function (Blueprint $table) {
                // Índice único para usuarios anónimos (ip_address + session_id)
                $table->unique(['ip_address', 'session_id', 'post_id'], 'likes_anon_post_unique');
            });
        } catch (\Exception $e) {
            // Ignorar si ya existe
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropUnique('likes_user_post_unique');
            $table->dropUnique('likes_anon_post_unique');
        });
        
        Schema::table('likes', function (Blueprint $table) {
            $table->dropColumn(['ip_address', 'session_id']);
        });
        
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        
        Schema::table('likes', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['user_id', 'post_id']);
        });
    }
};
