import { Link, usePage } from '@inertiajs/react';
import { Home, User, Briefcase, BookOpen, Mail, MessageCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isWhatsApp?: boolean;
}

const navigation: NavItem[] = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Sobre Mí', href: '/about', icon: User },
    { name: 'Servicios', href: '/services', icon: Briefcase },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contacto', href: '/contact', icon: Mail },
    { name: 'WhatsApp', href: '#', icon: MessageCircle, isWhatsApp: true },
];

export default function NavbarMobile() {
    const { url } = usePage();
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const whatsappNumber = '584246287530';

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }
        return url.startsWith(href);
    };

    const openWhatsApp = (message: string) => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsWhatsAppOpen(false);
    };

    // Animación del modal de WhatsApp
    useEffect(() => {
        if (isWhatsAppOpen) {
            gsap.fromTo(
                '.whatsapp-mobile-modal',
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
            );
        }
    }, [isWhatsAppOpen]);

    return (
        <>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg safe-area-bottom">
                <div className="container mx-auto px-2 py-2">
                    <div className="flex justify-around items-center">
                        {navigation.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;

                            if (item.isWhatsApp) {
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => setIsWhatsAppOpen(true)}
                                        className="flex flex-col items-center space-y-1 py-2 px-2 rounded-xl transition-all active:scale-95 min-w-[60px] relative"
                                    >
                                        <div
                                            className="p-2 rounded-lg transition-all duration-300 bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-md"
                                        >
                                            <Icon
                                                className="w-5 h-5 transition-all duration-300"
                                                style={{
                                                    color: '#f2e7dd',
                                                }}
                                            />
                                        </div>
                                        <span
                                            className="text-[10px] font-medium transition-all duration-300 font-semibold"
                                            style={{
                                                color: '#25D366',
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex flex-col items-center space-y-1 py-2 px-2 rounded-xl transition-all active:scale-95 min-w-[60px] relative"
                                >
                                    <div
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            active
                                                ? 'bg-gradient-to-br from-[#98ada4] to-[#e05353] shadow-md'
                                                : 'bg-transparent'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 transition-all duration-300 ${
                                                active ? 'scale-110' : ''
                                            }`}
                                            style={{
                                                color: active ? '#f2e7dd' : '#706363',
                                            }}
                                        />
                                    </div>
                                    <span
                                        className={`text-[10px] font-medium transition-all duration-300 ${
                                            active ? 'font-semibold' : ''
                                        }`}
                                        style={{
                                            color: active ? '#e05353' : '#706363',
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                    {active && (
                                        <div
                                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full transition-all duration-300"
                                            style={{ backgroundColor: '#e05353' }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Modal de WhatsApp para móvil */}
            {isWhatsAppOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                        onClick={() => setIsWhatsAppOpen(false)}
                    />
                    
                    {/* Modal */}
                    <div className="whatsapp-mobile-modal fixed bottom-20 left-4 right-4 z-[60] bg-white rounded-2xl shadow-2xl overflow-hidden md:hidden">
                        {/* Header */}
                        <div 
                            className="p-4 text-white"
                            style={{ 
                                background: 'linear-gradient(135deg, #25D366, #128C7E)'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="/img/logo2blanco.png"
                                        alt="Logo"
                                        className="w-10 h-10 object-contain"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-base">Maity Rincón</h3>
                                        <p className="text-xs text-white/90">Psicología Clínica</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsWhatsAppOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div 
                            className="p-4 max-h-[60vh] overflow-y-auto"
                            style={{ backgroundColor: '#f2e7dd' }}
                        >
                            <p className="text-sm mb-4 text-center" style={{ color: '#706363' }}>
                                ¡Hola! 👋 ¿En qué puedo ayudarte hoy?
                            </p>

                            {/* Opciones */}
                            <div className="space-y-3">
                                {/* Opción 1: Reservar consulta */}
                                <button
                                    onClick={() =>
                                        openWhatsApp(
                                            'Hola, quiero reservar una consulta. ¿Cuál es tu disponibilidad?'
                                        )
                                    }
                                    className="w-full bg-white text-left p-4 rounded-xl shadow-md active:scale-95 transition-all duration-300 border-2"
                                    style={{ borderColor: '#e05353' }}
                                >
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">📅</span>
                                        <div>
                                            <p 
                                                className="font-semibold"
                                                style={{ color: '#706363' }}
                                            >
                                                Quiero reservar consulta
                                            </p>
                                            <p className="text-xs mt-1" style={{ color: '#706363' }}>
                                                Agenda tu primera sesión
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                {/* Opción 2: Paciente existente */}
                                <button
                                    onClick={() =>
                                        openWhatsApp(
                                            'Hola, soy paciente y necesito agendar otra consulta.'
                                        )
                                    }
                                    className="w-full bg-white text-left p-4 rounded-xl shadow-md active:scale-95 transition-all duration-300 border-2"
                                    style={{ borderColor: '#98ada4' }}
                                >
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">🩺</span>
                                        <div>
                                            <p 
                                                className="font-semibold"
                                                style={{ color: '#706363' }}
                                            >
                                                Soy paciente
                                            </p>
                                            <p className="text-xs mt-1" style={{ color: '#706363' }}>
                                                Necesito otra consulta
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #98ada4' }}>
                                <p className="text-xs text-center" style={{ color: '#706363' }}>
                                    Responderemos lo antes posible 💜
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

