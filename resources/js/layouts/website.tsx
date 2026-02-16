import { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavbarMobile from '@/components/NavbarMobile';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    hideFooterOnMobile?: boolean;
}

export default function Layout({ children, title, hideFooterOnMobile = false }: LayoutProps) {
    const { url } = usePage();

    // Rutas donde el footer debe estar oculto en móvil
    const hiddenFooterRoutes = ['/blog', '/about', '/contact', '/services'];
    const shouldHideFooter = hideFooterOnMobile || hiddenFooterRoutes.some(route => url.startsWith(route));

    return (
        <>
            <Head title={title} />
            <div className="relative min-h-screen flex flex-col bg-[#f2e7dd]">
                {/* Header fijo - oculto en mobile */}
                <div className="hidden md:block">
                    <Header />
                </div>
                <main className="pb-safe-bottom-mobile">
                    {children}
                </main>
                <div className={shouldHideFooter ? "hidden md:block" : ""}>
                    <Footer />
                </div>
                <NavbarMobile />
            </div>
        </>
    );
}
