<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::query();

        // Filtros
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortBy, $sortDirection);

        $posts = $query->paginate(10)->withQueryString();

        // Agregar image_url a cada post
        $posts->getCollection()->transform(function ($post) {
            return $post->append('image_url');
        });

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['status', 'search', 'featured', 'sort_by', 'sort_direction'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date|after_or_equal:now',
            'featured' => 'boolean',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        // Generar slug único
        $slug = Str::slug($data['title']);
        $originalSlug = $slug;
        $counter = 1;
        
        while (Post::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        $data['slug'] = $slug;

        // Manejar imagen
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        // Preparar metadatos
        $data['meta_data'] = [
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
        ];

        // Limpiar datos
        unset($data['meta_title'], $data['meta_description']);

        // Validar fecha de publicación según estado
        if ($data['status'] === 'scheduled' && empty($data['published_at'])) {
            return back()->withErrors(['published_at' => 'La fecha de publicación es requerida para posts programados.'])->withInput();
        }

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')
                        ->with('success', 'Post creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Admin/Posts/Show', [
            'post' => $post->append('image_url')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post->append('image_url')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'featured' => 'boolean',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        // Generar nuevo slug si el título cambió
        if ($data['title'] !== $post->title) {
            $slug = Str::slug($data['title']);
            $originalSlug = $slug;
            $counter = 1;
            
            while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
            $data['slug'] = $slug;
        }

        // Manejar imagen
        if ($request->hasFile('image')) {
            // Eliminar imagen anterior
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        // Preparar metadatos
        $data['meta_data'] = [
            'meta_title' => $data['meta_title'] ?? null,
            'meta_description' => $data['meta_description'] ?? null,
        ];

        // Limpiar datos
        unset($data['meta_title'], $data['meta_description']);

        // Validar fecha de publicación según estado
        if ($data['status'] === 'scheduled' && empty($data['published_at'])) {
            return back()->withErrors(['published_at' => 'La fecha de publicación es requerida para posts programados.'])->withInput();
        }

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')
                        ->with('success', 'Post actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Eliminar imagen si existe
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('admin.posts.index')
                        ->with('success', 'Post eliminado exitosamente.');
    }

    /**
     * Cambiar el estado de un post
     */
    public function toggleStatus(Post $post)
    {
        $newStatus = $post->status === 'published' ? 'draft' : 'published';
        
        if ($newStatus === 'published' && !$post->published_at) {
            $post->update([
                'status' => $newStatus,
                'published_at' => now()
            ]);
        } else {
            $post->update(['status' => $newStatus]);
        }

        return back()->with('success', 'Estado del post actualizado.');
    }

    /**
     * Marcar/desmarcar como destacado
     */
    public function toggleFeatured(Post $post)
    {
        $post->update(['featured' => !$post->featured]);

        return back()->with('success', 'Estado destacado actualizado.');
    }

    /**
     * Eliminar imagen de un post
     */
    public function deleteImage(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
            $post->update(['image' => null]);
        }

        return back()->with('success', 'Imagen eliminada exitosamente.');
    }

    /**
     * Vista pública del blog
     */
    public function blog(Request $request)
    {
        $query = Post::published();

        // Filtros públicos
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('featured')) {
            $query->featured();
        }

        $posts = $query->orderBy('published_at', 'desc')
                      ->paginate(6)
                      ->withQueryString();

        $featuredPosts = Post::published()->featured()->take(3)->get()->append('image_url');
        
        // Agregar image_url a cada post paginado sin afectar la estructura del paginador
        $posts->through(function ($post) {
            return $post->append('image_url');
        });

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'featuredPosts' => $featuredPosts,
            'filters' => $request->only(['search', 'featured'])
        ]);
    }

    /**
     * Vista pública de un post individual
     */
    public function showPost(string $slug)
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        $relatedPosts = $post->relatedPosts(3)->get();

        // Cargar comentarios aprobados con usuario (si existe)
        $comments = $post->approvedComments()
            ->with('user:id,name')
            ->select('id', 'content', 'user_id', 'name', 'email', 'created_at')
            ->get();

        // Contar likes
        $likesCount = $post->likes()->count();

        // Verificar si el usuario autenticado o anónimo dio like
        $isLikedByUser = false;
        if (auth()->check()) {
            $isLikedByUser = $post->isLikedByUser(auth()->id());
        } else {
            // Para usuarios anónimos, verificar por IP y sesión
            $sessionId = request()->session()->getId();
            $ipAddress = request()->ip();
            $isLikedByUser = $post->likes()
                ->whereNull('user_id')
                ->where('ip_address', $ipAddress)
                ->where('session_id', $sessionId)
                ->exists();
        }
        
        // Agregar image_url al post y posts relacionados
        $post->append('image_url');
        $relatedPosts->transform(function ($relatedPost) {
            return $relatedPost->append('image_url');
        });

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'comments' => $comments,
            'likesCount' => $likesCount,
            'isLikedByUser' => $isLikedByUser,
        ]);
    }
}