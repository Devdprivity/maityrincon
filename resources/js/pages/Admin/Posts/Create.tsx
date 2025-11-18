import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    ArrowLeft, 
    Save, 
    Star, 
    Image as ImageIcon,
    Upload,
    X
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function PostCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        content: '',
        excerpt: '',
        image: null as File | null,
        status: 'draft' as 'draft' | 'published' | 'scheduled',
        published_at: '',
        featured: false,
        meta_title: '',
        meta_description: '',
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
            title: 'Crear Post',
            href: '/admin/posts/create',
        },
    ];

    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        post('/admin/posts');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Post - Blog" />
            
            <div className="min-h-screen py-8" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/admin/posts"
                                className="transition-colors mr-4"
                                style={{ color: '#706363' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: '#5f0a3c' }}>Crear Nuevo Post</h1>
                                <p className="mt-2" style={{ color: '#706363' }}>Completa la información del post</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contenido Principal */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Información Básica */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f0a3c' }}>Información Básica</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Título *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                                placeholder="Título del post"
                                            />
                                            {errors.title && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.title}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="subtitle" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Subtítulo
                                            </label>
                                            <input
                                                type="text"
                                                id="subtitle"
                                                value={data.subtitle}
                                                onChange={(e) => setData('subtitle', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                                placeholder="Subtítulo del post"
                                            />
                                            {errors.subtitle && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.subtitle}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="excerpt" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Resumen
                                            </label>
                                            <textarea
                                                id="excerpt"
                                                rows={3}
                                                value={data.excerpt}
                                                onChange={(e) => setData('excerpt', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                                placeholder="Breve resumen del post"
                                            />
                                            {errors.excerpt && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.excerpt}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f0a3c' }}>Contenido</h2>
                                    
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                            Contenido *
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={15}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            style={{ 
                                                borderColor: '#98ada4',
                                                backgroundColor: '#f2e7dd',
                                                color: '#5f0a3c'
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = '#e05353';
                                                e.currentTarget.style.outline = 'none';
                                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = '#98ada4';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                            placeholder="Escribe el contenido del post aquí..."
                                        />
                                        {errors.content && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.content}</p>}
                                    </div>
                                </div>

                                {/* Imagen */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f0a3c' }}>Imagen del Post</h2>
                                    
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
                                                    className="absolute top-2 right-2 rounded-full p-1"
                                                    style={{ backgroundColor: '#e05353', color: '#f2e7dd' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c03d3d'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e05353'}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: '#98ada4' }}>
                                                <ImageIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#706363', opacity: 0.5 }} />
                                                <p className="mb-4" style={{ color: '#706363' }}>Selecciona una imagen para el post</p>
                                                <label className="px-4 py-2 rounded-lg cursor-pointer inline-flex items-center" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }} onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)'} onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)'}>
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
                                        {errors.image && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.image}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Panel Lateral */}
                            <div className="space-y-6">
                                {/* Estado y Publicación */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f0a3c' }}>Estado y Publicación</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Estado *
                                            </label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value as 'draft' | 'published' | 'scheduled')}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <option value="draft">Borrador</option>
                                                <option value="published">Publicado</option>
                                                <option value="scheduled">Programado</option>
                                            </select>
                                            {errors.status && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.status}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="published_at" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Fecha de Publicación
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="published_at"
                                                value={data.published_at}
                                                onChange={(e) => setData('published_at', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                            {errors.published_at && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.published_at}</p>}
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                checked={data.featured}
                                                onChange={(e) => setData('featured', e.target.checked)}
                                                className="rounded"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    accentColor: '#e05353'
                                                }}
                                            />
                                            <label htmlFor="featured" className="ml-2 text-sm flex items-center" style={{ color: '#706363' }}>
                                                <Star className="w-4 h-4 mr-1" style={{ color: '#e05353' }} />
                                                Post destacado
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f0a3c' }}>SEO</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="meta_title" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Meta Título
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_title"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                                placeholder="Título para SEO"
                                                maxLength={60}
                                            />
                                            <p className="mt-1 text-xs" style={{ color: '#706363', opacity: 0.7 }}>{data.meta_title.length}/60</p>
                                            {errors.meta_title && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.meta_title}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="meta_description" className="block text-sm font-medium mb-2" style={{ color: '#706363' }}>
                                                Meta Descripción
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                rows={3}
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                style={{ 
                                                    borderColor: '#98ada4',
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#5f0a3c'
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = '#e05353';
                                                    e.currentTarget.style.outline = 'none';
                                                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(224, 83, 83, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = '#98ada4';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                                placeholder="Descripción para SEO"
                                                maxLength={160}
                                            />
                                            <p className="mt-1 text-xs" style={{ color: '#706363', opacity: 0.7 }}>{data.meta_description.length}/160</p>
                                            {errors.meta_description && <p className="mt-1 text-sm" style={{ color: '#e05353' }}>{errors.meta_description}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones */}
                                <div className="rounded-lg shadow-sm border p-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                                            style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                            onMouseEnter={(e) => {
                                                if (!processing) {
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!processing) {
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                                                }
                                            }}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {processing ? 'Guardando...' : 'Guardar Post'}
                                        </button>
                                        
                                        <Link
                                            href="/admin/posts"
                                            className="w-full px-4 py-2 rounded-lg font-medium transition-colors text-center block"
                                            style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)', color: '#706363' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.5)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.3)';
                                            }}
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
