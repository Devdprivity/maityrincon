import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Edit,
    FileText,
    Trash2,
    User,
    XCircle,
} from 'lucide-react';
import Layout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
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
    updated_at: string;
    user: User;
    post: Post;
}

interface Props {
    comment: Comment;
}

export default function CommentsShow({ comment }: Props) {
    const handleApprovalToggle = () => {
        router.patch(
            route('admin.comments.toggle-approval', comment.id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            router.delete(route('admin.comments.destroy', comment.id));
        }
    };

    return (
        <Layout title={`Comentario - ${comment.user.name}`}>
            <Head title={`Comentario - ${comment.user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Header */}
                        <div className="border-b border-gray-200 bg-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('admin.comments.index')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Link>
                                    <h1 className="text-2xl font-medium text-gray-900">
                                        Comentario de {comment.user.name}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={route(
                                            'admin.comments.edit',
                                            comment.id,
                                        )}
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-900"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar
                                    </Link>
                                    <button
                                        onClick={handleApprovalToggle}
                                        className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition duration-150 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                                            comment.approved
                                                ? 'bg-yellow-600 text-white hover:bg-yellow-700 focus:bg-yellow-700 focus:ring-yellow-500'
                                                : 'bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 focus:ring-green-500'
                                        }`}
                                    >
                                        {comment.approved ? (
                                            <>
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Desaprobar
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Aprobar
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none active:bg-red-900"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Información del Usuario */}
                                <div className="rounded-lg bg-gray-50 p-6">
                                    <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                        <User className="mr-2 h-5 w-5" />
                                        Información del Usuario
                                    </h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Nombre
                                            </dt>
                                            <dd className="text-sm text-gray-900">
                                                {comment.user.name}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Email
                                            </dt>
                                            <dd className="text-sm text-gray-900">
                                                {comment.user.email}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Información del Post */}
                                <div className="rounded-lg bg-gray-50 p-6">
                                    <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Información del Post
                                    </h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Título
                                            </dt>
                                            <dd className="text-sm text-gray-900">
                                                <Link
                                                    href={route(
                                                        'blog.show',
                                                        comment.post.slug,
                                                    )}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    target="_blank"
                                                >
                                                    {comment.post.title}
                                                </Link>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Estado
                                            </dt>
                                            <dd className="text-sm text-gray-900">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        comment.approved
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {comment.approved
                                                        ? 'Aprobado'
                                                        : 'Pendiente'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Contenido del Comentario */}
                            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">
                                    Contenido del Comentario
                                </h3>
                                <div className="prose prose-sm max-w-none">
                                    <p className="whitespace-pre-wrap text-gray-700">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>

                            {/* Metadatos */}
                            <div className="mt-6 rounded-lg bg-gray-50 p-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">
                                    Metadatos
                                </h3>
                                <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Creado
                                        </dt>
                                        <dd className="flex items-center text-sm text-gray-900">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {format(
                                                new Date(comment.created_at),
                                                'dd/MM/yyyy HH:mm',
                                                { locale: es },
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Última actualización
                                        </dt>
                                        <dd className="flex items-center text-sm text-gray-900">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {format(
                                                new Date(comment.updated_at),
                                                'dd/MM/yyyy HH:mm',
                                                { locale: es },
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
