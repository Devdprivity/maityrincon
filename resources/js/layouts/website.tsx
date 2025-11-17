import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavbarMobile from '@/components/NavbarMobile';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="relative">
                {/* Header fijo - oculto en mobile */}
                <div className="hidden md:block">
                    <Header />
                </div>
                <main className="pb-safe-bottom-mobile">
                    {children}
                </main>
                <Footer />
                <NavbarMobile />
            </div>
        </>
    );
}
