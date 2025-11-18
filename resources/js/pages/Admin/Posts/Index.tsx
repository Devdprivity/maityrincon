import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Calendar, 
    Star, 
    FileText,
    Clock,
    CheckCircle
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Post {
    id: number;
    title: string;
    subtitle: string;
    status: 'draft' | 'published' | 'scheduled';
    featured: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    formatted_status: string;
    formatted_published_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

interface Props {
    posts: {
        data: Post[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    filters: {
        status?: string;
        search?: string;
        featured?: boolean;
        sort_by?: string;
        sort_direction?: string;
    };
}

export default function PostsIndex({ posts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [featuredFilter, setFeaturedFilter] = useState(filters.featured || false);

    // Verificación de seguridad para posts
    if (!posts || !posts.data) {
        return (
            <AppLayout breadcrumbs={[]}>
                <Head title="Posts" />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando posts...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Posts',
            href: '/admin/posts',
        },
    ];

    const handleSearch = () => {
        router.get('/admin/posts', {
            search: searchTerm,
            status: statusFilter,
            featured: featuredFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFeaturedToggle = (postId: number) => {
        router.patch(`/admin/posts/${postId}/toggle-featured`, {}, {
            preserveState: true,
        });
    };

    const handleDelete = (postId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
            router.delete(`/admin/posts/${postId}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published':
                return <CheckCircle className="w-4 h-4" style={{ color: '#98ada4' }} />;
            case 'scheduled':
                return <Clock className="w-4 h-4" style={{ color: '#e05353' }} />;
            case 'draft':
                return <FileText className="w-4 h-4" style={{ color: '#706363' }} />;
            default:
                return <FileText className="w-4 h-4" style={{ color: '#706363' }} />;
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case 'published':
                return { backgroundColor: '#98ada4' };
            case 'scheduled':
                return { backgroundColor: '#e05353' };
            case 'draft':
                return { backgroundColor: '#706363' };
            default:
                return { backgroundColor: '#706363' };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Posts - Blog" />
            
            <div className="min-h-screen py-8" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: '#5f0a3c' }}>Gestión de Posts</h1>
                                <p className="mt-2" style={{ color: '#706363' }}>Administra el contenido de tu blog</p>
                            </div>
                            <Link
                                href="/admin/posts/create"
                                className="px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                                style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                                }}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Nuevo Post
                            </Link>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="rounded-lg shadow-sm border p-6 mb-6" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#706363' }} />
                                    <input
                                        type="text"
                                        placeholder="Buscar posts..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10 pr-4 py-2 border rounded-lg w-full"
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
                                </div>
                                
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 border rounded-lg"
                                    style={{ 
                                        borderColor: '#98ada4',
                                        backgroundColor: '#f2e7dd',
                                        color: '#5f0a3c'
                                    }}
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="published">Publicado</option>
                                    <option value="draft">Borrador</option>
                                    <option value="scheduled">Programado</option>
                                </select>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={featuredFilter}
                                        onChange={(e) => setFeaturedFilter(e.target.checked)}
                                        className="rounded"
                                        style={{ 
                                            borderColor: '#98ada4',
                                            accentColor: '#e05353'
                                        }}
                                    />
                                    <span className="ml-2 text-sm" style={{ color: '#706363' }}>Solo destacados</span>
                                </label>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleSearch}
                                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                                    style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                                    }}
                                >
                                    Buscar
                                </button>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('');
                                        setFeaturedFilter(false);
                                        router.get('/admin/posts', {}, { preserveState: true });
                                    }}
                                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                                    style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)', color: '#706363' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.3)';
                                    }}
                                >
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Posts */}
                    <div className="rounded-lg shadow-sm border overflow-hidden" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        {posts.data.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#706363', opacity: 0.5 }} />
                                <h3 className="text-lg font-medium mb-2" style={{ color: '#5f0a3c' }}>No hay posts</h3>
                                <p className="mb-6" style={{ color: '#706363' }}>Comienza creando tu primer post del blog.</p>
                                <Link
                                    href="/admin/posts/create"
                                    className="px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                                    style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                                    }}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Crear Post
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y" style={{ borderColor: '#98ada4' }}>
                                    <thead style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#5f0a3c' }}>
                                                Post
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#5f0a3c' }}>
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#5f0a3c' }}>
                                                Fecha
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#5f0a3c' }}>
                                                Destacado
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: '#5f0a3c' }}>
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                        {posts.data.map((post) => (
                                            <tr key={post.id} style={{ backgroundColor: '#f2e7dd' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f2e7dd'}>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-medium" style={{ color: '#5f0a3c' }}>
                                                            {post.title}
                                                        </div>
                                                        {post.subtitle && (
                                                            <div className="text-sm mt-1" style={{ color: '#706363' }}>
                                                                {post.subtitle}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ ...getStatusBgColor(post.status), color: '#f2e7dd' }}>
                                                        {getStatusIcon(post.status)}
                                                        <span className="ml-1">{post.formatted_status}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm" style={{ color: '#706363' }}>
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" style={{ color: '#706363' }} />
                                                        {post.formatted_published_at}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleFeaturedToggle(post.id)}
                                                        className="p-1 rounded-full transition-colors"
                                                        style={{
                                                            color: post.featured ? '#e05353' : '#706363'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = '#e05353';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = post.featured ? '#e05353' : '#706363';
                                                        }}
                                                    >
                                                        <Star className={`w-5 h-5 ${post.featured ? 'fill-current' : ''}`} />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/admin/posts/${post.id}`}
                                                            className="p-1"
                                                            style={{ color: '#98ada4' }}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#98ada4'}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/posts/${post.id}/edit`}
                                                            className="p-1"
                                                            style={{ color: '#98ada4' }}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#98ada4'}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(post.id)}
                                                            className="p-1"
                                                            style={{ color: '#e05353' }}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#c03d3d'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {posts.data.length > 0 && posts.meta && (
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm" style={{ color: '#706363' }}>
                                Mostrando {posts.meta.from || 0} a {posts.meta.to || 0} de {posts.meta.total || 0} resultados
                            </div>
                            <div className="flex space-x-2">
                                {posts.links && posts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        style={link.active ? {
                                            background: 'linear-gradient(135deg, #98ada4, #e05353)',
                                            color: '#f2e7dd'
                                        } : {
                                            backgroundColor: '#f2e7dd',
                                            color: '#706363',
                                            border: '1px solid #98ada4'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (link.url && !link.active) {
                                                e.currentTarget.style.borderColor = '#e05353';
                                                e.currentTarget.style.color = '#e05353';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (link.url && !link.active) {
                                                e.currentTarget.style.borderColor = '#98ada4';
                                                e.currentTarget.style.color = '#706363';
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
