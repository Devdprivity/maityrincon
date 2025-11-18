import { Link, usePage, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Clock,
    Share2,
    Star,
    Heart,
    MessageCircle,
    Send,
} from 'lucide-react';
import React from 'react';
import Layout from '../../layouts/website';

interface Post {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    excerpt: string;
    image: string | null;
    slug: string;
    published_at: string;
    featured: boolean;
    reading_time: number;
}

interface User {
    id: number;
    name: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    name?: string;
    email?: string;
    user?: User | null;
}

interface Props {
    post: Post;
    relatedPosts: Post[];
    comments: Comment[];
    likesCount: number;
    isLikedByUser: boolean;
}

export default function BlogShow({
    post,
    relatedPosts,
    comments,
    likesCount,
    isLikedByUser,
}: Props) {
    const page = usePage();
    interface PageProps {
        auth?: {
            user?: {
                id: number;
                name: string;
                email: string;
            } | null;
        };
    }
    const auth = (page.props as PageProps)?.auth || { user: null };
    
    
    const [localLikesCount, setLocalLikesCount] = React.useState(likesCount);
    const [localIsLiked, setLocalIsLiked] = React.useState(isLikedByUser);

    const commentForm = useForm({
        content: '',
        name: '',
        email: '',
    });

    const handleLike = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            if (!csrfToken) {
                console.error('CSRF token not found');
            return;
        }

            const response = await fetch(`/blog/${post.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                if (response.status === 419) {
                    // Token CSRF expirado, recargar la página
                    window.location.reload();
                    return;
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLocalIsLiked(data.liked);
            setLocalLikesCount(data.likes_count);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        commentForm.post(`/blog/${post.id}/comments`, {
            onSuccess: () => {
                commentForm.reset();
                // Refresh comments - in a real app, you'd update state
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Error submitting comment:', errors);
            },
        });
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('URL copiada al portapapeles');
        }
    };

    return (
        <Layout title={`${post.title} - Blog`}>
            {/* Breadcrumb */}
            <section className="py-8" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-4xl">
                        <nav className="flex items-center space-x-2 text-sm" style={{ color: '#706363' }}>
                            <Link
                                href="/"
                                className="transition-colors"
                                style={{ color: '#706363' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
                            >
                                Inicio
                            </Link>
                            <span>/</span>
                            <Link
                                href="/blog"
                                className="transition-colors"
                                style={{ color: '#706363' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
                            >
                                Blog
                            </Link>
                            <span>/</span>
                            <span style={{ color: '#5f0a3c' }}>{post.title}</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="py-12" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-4xl">
                        {/* Botón Volver */}
                        <div className="mb-8">
                            <Link
                                href="/blog"
                                className="flex items-center transition-colors"
                                style={{ color: '#e05353' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver al blog
                            </Link>
                        </div>

                        <article className="prose prose-lg max-w-none">
                            {/* Imagen Principal */}
                            {post.image && (
                                <div className="mb-8">
                                    <img
                                        src={post.image_url || `/storage/${post.image}`}
                                        alt={post.title}
                                        className="h-96 w-full rounded-2xl object-cover shadow-lg"
                                    />
                                </div>
                            )}

                            {/* Meta Información */}
                            <div className="mb-8 flex items-center justify-between pb-6" style={{ borderBottom: '1px solid #98ada4' }}>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center" style={{ color: '#706363' }}>
                                        <Calendar className="mr-2 h-5 w-5" />
                                        <span>
                                            {formatDate(post.published_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center" style={{ color: '#706363' }}>
                                        <Clock className="mr-2 h-5 w-5" />
                                        <span>
                                            {post.reading_time} min de lectura
                                        </span>
                                    </div>
                                    {post.featured && (
                                        <div className="flex items-center" style={{ color: '#e05353' }}>
                                            <Star className="mr-1 h-5 w-5 fill-current" />
                                            <span className="text-sm font-medium">
                                                Destacado
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center transition-colors"
                                    style={{ color: '#706363' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
                                >
                                    <Share2 className="mr-2 h-5 w-5" />
                                    Compartir
                                </button>
                            </div>

                            {/* Título */}
                            <header className="mb-8">
                                <h1 className="mb-4 text-4xl leading-tight font-bold" style={{ color: '#5f0a3c' }}>
                                    {post.title}
                                </h1>
                                {post.subtitle && (
                                    <h2 className="text-2xl leading-relaxed font-light" style={{ color: '#706363' }}>
                                        {post.subtitle}
                                    </h2>
                                )}
                            </header>

                            {/* Resumen */}
                            {post.excerpt && (
                                <div className="mb-8 rounded-2xl border-l-4 p-6" style={{ borderLeftColor: '#e05353', backgroundColor: '#f2e7dd' }}>
                                    <p className="text-lg leading-relaxed italic" style={{ color: '#706363' }}>
                                        {post.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Contenido */}
                            <div className="text-lg leading-relaxed" style={{ color: '#706363' }}>
                                <div className="whitespace-pre-wrap">
                                    {post.content}
                                </div>
                            </div>
                        </article>

                        {/* Likes and Comments */}
                        <div className="mt-12 pt-12" style={{ borderTop: '1px solid #98ada4' }}>
                            {/* Like Button */}
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={handleLike}
                                        className="flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors"
                                        style={{
                                            backgroundColor: localIsLiked ? '#f2e7dd' : '#f2e7dd',
                                            color: localIsLiked ? '#e05353' : '#706363',
                                            border: `2px solid ${localIsLiked ? '#e05353' : '#98ada4'}`
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!localIsLiked) {
                                                e.currentTarget.style.color = '#e05353';
                                                e.currentTarget.style.borderColor = '#e05353';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!localIsLiked) {
                                                e.currentTarget.style.color = '#706363';
                                                e.currentTarget.style.borderColor = '#98ada4';
                                            }
                                        }}
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${localIsLiked ? 'fill-current' : ''}`}
                                        />
                                        <span>{localLikesCount}</span>
                                    </button>
                                    <div className="flex items-center" style={{ color: '#706363' }}>
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        <span>
                                            {comments.length} comentarios
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="space-y-6">
                                {/* Comment Form */}
                                    <form
                                        onSubmit={handleCommentSubmit}
                                    className="rounded-lg p-6 border-2"
                                    style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}>
                                                {auth?.user?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || 'A'}
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            {!auth?.user && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={commentForm.data.name}
                                                            onChange={(e) => commentForm.setData('name', e.target.value)}
                                                            placeholder="Tu nombre (opcional)"
                                                            className="w-full rounded-lg border p-2"
                                                            style={{ borderColor: '#98ada4', backgroundColor: '#f2e7dd', color: '#5f0a3c' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            value={commentForm.data.email}
                                                            onChange={(e) => commentForm.setData('email', e.target.value)}
                                                            placeholder="Tu email (opcional)"
                                                            className="w-full rounded-lg border p-2"
                                                            style={{ borderColor: '#98ada4', backgroundColor: '#f2e7dd', color: '#5f0a3c' }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                                <textarea
                                                value={commentForm.data.content}
                                                onChange={(e) => commentForm.setData('content', e.target.value)}
                                                    placeholder="Escribe un comentario..."
                                                className="w-full resize-none rounded-lg border p-3"
                                                style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                                    rows={3}
                                                />
                                            <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                    disabled={commentForm.processing}
                                                    className="flex items-center rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
                                                    style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                                    >
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Comentar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                {/* Comments List */}
                                {comments.length > 0 && (
                                    <div className="space-y-6">
                                        {comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="flex space-x-4"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full font-semibold" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)', color: '#f2e7dd' }}>
                                                        {(comment.user?.name || comment.name || 'A')
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="rounded-lg border-2 p-4" style={{ borderColor: '#98ada4', backgroundColor: '#f2e7dd' }}>
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <h4 className="font-semibold" style={{ color: '#5f0a3c' }}>
                                                                {comment.user?.name || comment.name || 'Anónimo'}
                                                            </h4>
                                                            <span className="text-sm" style={{ color: '#706363', opacity: 0.8 }}>
                                                                {new Date(
                                                                    comment.created_at,
                                                                ).toLocaleDateString(
                                                                    'es-ES',
                                                                )}
                                                            </span>
                                                        </div>
                                                        <p className="whitespace-pre-wrap" style={{ color: '#706363' }}>
                                                            {comment.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 rounded-2xl border-2 p-8" style={{ borderColor: '#e05353', background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))' }}>
                            <div className="text-center">
                                <h3 className="mb-4 text-2xl font-semibold" style={{ color: '#5f0a3c' }}>
                                    ¿Te ha resultado útil este artículo?
                                </h3>
                                <p className="mb-6" style={{ color: '#706363' }}>
                                    Si necesitas apoyo profesional
                                    personalizado, estoy aquí para ayudarte.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors"
                                        style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                    >
                                        <ArrowRight className="mr-2 h-5 w-5" />
                                        Contactar Ahora
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center justify-center rounded-lg border-2 px-8 py-3 font-medium transition-colors"
                                        style={{ borderColor: '#e05353', backgroundColor: '#f2e7dd', color: '#5f0a3c' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#e05353';
                                            e.currentTarget.style.color = '#f2e7dd';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f2e7dd';
                                            e.currentTarget.style.color = '#5f0a3c';
                                        }}
                                    >
                                        Ver Servicios
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts Relacionados */}
            {relatedPosts.length > 0 && (
                <section className="py-16" style={{ backgroundColor: '#f2e7dd' }}>
                    <div className="container mx-auto px-6">
                        <div className="mx-auto max-w-6xl">
                            <h2 className="mb-8 text-center text-3xl font-light" style={{ color: '#5f0a3c' }}>
                                Artículos Relacionados
                            </h2>

                            <div className="grid gap-8 md:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <article
                                        key={relatedPost.id}
                                        className="overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:transform border-2 shadow-lg"
                                        style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                    >
                                        {relatedPost.image && (
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    src={relatedPost.image_url || `/storage/${relatedPost.image}`}
                                                    alt={relatedPost.title}
                                                    className="h-48 w-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="mb-3 flex items-center text-sm" style={{ color: '#706363', opacity: 0.8 }}>
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {formatDate(
                                                    relatedPost.published_at,
                                                )}
                                                <Clock className="mr-2 ml-4 h-4 w-4" />
                                                {relatedPost.reading_time} min
                                            </div>

                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold" style={{ color: '#5f0a3c' }}>
                                                {relatedPost.title}
                                            </h3>

                                            {relatedPost.subtitle && (
                                                <p className="mb-4 line-clamp-2" style={{ color: '#706363' }}>
                                                    {relatedPost.subtitle}
                                                </p>
                                            )}

                                            <p className="mb-4 line-clamp-3" style={{ color: '#706363' }}>
                                                {relatedPost.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${relatedPost.slug}`}
                                                className="flex items-center font-medium transition-colors"
                                                style={{ color: '#e05353' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                                            >
                                                Leer más
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
