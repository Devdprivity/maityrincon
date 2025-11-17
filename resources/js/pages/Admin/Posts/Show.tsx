import { Head, Link, router } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Edit, 
    Trash2, 
    Calendar, 
    Star, 
    Clock,
    CheckCircle,
    FileText,
    Eye,
    Share2
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Post {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    excerpt: string;
    image: string | null;
    status: 'draft' | 'published' | 'scheduled';
    published_at: string | null;
    featured: boolean;
    created_at: string;
    updated_at: string;
    formatted_status: string;
    formatted_published_at: string;
    reading_time: number;
}

interface Props {
    post: Post;
}

export default function PostShow({ post }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Posts',
            href: '/admin/posts',
        },
        {
            title: post.title,
            href: `/admin/posts/${post.id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
            router.delete(`/admin/posts/${post.id}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'scheduled':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'draft':
                return <FileText className="w-5 h-5 text-gray-500" />;
            default:
                return <FileText className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'scheduled':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${post.title} - Blog`} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <Link
                                href="/admin/posts"
                                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Volver a la lista
                            </Link>
                            
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={`/admin/posts/${post.id}/edit`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editar
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contenido Principal */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Imagen */}
                                {(post.image_url || post.image) && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={post.image_url || `/storage/${post.image}`}
                                            alt={post.title}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Contenido */}
                                <div className="p-8">
                                    {/* Estado y fecha */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(post.status)}`}>
                                                {getStatusIcon(post.status)}
                                                <span className="ml-2">{post.formatted_status}</span>
                                            </span>
                                            
                                            {post.featured && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                    <Star className="w-4 h-4 mr-1" />
                                                    Destacado
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {post.reading_time} min de lectura
                                        </div>
                                    </div>

                                    {/* Título y subtítulo */}
                                    <div className="mb-6">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                            {post.title}
                                        </h1>
                                        {post.subtitle && (
                                            <h2 className="text-xl text-gray-600 mb-4">
                                                {post.subtitle}
                                            </h2>
                                        )}
                                        
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {post.formatted_published_at}
                                        </div>
                                    </div>

                                    {/* Resumen */}
                                    {post.excerpt && (
                                        <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                            <p className="text-gray-700 italic">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    )}

                                    {/* Contenido */}
                                    <div className="prose prose-lg max-w-none">
                                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                            {post.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel Lateral */}
                        <div className="space-y-6">
                            {/* Información del Post */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Post</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Estado
                                        </label>
                                        <div className="flex items-center">
                                            {getStatusIcon(post.status)}
                                            <span className="ml-2 text-sm text-gray-900">{post.formatted_status}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Fecha de Publicación
                                        </label>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="ml-2 text-sm text-gray-900">{post.formatted_published_at}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Creado
                                        </label>
                                        <div className="text-sm text-gray-900">
                                            {new Date(post.created_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Última Actualización
                                        </label>
                                        <div className="text-sm text-gray-900">
                                            {new Date(post.updated_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Tiempo de Lectura
                                        </label>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="ml-2 text-sm text-gray-900">{post.reading_time} minutos</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Destacado
                                        </label>
                                        <div className="flex items-center">
                                            <Star className={`w-4 h-4 ${post.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                                            <span className="ml-2 text-sm text-gray-900">
                                                {post.featured ? 'Sí' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones Rápidas */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                                
                                <div className="space-y-3">
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar Post
                                    </Link>
                                    
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: post.title,
                                                    text: post.excerpt,
                                                    url: window.location.href
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                alert('URL copiada al portapapeles');
                            }
                        }}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                    </button>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Caracteres</span>
                        <span className="text-sm font-medium text-gray-900">
                            {post.content.length.toLocaleString()}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Palabras</span>
                        <span className="text-sm font-medium text-gray-900">
                            {post.content.split(/\s+/).length.toLocaleString()}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Párrafos</span>
                        <span className="text-sm font-medium text-gray-900">
                            {post.content.split(/\n\s*\n/).length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </AppLayout>
    );
}
