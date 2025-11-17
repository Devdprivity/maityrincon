<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Toggle like on a post.
     */
    public function toggle(Request $request, $post)
    {
        // Resolver el post por ID (puede ser ID numérico o slug)
        if (is_numeric($post)) {
            $post = Post::findOrFail($post);
        } else {
            $post = Post::where('slug', $post)->orWhere('id', $post)->firstOrFail();
        }
        
        // Verificar que el post esté publicado
        if (!$post->isPublished()) {
            abort(404);
        }

        // Obtener identificador del usuario (autenticado o anónimo)
        $userId = Auth::id();
        $sessionId = $request->session()->getId();
        $ipAddress = $request->ip();

        // Para usuarios autenticados, usar user_id
        if ($userId) {
            $existingLike = Like::where('user_id', $userId)->where('post_id', $post->id)->first();

            if ($existingLike) {
                // Remover like
                $existingLike->delete();
                $liked = false;
            } else {
                // Agregar like
                Like::create([
                    'user_id' => $userId,
                    'post_id' => $post->id,
                ]);
                $liked = true;
            }
        } else {
            // Para usuarios anónimos, usar IP + sesión para evitar duplicados
            $existingLike = Like::whereNull('user_id')
                ->where('ip_address', $ipAddress)
                ->where('session_id', $sessionId)
                ->where('post_id', $post->id)
                ->first();

            if ($existingLike) {
                // Remover like
                $existingLike->delete();
                $liked = false;
            } else {
                // Agregar like anónimo
                Like::create([
                    'user_id' => null,
                    'post_id' => $post->id,
                    'ip_address' => $ipAddress,
                    'session_id' => $sessionId,
                ]);
                $liked = true;
            }
        }

        // Devolver JSON para AJAX o redirigir
        if ($request->expectsJson()) {
            return response()->json([
                'liked' => $liked,
                'likes_count' => $post->likes()->count(),
            ]);
        }

        return back();
    }
}
