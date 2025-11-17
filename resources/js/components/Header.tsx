import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLElement | null)[]>([]);
    const loginRef = useRef<HTMLDivElement>(null);

    const navigation = [
        { name: 'Inicio', href: '/', current: false },
        { name: 'Sobre Mí', href: '/about', current: false },
        { name: 'Servicios', href: '/services', current: false },
        { name: 'Blog', href: '/blog', current: false },
        { name: 'Contacto', href: '/contact', current: false },
    ];

    useEffect(() => {
        const handleHeroComplete = () => {
            setIsVisible(true);
            animateHeaderElements();
        };

        window.addEventListener('heroAnimationComplete', handleHeroComplete);
        
        // Si no hay evento hero en 100ms, mostrar el header de todas formas
        const timeout = setTimeout(() => {
            if (!isVisible) {
                setIsVisible(true);
                animateHeaderElements();
            }
        }, 100);

        return () => {
            window.removeEventListener('heroAnimationComplete', handleHeroComplete);
            clearTimeout(timeout);
        };
    }, [isVisible]);

    const animateHeaderElements = () => {
        if (!headerRef.current) return;
        const tl = gsap.timeline();

        if (logoRef.current) {
            tl.fromTo(
                logoRef.current,
                { y: -100, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
            );
        }

        navItemsRef.current.forEach((item) => {
            if (item) {
                tl.fromTo(
                    item,
                    { y: -80, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
                    '-=0.4'
                );
            }
        });

        if (loginRef.current) {
            tl.fromTo(
                loginRef.current,
                { y: -60, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
                '-=0.3'
            );
        }
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* ✅ Eliminado todo fondo — 100% transparente */}
            <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div ref={logoRef} className="flex-shrink-0">
                        <Link href="/" className="flex items-center group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/40 shadow-md group-hover:shadow-lg transition-all duration-300 overflow-visible">
                                <img
                                    src="/img/logonegro.png"
                                    alt="Maity Rincón"
                                    className="h-16 w-16 object-contain scale-150"
                                />
                            </div>
                            <span className="ml-3 text-xl font-semibold text-[#ffffff] drop-shadow-lg group-hover:text-[#7B8E8C] transition-colors duration-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)' }}>
                              Maity Rincon Reinberg
                            </span>
                        </Link>
                    </div>

                    {/* Navegación Desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    ref={(el: HTMLAnchorElement | null) => {
                                        if (el) navItemsRef.current[index] = el;
                                    }}
                                    className="px-3 py-2 text-sm font-medium text-[#EAEAEA] drop-shadow-lg transition-all duration-300 hover:text-white hover:scale-105 relative group"
                                    style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }}
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#EAEAEA] to-white group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}

                            {/* Botón de Login */}
                            <div ref={loginRef}>
                                <Link
                                    href="/login"
                                    className="group flex items-center space-x-2 font-medium text-[#EAEAEA] drop-shadow-sm transition-all duration-300 hover:text-white hover:scale-105"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/40 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        <svg
                                            className="h-4 w-4 text-[#EAEAEA] group-hover:text-white transition-colors duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.5)' }}>Iniciar Sesión</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Botón menú móvil */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:ring-2 focus:ring-white/50 transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/60 backdrop-blur-md rounded-b-xl shadow-xl border-t border-white/20">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:text-white hover:bg-white/10 rounded-md"
                                    style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)' }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                className="flex items-center space-x-2 px-3 py-2 font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 shadow-md">
                                    <svg
                                        className="h-4 w-4 text-white/80"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <span style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)' }}>Iniciar Sesión</span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
