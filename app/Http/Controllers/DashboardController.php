<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Estadísticas de posts
        $totalPosts = Post::count();
        $publishedPosts = Post::where('status', 'published')->count();
        $draftPosts = Post::where('status', 'draft')->count();
        $featuredPosts = Post::where('featured', true)->where('status', 'published')->count();
        
        // Estadísticas de comentarios
        $totalComments = Comment::count();
        $approvedComments = Comment::where('approved', true)->count();
        $pendingComments = Comment::where('approved', false)->count();
        
        // Estadísticas de likes
        $totalLikes = Like::count();
        
        // Posts recientes
        $recentPosts = Post::withCount(['likes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => $post->status,
                    'created_at' => $post->created_at->diffForHumans(),
                    'likes_count' => $post->likes_count,
                    'comments_count' => $post->comments_count,
                ];
            });
        
        // Comentarios recientes
        $recentComments = Comment::with(['post:id,title', 'user:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => \Str::limit($comment->content, 50),
                    'post_title' => $comment->post->title ?? 'Post eliminado',
                    'user_name' => $comment->user->name ?? $comment->name ?? 'Anónimo',
                    'approved' => $comment->approved,
                    'created_at' => $comment->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'posts' => [
                    'total' => $totalPosts,
                    'published' => $publishedPosts,
                    'draft' => $draftPosts,
                    'featured' => $featuredPosts,
                ],
                'comments' => [
                    'total' => $totalComments,
                    'approved' => $approvedComments,
                    'pending' => $pendingComments,
                ],
                'likes' => [
                    'total' => $totalLikes,
                ],
            ],
            'recentPosts' => $recentPosts,
            'recentComments' => $recentComments,
        ]);
    }
}

