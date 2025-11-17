import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    ArrowLeft, 
    Save, 
    Eye, 
    Calendar, 
    Star, 
    Image as ImageIcon,
    Upload,
    X
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
    meta_data: {
        meta_title?: string;
        meta_description?: string;
    };
}

interface Props {
    post: Post;
}

export default function PostEdit({ post }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        subtitle: post.subtitle || '',
        content: post.content,
        excerpt: post.excerpt || '',
        image: null as File | null,
        status: post.status,
        published_at: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '',
        featured: post.featured,
        meta_title: post.meta_data?.meta_title || '',
        meta_description: post.meta_data?.meta_description || '',
    });

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
            title: 'Editar Post',
            href: `/admin/posts/${post.id}/edit`,
        },
    ];

    const [imagePreview, setImagePreview] = useState<string | null>(
        post.image_url || (post.image ? `/storage/${post.image}` : null)
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/posts/${post.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${post.title} - Blog`} />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/admin/posts"
                                className="text-gray-600 hover:text-gray-900 transition-colors mr-4"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Editar Post</h1>
                                <p className="mt-2 text-gray-600">Modifica la información del post</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contenido Principal */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Información Básica */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Título *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Título del post"
                                            />
                                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subtítulo
                                            </label>
                                            <input
                                                type="text"
                                                id="subtitle"
                                                value={data.subtitle}
                                                onChange={(e) => setData('subtitle', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Subtítulo del post"
                                            />
                                            {errors.subtitle && <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                                Resumen
                                            </label>
                                            <textarea
                                                id="excerpt"
                                                rows={3}
                                                value={data.excerpt}
                                                onChange={(e) => setData('excerpt', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Breve resumen del post"
                                            />
                                            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
                                    
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                            Contenido *
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={15}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Escribe el contenido del post aquí..."
                                        />
                                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                    </div>
                                </div>

                                {/* Imagen */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Imagen del Post</h2>
                                    
                                    <div className="space-y-4">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-4">Selecciona una imagen para el post</p>
                                                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center">
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Subir Imagen
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        )}
                                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Panel Lateral */}
                            <div className="space-y-6">
                                {/* Estado y Publicación */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado y Publicación</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                                Estado *
                                            </label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value as 'draft' | 'published' | 'scheduled')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="draft">Borrador</option>
                                                <option value="published">Publicado</option>
                                                <option value="scheduled">Programado</option>
                                            </select>
                                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                                                Fecha de Publicación
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="published_at"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {errors.published_at && <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>}
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                checked={data.featured}
                                                onChange={(e) => setData('featured', e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="featured" className="ml-2 text-sm text-gray-700 flex items-center">
                                                <Star className="w-4 h-4 mr-1" />
                                                Post destacado
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Meta Título
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_title"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Título para SEO"
                                                maxLength={60}
                                            />
                                            <p className="mt-1 text-xs text-gray-500">{data.meta_title.length}/60</p>
                                            {errors.meta_title && <p className="mt-1 text-sm text-red-600">{errors.meta_title}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                                                Meta Descripción
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                rows={3}
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Descripción para SEO"
                                                maxLength={160}
                                            />
                                            <p className="mt-1 text-xs text-gray-500">{data.meta_description.length}/160</p>
                                            {errors.meta_description && <p className="mt-1 text-sm text-red-600">{errors.meta_description}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {processing ? 'Guardando...' : 'Actualizar Post'}
                                        </button>
                                        
                                        <Link
                                            href="/admin/posts"
                                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-center block"
                                        >
                                            Cancelar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
