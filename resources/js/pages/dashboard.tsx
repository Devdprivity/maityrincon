import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    Plus, 
    Eye, 
    BarChart3, 
    Settings, 
    MessageSquare, 
    Heart, 
    FileText,
    CheckCircle,
    Clock,
    Star,
    TrendingUp
} from 'lucide-react';

interface Stats {
    posts: {
        total: number;
        published: number;
        draft: number;
        featured: number;
    };
    comments: {
        total: number;
        approved: number;
        pending: number;
    };
    likes: {
        total: number;
    };
}

interface RecentPost {
    id: number;
    title: string;
    status: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
}

interface RecentComment {
    id: number;
    content: string;
    post_title: string;
    user_name: string;
    approved: boolean;
    created_at: string;
}

interface DashboardProps {
    stats: Stats;
    recentPosts: RecentPost[];
    recentComments: RecentComment[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { stats, recentPosts, recentComments } = usePage<DashboardProps>().props;
    const { auth } = usePage().props as { auth: { user: { name: string } | null } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6" style={{ backgroundColor: '#f2e7dd' }}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#5f0a3c' }}>Dashboard</h1>
                        <p className="mt-2 text-base md:text-lg" style={{ color: '#706363' }}>
                            Bienvenida, {auth?.user?.name || 'Maity Rincón'}
                        </p>
                    </div>
                </div>

                {/* Estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Posts Publicados */}
                    <div className="rounded-xl border p-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))' }}>
                                <FileText className="w-6 h-6" style={{ color: '#5f0a3c' }} />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium mb-1" style={{ color: '#706363' }}>Posts Publicados</h3>
                        <p className="text-3xl font-bold" style={{ color: '#5f0a3c' }}>{stats.posts.published}</p>
                        <p className="text-xs mt-1" style={{ color: '#706363' }}>
                            {stats.posts.draft} borradores
                        </p>
                    </div>

                    {/* Posts Destacados */}
                    <div className="rounded-xl border p-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))' }}>
                                <Star className="w-6 h-6" style={{ color: '#e05353' }} />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium mb-1" style={{ color: '#706363' }}>Posts Destacados</h3>
                        <p className="text-3xl font-bold" style={{ color: '#e05353' }}>{stats.posts.featured}</p>
                        <p className="text-xs mt-1" style={{ color: '#706363' }}>
                            {stats.posts.total} total
                        </p>
                    </div>

                    {/* Comentarios */}
                    <div className="rounded-xl border p-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))' }}>
                                <MessageSquare className="w-6 h-6" style={{ color: '#98ada4' }} />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium mb-1" style={{ color: '#706363' }}>Comentarios</h3>
                        <p className="text-3xl font-bold" style={{ color: '#5f0a3c' }}>{stats.comments.total}</p>
                        <p className="text-xs mt-1" style={{ color: '#706363' }}>
                            {stats.comments.approved} aprobados, {stats.comments.pending} pendientes
                        </p>
                    </div>

                    {/* Likes */}
                    <div className="rounded-xl border p-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))' }}>
                                <Heart className="w-6 h-6" style={{ color: '#e05353' }} />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium mb-1" style={{ color: '#706363' }}>Likes Totales</h3>
                        <p className="text-3xl font-bold" style={{ color: '#e05353' }}>{stats.likes.total}</p>
                        <p className="text-xs mt-1" style={{ color: '#706363' }}>
                            En todos los posts
                        </p>
                    </div>
                </div>

                {/* Acciones rápidas y actividad reciente */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Acciones Rápidas */}
                    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold" style={{ color: '#5f0a3c' }}>Acciones Rápidas</h3>
                            <TrendingUp className="w-5 h-5" style={{ color: '#98ada4' }} />
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/admin/posts"
                                className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md"
                                style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#e05353';
                                    e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#98ada4';
                                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                        <Eye className="w-5 h-5" style={{ color: '#5f0a3c' }} />
                                    </div>
                                    <span className="font-medium" style={{ color: '#5f0a3c' }}>Ver Todos los Posts</span>
                                </div>
                                <span className="text-sm" style={{ color: '#706363' }}>{stats.posts.total} posts</span>
                            </Link>
                            <Link
                                href="/admin/posts/create"
                                className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md"
                                style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#e05353';
                                    e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#98ada4';
                                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                        <Plus className="w-5 h-5" style={{ color: '#5f0a3c' }} />
                                    </div>
                                    <span className="font-medium" style={{ color: '#5f0a3c' }}>Crear Nuevo Post</span>
                                </div>
                            </Link>
                            <Link
                                href="/admin/comments"
                                className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md"
                                style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#e05353';
                                    e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#98ada4';
                                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                        <MessageSquare className="w-5 h-5" style={{ color: '#5f0a3c' }} />
                                    </div>
                                    <span className="font-medium" style={{ color: '#5f0a3c' }}>Gestionar Comentarios</span>
                                </div>
                                {stats.comments.pending > 0 && (
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#e05353', color: '#f2e7dd' }}>
                                        {stats.comments.pending}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/settings/profile"
                                className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md"
                                style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#e05353';
                                    e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#98ada4';
                                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                        <Settings className="w-5 h-5" style={{ color: '#5f0a3c' }} />
                                    </div>
                                    <span className="font-medium" style={{ color: '#5f0a3c' }}>Configuración</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Posts Recientes */}
                    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold" style={{ color: '#5f0a3c' }}>Posts Recientes</h3>
                            <Link href="/admin/posts" className="text-sm hover:underline" style={{ color: '#98ada4' }}>
                                Ver todos
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/admin/posts/${post.id}`}
                                        className="flex items-start space-x-3 p-3 rounded-lg border transition-all hover:shadow-md"
                                        style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#e05353';
                                            e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#98ada4';
                                            e.currentTarget.style.backgroundColor = '#f2e7dd';
                                        }}
                                    >
                                        <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                            {post.status === 'published' ? (
                                                <CheckCircle className="w-4 h-4" style={{ color: '#98ada4' }} />
                                            ) : (
                                                <Clock className="w-4 h-4" style={{ color: '#706363' }} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate" style={{ color: '#5f0a3c' }}>
                                                {post.title}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-xs flex items-center" style={{ color: '#706363' }}>
                                                    <Heart className="w-3 h-3 mr-1" style={{ color: '#e05353' }} />
                                                    {post.likes_count}
                                                </span>
                                                <span className="text-xs flex items-center" style={{ color: '#706363' }}>
                                                    <MessageSquare className="w-3 h-3 mr-1" style={{ color: '#98ada4' }} />
                                                    {post.comments_count}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs flex-shrink-0" style={{ color: '#706363', opacity: 0.7 }}>
                                            {post.created_at}
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: '#98ada4', opacity: 0.5 }} />
                                    <p className="text-sm" style={{ color: '#706363' }}>No hay posts aún</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comentarios Recientes */}
                {recentComments.length > 0 && (
                    <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold" style={{ color: '#5f0a3c' }}>Comentarios Recientes</h3>
                            <Link href="/admin/comments" className="text-sm hover:underline" style={{ color: '#98ada4' }}>
                                Ver todos
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentComments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex items-start space-x-3 p-4 rounded-lg border"
                                    style={{ backgroundColor: comment.approved ? '#f2e7dd' : 'rgba(224, 83, 83, 0.1)', borderColor: comment.approved ? '#98ada4' : '#e05353' }}
                                >
                                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: comment.approved ? 'rgba(152, 173, 164, 0.3)' : 'rgba(224, 83, 83, 0.3)' }}>
                                        <MessageSquare className="w-4 h-4" style={{ color: comment.approved ? '#98ada4' : '#e05353' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm" style={{ color: '#5f0a3c' }}>
                                            <span className="font-medium">{comment.user_name}</span>
                                            {' '}comentó en{' '}
                                            <span className="font-medium">{comment.post_title}</span>
                                        </p>
                                        <p className="text-xs mt-1 truncate" style={{ color: '#706363' }}>
                                            "{comment.content}"
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {comment.approved ? (
                                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#98ada4', color: '#f2e7dd' }}>
                                                    Aprobado
                                                </span>
                                            ) : (
                                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#e05353', color: '#f2e7dd' }}>
                                                    Pendiente
                                                </span>
                                            )}
                                            <span className="text-xs" style={{ color: '#706363', opacity: 0.7 }}>
                                                {comment.created_at}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
