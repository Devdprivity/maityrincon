import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from '@inertiajs/react';

// Lazy load GSAP y PartnersCarousel
let gsap: typeof import('gsap').gsap | null = null;
const loadGSAP = async (): Promise<typeof import('gsap').gsap> => {
    if (!gsap) {
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap;
    }
    return gsap;
};

const PartnersCarousel = lazy(() => import('./PartnersCarousel'));

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const circleGroupRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const [animationComplete, setAnimationComplete] = useState(false);

    // 🔹 Animación inicial del logo + círculo + texto
    useEffect(() => {
        if (!heroRef.current) return;

        // Cargar GSAP de forma asíncrona
        loadGSAP().then((gsap) => {
            const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

            // Círculo + logo aparecen juntos (animación más rápida)
            tl.fromTo(
                circleGroupRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
            );

            // Se mueven hacia la izquierda (más rápido)
            tl.to(circleGroupRef.current, {
                x: -200,
                duration: 0.8
            });

            // Aparece texto "Maity Rincón" (más rápido)
            tl.fromTo(
                textRef.current,
                { x: -300, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6 },
                "-=0.6"
            );

            // Breve pausa (reducida)
            tl.to({}, { duration: 0.3 });

            // Suben juntos con sincronización (más rápido)
            tl.to([circleGroupRef.current, textRef.current], {
                y: -400,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    setAnimationComplete(true);
                    window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
                }
            });

            // Aparece fondo
            tl.fromTo(
                backgroundRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: "power2.out" },
                "-=1"
            );
        });
    }, []);

    // 🔹 Animación de texto y botones escalonada
    useEffect(() => {
        if (animationComplete && contentRef.current) {
            loadGSAP().then((gsap) => {
                const lines = contentRef.current?.querySelectorAll('.fade-line');
                if (lines) {
                    gsap.fromTo(
                        lines,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: "power2.out"
                        }
                    );
                }
            });
        }
    }, [animationComplete]);

    return (
        <section
            ref={heroRef}
            className="w-full h-full relative flex items-end md:items-center justify-start overflow-hidden pb-24 md:pb-0"
        >
            {/* Fondo */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-[url('/img/mobile/hero-mobile.png')] md:bg-[url('/img/maity-hero.png')]"
                style={{
                    opacity: animationComplete ? 1 : 0
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Círculo + Logo */}
            <div
                ref={circleGroupRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
                <div
                    ref={circleRef}
                    className="w-32 h-32 rounded-full shadow-2xl flex items-center justify-center relative"
                    style={{ background: 'linear-gradient(135deg, #f2e7dd, #e05353)' }}
                >
                    <img
                        ref={logoRef}
                        src="/img/15-8.png"
                        alt="Maity Rincón"
                        className="w-16 h-16 object-contain z-30"
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>
            </div>

            {/* Texto “Maity Rincón” animado */}
            <div
                ref={textRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-32 z-20"
            >
                <h1
                    className="text-4xl md:text-6xl font-light text-[#f2e7dd] drop-shadow-lg"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.85), 0 0 12px rgba(0,0,0,0.7)' }}
                >
                    Maity Rincón
                </h1>
            </div>

            {/* Contenido final alineado completamente a la izquierda */}
            {animationComplete && (
                <div
                    ref={contentRef}
                    className="relative z-30 max-w-2xl pl-4 pr-4 md:pl-24 lg:pl-32 text-left mx-auto md:mx-0"
                >
                    <div className="mb-6 md:mb-10">
                        <h2 className="fade-line text-xl md:text-5xl font-light text-white mb-4 leading-tight drop-shadow-lg px-4 md:px-0">
                            <span className="block font-bold text-xl md:text-5xl mb-2" style={{ color: '#f2e7dd' }}>
                                Consulta psicológica online & presencial
                            </span>
                            <span className="block font-medium text-base md:text-2xl mb-3" style={{ color: '#f2e7dd' }}>
                                Terapia psicológica individual, pareja y familia
                            </span>
                        </h2>

                        <p className="fade-line text-xs md:text-lg max-w-xl leading-relaxed drop-shadow-md mb-6 md:mb-4 font-medium px-4 md:px-0" style={{ color: '#f2e7dd' }}>
                            Trauma • Estrés • Duelo • Depresión • Ansiedad • Autoestima • Fobias
                        </p>


                    </div>

                    <div className="fade-line flex flex-col gap-2.5 md:flex-row md:gap-4 items-stretch md:items-start px-4 md:px-0">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-4 py-2.5 md:px-6 md:py-3 font-normal rounded-lg md:rounded-full transition-colors duration-200 text-sm md:text-base"
                            style={{
                                backgroundColor: '#f2e7dd',
                                color: '#5f0a3c'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#e8ddd0';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f2e7dd';
                            }}
                        >
                            <span>Conoce mis Servicios</span>
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-4 py-2.5 md:px-6 md:py-3 bg-transparent font-normal rounded-lg md:rounded-full border transition-colors duration-200 text-sm md:text-base"
                            style={{
                                borderColor: '#98ada4',
                                color: '#f2e7dd'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.15)';
                                e.currentTarget.style.borderColor = '#98ada4';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.borderColor = '#98ada4';
                            }}
                        >
                            <span>Agenda una Consulta</span>
                        </Link>
                    </div>
                </div>
            )}


            {/* Swipe Down Indicator */}
            {animationComplete && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
                    <p className="text-sm mb-2 font-medium drop-shadow-md" style={{ color: '#f2e7dd' }}>Desliza hacia abajo</p>
                    <div className="flex flex-col gap-2">
                        <svg
                            className="w-8 h-8 animate-pulse"
                            fill="none"
                            stroke="#e05353"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </section>
    );
}
