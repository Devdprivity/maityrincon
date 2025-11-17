<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'content',
        'user_id',
        'post_id',
        'approved',
        'name',
        'email',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    /**
     * Relación con el usuario que hizo el comentario (nullable para comentarios anónimos)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * Relación con el post al que pertenece el comentario
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Scope para comentarios aprobados
     */
    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }
}
