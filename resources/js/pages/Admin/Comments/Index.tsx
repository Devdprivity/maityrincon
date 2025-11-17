import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    Calendar,
    CheckCircle,
    Filter,
    Search,
    Trash2,
    XCircle,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
}

interface Comment {
    id: number;
    content: string;
    approved: boolean;
    created_at: string;
    user: User;
    post: Post;
}

interface Props {
    comments: {
        data: Comment[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        approved?: boolean;
        search?: string;
    };
}

export default function CommentsIndex({ comments, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Comentarios',
            href: '/admin/comments',
        },
    ];

    const handleApprovalToggle = (commentId: number) => {
        router.patch(
            `/admin/comments/${commentId}/toggle-approval`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (commentId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            router.delete(`/admin/comments/${commentId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comentarios" />

            <div className="py-12" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="border-b p-6" style={{ borderColor: '#98ada4', backgroundColor: '#f2e7dd' }}>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-medium" style={{ color: '#5f0a3c' }}>
                                    Comentarios
                                </h1>
                            </div>
                        </div>

                        {/* Filtros */}
                        <div className="border-b p-6" style={{ borderColor: '#98ada4', backgroundColor: 'rgba(152, 173, 164, 0.2)' }}>
                            <form className="flex gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" style={{ color: '#706363' }} />
                                        <input
                                            type="text"
                                            name="search"
                                            defaultValue={filters.search}
                                            placeholder="Buscar por usuario, post o contenido..."
                                            className="w-full rounded-md border py-2 pr-4 pl-10"
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
                                </div>
                                <select
                                    name="approved"
                                    defaultValue={
                                        filters.approved?.toString() || ''
                                    }
                                    className="rounded-md border px-4 py-2"
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
                                    <option value="">Todos</option>
                                    <option value="1">Aprobados</option>
                                    <option value="0">Pendientes</option>
                                </select>
                                <button
                                    type="submit"
                                    className="rounded-md px-4 py-2"
                                    style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                                    }}
                                >
                                    <Filter className="mr-2 inline h-4 w-4" />
                                    Filtrar
                                </button>
                            </form>
                        </div>

                        {/* Tabla */}
                        <div className="w-full">
                            <table className="w-full table-fixed divide-y" style={{ borderColor: '#98ada4' }}>
                                <thead style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                    <tr>
                                        <th className="w-2/5 px-3 py-3 text-left text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Comentario
                                        </th>
                                        <th className="w-1/6 px-3 py-3 text-left text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Usuario
                                        </th>
                                        <th className="w-1/6 px-3 py-3 text-left text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Post
                                        </th>
                                        <th className="w-24 px-3 py-3 text-left text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Estado
                                        </th>
                                        <th className="w-28 px-3 py-3 text-left text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Fecha
                                        </th>
                                        <th className="w-20 px-3 py-3 text-right text-xs font-medium tracking-wider uppercase" style={{ color: '#5f0a3c' }}>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    {comments.data.map((comment) => (
                                        <tr
                                            key={comment.id}
                                            style={{ backgroundColor: '#f2e7dd' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.2)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f2e7dd'}
                                        >
                                            <td className="px-3 py-4">
                                                <div className="truncate text-sm" style={{ color: '#5f0a3c' }} title={comment.content}>
                                                    {comment.content}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4">
                                                <div className="text-sm font-medium truncate" style={{ color: '#5f0a3c' }} title={comment.user.name}>
                                                    {comment.user.name}
                                                </div>
                                                <div className="text-xs truncate" style={{ color: '#706363' }}>
                                                    ID: {comment.user.id}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4">
                                                <Link 
                                                    href={`/admin/posts/${comment.post.id}`}
                                                    className="truncate text-sm hover:underline block"
                                                    style={{ color: '#98ada4' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = '#98ada4'}
                                                    title={comment.post.title}
                                                >
                                                    {comment.post.title}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-4">
                                                <button
                                                    onClick={() =>
                                                        handleApprovalToggle(
                                                            comment.id,
                                                        )
                                                    }
                                                    className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap"
                                                    style={comment.approved ? {
                                                        backgroundColor: '#98ada4',
                                                        color: '#f2e7dd'
                                                    } : {
                                                        backgroundColor: '#e05353',
                                                        color: '#f2e7dd'
                                                    }}
                                                >
                                                    {comment.approved ? (
                                                        <>
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            <span className="hidden sm:inline">Aprobado</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="mr-1 h-3 w-3" />
                                                            <span className="hidden sm:inline">Pendiente</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap" style={{ color: '#706363' }}>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-3 w-3 flex-shrink-0" style={{ color: '#706363' }} />
                                                    <span className="text-xs">
                                                        {format(
                                                            new Date(
                                                                comment.created_at,
                                                            ),
                                                            'dd/MM/yyyy',
                                                            { locale: es },
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex items-center justify-end">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment.id,
                                                            )
                                                        }
                                                        style={{ color: '#e05353' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#c03d3d'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                                                        title="Eliminar comentario"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                        {comments.last_page > 1 && (
                            <div className="border-t px-6 py-4" style={{ borderColor: '#98ada4', backgroundColor: 'rgba(152, 173, 164, 0.2)' }}>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm" style={{ color: '#706363' }}>
                                        Mostrando{' '}
                                        {(comments.current_page - 1) *
                                            comments.per_page +
                                            1}{' '}
                                        a{' '}
                                        {Math.min(
                                            comments.current_page *
                                                comments.per_page,
                                            comments.total,
                                        )}{' '}
                                        de {comments.total} resultados
                                    </div>
                                    <div className="flex space-x-1">
                                        {Array.from(
                                            { length: comments.last_page },
                                            (_, i) => i + 1,
                                        ).map((page) => (
                                            <Link
                                                key={page}
                                                href={`/admin/comments?page=${page}`}
                                                className="rounded border px-3 py-1 text-sm"
                                                style={page === comments.current_page ? {
                                                    background: 'linear-gradient(135deg, #98ada4, #e05353)',
                                                    color: '#f2e7dd',
                                                    borderColor: 'transparent'
                                                } : {
                                                    backgroundColor: '#f2e7dd',
                                                    color: '#706363',
                                                    borderColor: '#98ada4'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (page !== comments.current_page) {
                                                        e.currentTarget.style.borderColor = '#e05353';
                                                        e.currentTarget.style.color = '#e05353';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (page !== comments.current_page) {
                                                        e.currentTarget.style.borderColor = '#98ada4';
                                                        e.currentTarget.style.color = '#706363';
                                                    }
                                                }}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
