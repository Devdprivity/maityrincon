import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Search,
    Calendar,
    Clock,
    Star,
    ArrowRight,
    FileText
} from 'lucide-react';
import Layout from '../../layouts/website';
import WhatsAppWidget from '@/components/WhatsAppWidget';

interface Post {
    id: number;
    title: string;
    subtitle: string;
    excerpt: string;
    image: string | null;
    slug: string;
    published_at: string;
    featured: boolean;
    reading_time: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    posts: {
        data: Post[];
        links: PaginationLink[];
        meta?: {
            total?: number;
            from?: number;
            to?: number;
            current_page?: number;
            last_page?: number;
            per_page?: number;
        };
        total?: number;
    };
    featuredPosts: Post[];
    filters: {
        search?: string;
        featured?: boolean;
    };
}

export default function BlogIndex({ posts, featuredPosts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // La búsqueda se manejará con Inertia
    };

    // Obtener la cantidad de artículos en la página actual
    const totalArticles = posts?.data?.length ?? 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Layout title="Blog - Psicología Clínica" hideFooterOnMobile={true}>
            {/* Mobile Header simplificado */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm safe-area-top">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                            <img src="/img/logo2blanco.png" alt="Logo" className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>Maity Rincón</h1>
                            <p className="text-xs" style={{ color: '#706363' }}>Psicóloga Clínica</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-12 md:py-20 bg-cover bg-center bg-no-repeat overflow-hidden pt-safe-top md:pt-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/DSC09263.png)' }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-light text-white mb-4 md:mb-6 drop-shadow-lg px-2">Blog de Psicología</h1>
                        <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 drop-shadow-md px-2">
                            Artículos especializados sobre salud mental, bienestar emocional y desarrollo personal
                        </p>

                        {/* Búsqueda */}
                        <form onSubmit={handleSearch} className="max-w-md mx-auto px-4 md:px-0">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5" style={{ color: '#706363' }} />
                                <input
                                    type="text"
                                    placeholder="Buscar artículos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 md:pl-10 pr-4 py-3 text-base border rounded-lg"
                                    style={{ borderColor: '#98ada4', backgroundColor: '#f2e7dd', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Posts Destacados */}
            {featuredPosts && featuredPosts.length > 0 && (
                <section className="py-12 md:py-16 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center mb-6 md:mb-8">
                                <Star className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" style={{ color: '#e05353' }} />
                                <h2 className="text-2xl md:text-3xl font-light" style={{ color: '#5f0a3c' }}>Artículos Destacados</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                                {featuredPosts.map((post) => (
                                    <article key={post.id} className="rounded-2xl md:rounded-3xl overflow-hidden active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                        {(post.image_url || post.image) && (
                                            <div className="w-full h-40 md:h-48 overflow-hidden" style={{ backgroundColor: '#f2e7dd' }}>
                                                <img
                                                    src={post.image_url || `/storage/${post.image}`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <div className="p-4 md:p-6">
                                            <div className="flex items-center text-xs md:text-sm mb-2 md:mb-3" style={{ color: '#706363', opacity: 0.8 }}>
                                                <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0" />
                                                <span className="truncate">{formatDate(post.published_at)}</span>
                                                <Clock className="w-3 h-3 md:w-4 md:h-4 ml-3 md:ml-4 mr-1 md:mr-2 flex-shrink-0" />
                                                <span>{post.reading_time} min</span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 line-clamp-2" style={{ color: '#5f0a3c' }}>
                                                {post.title}
                                            </h3>

                                            {post.subtitle && (
                                                <p className="mb-3 md:mb-4 text-sm md:text-base line-clamp-2" style={{ color: '#706363' }}>
                                                    {post.subtitle}
                                                </p>
                                            )}

                                            <p className="mb-3 md:mb-4 text-sm md:text-base line-clamp-3" style={{ color: '#706363' }}>
                                                {post.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="font-medium flex items-center text-sm md:text-base transition-colors"
                                                style={{ color: '#e05353' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                                            >
                                                Leer más
                                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Todos los Posts */}
            <section className="py-12 md:py-16 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl font-light" style={{ color: '#5f0a3c' }}>Todos los Artículos</h2>
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <span className="text-xs md:text-sm" style={{ color: '#706363' }}>
                                    {totalArticles} artículos
                                </span>
                            </div>
                        </div>

                        {!posts?.data || posts.data.length === 0 ? (
                            <div className="text-center py-8 md:py-12">
                                <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" style={{ color: '#98ada4' }} />
                                <h3 className="text-lg md:text-xl font-medium mb-2" style={{ color: '#5f0a3c' }}>No hay artículos</h3>
                                <p className="text-sm md:text-base px-2" style={{ color: '#706363' }}>
                                    Pronto publicaremos contenido especializado sobre psicología clínica.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                {posts.data.map((post) => (
                                    <article key={post.id} className="rounded-2xl md:rounded-3xl overflow-hidden active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                        {(post.image_url || post.image) && (
                                            <div className="w-full h-40 md:h-48 overflow-hidden" style={{ backgroundColor: '#f2e7dd' }}>
                                                <img
                                                    src={post.image_url || `/storage/${post.image}`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <div className="p-4 md:p-6">
                                            <div className="flex items-center justify-between mb-2 md:mb-3">
                                                <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363', opacity: 0.8 }}>
                                                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0" />
                                                    <span className="truncate">{formatDate(post.published_at)}</span>
                                                </div>
                                                <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363', opacity: 0.8 }}>
                                                    <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                                                    <span>{post.reading_time} min</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 line-clamp-2" style={{ color: '#5f0a3c' }}>
                                                {post.title}
                                            </h3>

                                            {post.subtitle && (
                                                <p className="mb-3 md:mb-4 text-sm md:text-base line-clamp-2" style={{ color: '#706363' }}>
                                                    {post.subtitle}
                                                </p>
                                            )}

                                            <p className="mb-3 md:mb-4 text-sm md:text-base line-clamp-3" style={{ color: '#706363' }}>
                                                {post.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="font-medium flex items-center text-sm md:text-base transition-colors"
                                                style={{ color: '#e05353' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
                                            >
                                                Leer más
                                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* Paginación */}
                        {posts?.data && posts.data.length > 0 && posts?.links && (
                            <div className="mt-8 md:mt-12 flex justify-center">
                                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                                    {posts.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors min-h-[36px] md:min-h-0 flex items-center justify-center ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            style={link.active ? {
                                                background: 'linear-gradient(135deg, #98ada4, #e05353)',
                                                color: '#f2e7dd'
                                            } : {
                                                backgroundColor: '#f2e7dd',
                                                color: '#706363',
                                                border: '2px solid #98ada4'
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
            </section>
            <WhatsAppWidget />
        </Layout>
    );
}
