import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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

export default function CommentsEdit({ comment }: Props) {
    const form = useForm({
        content: comment.content,
        approved: comment.approved,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Comentarios',
            href: '/admin/comments',
        },
        {
            title: 'Editar Comentario',
            href: `/admin/comments/${comment.id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(`/admin/comments/${comment.id}`, {
            onSuccess: () => {
                // Redirect to show or index
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Comentario - ${comment.user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Header */}
                        <div className="border-b border-gray-200 bg-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/admin/comments"
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Link>
                                    <h1 className="text-2xl font-medium text-gray-900">
                                        Editar Comentario de {comment.user.name}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Información del Post */}
                        <div className="border-b border-gray-200 bg-gray-50 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Post relacionado</h3>
                                    <p className="text-lg font-semibold text-gray-900">{comment.post.title}</p>
                                </div>
                                <Link
                                    href={`/admin/posts/${comment.post.id}`}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Ver Post
                                </Link>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            {/* Información del Usuario y Post (solo lectura) */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Usuario
                                    </label>
                                    <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
                                        {comment.user.name} (
                                        {comment.user.email})
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Post
                                    </label>
                                    <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
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
                                    </div>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div>
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contenido del Comentario
                                </label>
                                <textarea
                                    id="content"
                                    rows={6}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={form.data.content}
                                    onChange={(e) =>
                                        form.setData('content', e.target.value)
                                    }
                                    required
                                />
                                {form.errors.content && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {form.errors.content}
                                    </p>
                                )}
                            </div>

                            {/* Aprobado */}
                            <div className="flex items-center">
                                <input
                                    id="approved"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={form.data.approved}
                                    onChange={(e) =>
                                        form.setData(
                                            'approved',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor="approved"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Comentario aprobado
                                </label>
                            </div>

                            {/* Botones */}
                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href="/admin/comments"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-900 disabled:opacity-25"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
