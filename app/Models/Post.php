<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'content',
        'excerpt',
        'image',
        'slug',
        'status',
        'published_at',
        'featured',
        'meta_data'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'featured' => 'boolean',
        'meta_data' => 'array',
    ];

    protected $dates = [
        'published_at',
        'created_at',
        'updated_at'
    ];

    /**
     * Boot del modelo para generar slug automáticamente
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('title') && empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    /**
     * Scope para posts publicados
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
                    ->where(function ($q) {
                        $q->whereNull('published_at')
                          ->orWhere('published_at', '<=', now());
                    });
    }

    /**
     * Scope para posts destacados
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    /**
     * Scope para posts programados
     */
    public function scopeScheduled(Builder $query): Builder
    {
        return $query->where('status', 'scheduled')
                    ->where('published_at', '>', now());
    }

    /**
     * Scope para posts en borrador
     */
    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope para búsqueda por título y contenido
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('subtitle', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%")
              ->orWhere('excerpt', 'like', "%{$search}%");
        });
    }

    /**
     * Verificar si el post está publicado
     */
    public function isPublished(): bool
    {
        return $this->status === 'published' && 
               ($this->published_at === null || $this->published_at <= now());
    }

    /**
     * Verificar si el post está programado
     */
    public function isScheduled(): bool
    {
        return $this->status === 'scheduled' && $this->published_at > now();
    }

    /**
     * Verificar si el post está en borrador
     */
    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    /**
     * Obtener la fecha de publicación formateada
     */
    public function getFormattedPublishedAtAttribute(): string
    {
        if (!$this->published_at) {
            return 'No programado';
        }

        return $this->published_at->format('d/m/Y H:i');
    }

    /**
     * Obtener el estado formateado
     */
    public function getFormattedStatusAttribute(): string
    {
        return match($this->status) {
            'published' => 'Publicado',
            'draft' => 'Borrador',
            'scheduled' => 'Programado',
            default => 'Desconocido'
        };
    }

    /**
     * Obtener la URL del post
     */
    public function getUrlAttribute(): string
    {
        return route('blog.show', $this->slug);
    }

    /**
     * Obtener la imagen completa con URL
     */
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/' . $this->image);
    }

    /**
     * Generar excerpt automáticamente si no existe
     */
    public function getExcerptAttribute($value): string
    {
        if ($value) {
            return $value;
        }

        return Str::limit(strip_tags($this->content), 150);
    }

    /**
     * Obtener posts relacionados (por fecha)
     */
    public function relatedPosts(int $limit = 3): Builder
    {
        return static::published()
                    ->where('id', '!=', $this->id)
                    ->orderBy('published_at', 'desc')
                    ->limit($limit);
    }

    /**
     * Obtener el tiempo de lectura estimado
     */
    public function getReadingTimeAttribute(): int
    {
        $wordCount = str_word_count(strip_tags($this->content));
        return max(1, round($wordCount / 200)); // 200 palabras por minuto
    }

    /**
     * Relación con comentarios
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Relación con likes
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Obtener comentarios aprobados
     */
    public function approvedComments()
    {
        return $this->comments()->approved()->orderBy('created_at', 'desc');
    }

    /**
     * Verificar si el usuario autenticado dio like
     */
    public function isLikedByUser(?int $userId = null): bool
    {
        if (!$userId) {
            return false;
        }

        return $this->likes()->where('user_id', $userId)->exists();
    }

    /**
     * Obtener el conteo de likes
     */
    public function getLikesCountAttribute(): int
    {
        return $this->likes()->count();
    }
}