<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request, $post)
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

        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Si el usuario está autenticado, usar su información
        $userId = Auth::id();
        $name = $userId ? Auth::user()->name : ($request->name ?? 'Anónimo');
        $email = $userId ? Auth::user()->email : $request->email;

        Comment::create([
            'content' => $request->content,
            'user_id' => $userId,
            'post_id' => $post->id,
            'name' => $name,
            'email' => $email,
            'approved' => true, // Para simplificar, aprobamos automáticamente
        ]);

        return back()->with('success', 'Comentario agregado exitosamente.');
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, Comment $comment)
    {
        // Verificar que el usuario sea el autor del comentario
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $comment->update([
            'content' => $request->content,
        ]);

        return back()->with('success', 'Comentario actualizado exitosamente.');
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(Comment $comment)
    {
        // Verificar que el usuario sea el autor del comentario
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comentario eliminado exitosamente.');
    }

    /**
     * Display a listing of comments (Admin).
     */
    public function index(Request $request)
    {
        $query = Comment::with(['user', 'post']);

        // Filtros
        if ($request->filled('approved')) {
            $query->where('approved', $request->boolean('approved'));
        }

        if ($request->filled('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            })->orWhereHas('post', function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%");
            })->orWhere('content', 'like', "%{$request->search}%");
        }

        $comments = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments,
            'filters' => $request->only(['approved', 'search'])
        ]);
    }

    /**
     * Show the form for editing the specified comment (Admin).
     */
    public function edit(Comment $comment)
    {
        return Inertia::render('Admin/Comments/Edit', [
            'comment' => $comment->load(['user', 'post'])
        ]);
    }

    /**
     * Update the specified comment (Admin).
     */
    public function updateAdmin(Request $request, Comment $comment)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000',
            'approved' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $comment->update($request->only(['content', 'approved']));

        return redirect()->route('admin.comments.index')->with('success', 'Comentario actualizado exitosamente.');
    }

    /**
     * Toggle approval of the specified comment (Admin).
     */
    public function toggleApproval(Comment $comment)
    {
        $comment->update(['approved' => !$comment->approved]);

        return back()->with('success', 'Estado de aprobación actualizado.');
    }

    /**
     * Remove the specified comment (Admin).
     */
    public function destroyAdmin(Comment $comment)
    {
        $comment->delete();

        return redirect()->route('admin.comments.index')->with('success', 'Comentario eliminado exitosamente.');
    }
}
