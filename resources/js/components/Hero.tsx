import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import PartnersCarousel from './PartnersCarousel';

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

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        // Círculo + logo aparecen juntos
        tl.fromTo(
            circleGroupRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
        );

        // Se mueven hacia la izquierda
        tl.to(circleGroupRef.current, {
            x: -200,
            duration: 1.2
        });

        // Aparece texto "Maity Rincón"
        tl.fromTo(
            textRef.current,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 },
            "-=0.8"
        );

        // Breve pausa
        tl.to({}, { duration: 0.5 });

        // Suben juntos con sincronización
        tl.to([circleGroupRef.current, textRef.current], {
            y: -400,
            opacity: 0,
            duration: 1.5,
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

    }, []);

    // 🔹 Animación de texto y botones escalonada
    useEffect(() => {
        if (animationComplete && contentRef.current) {
            const lines = contentRef.current.querySelectorAll('.fade-line');
            gsap.fromTo(
                lines,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.25,
                    ease: "power3.out"
                }
            );
        }
    }, [animationComplete]);

    return (
        <section
            ref={heroRef}
            className="w-full h-full relative flex items-center justify-start overflow-hidden"
        >
            {/* Fondo */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: 'url(/img/hero-bg.jpg)',
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
                    style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}
                >
                    <img
                        ref={logoRef}
                        src="/img/logo2blanco.png"
                        alt="Maity Rincón"
                        className="w-16 h-16 object-contain z-30"
                    />
                </div>
            </div>

            {/* Texto “Maity Rincón” animado */}
            <div
                ref={textRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-32 z-20"
            >
                <h1
                    className="text-4xl md:text-6xl font-light text-white drop-shadow-lg"
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
                        <h2 className="fade-line text-2xl md:text-5xl font-light text-white mb-4 leading-tight drop-shadow-lg px-4 md:px-0">
                            <span className="block font-bold text-2xl md:text-5xl mb-2" style={{ color: '#f2e7dd' }}>
                                Consulta psicológica online & presencial
                            </span>
                            <span className="block font-medium text-lg md:text-2xl mb-3" style={{ color: '#f2e7dd' }}>
                                Terapia psicológica individual, pareja y familia
                            </span>
                        </h2>

                        <p className="fade-line text-sm md:text-lg max-w-xl leading-relaxed drop-shadow-md mb-6 md:mb-4 font-medium px-4 md:px-0" style={{ color: '#f2e7dd' }}>
                            Trauma • Estrés • Duelo • Depresión • Ansiedad • Autoestima • Fobias
                        </p>


                    </div>

                    <div className="fade-line flex flex-col gap-3 md:flex-row md:gap-4 items-stretch md:items-start px-4 md:px-0">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-6 py-4 md:px-8 backdrop-blur-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group min-h-[56px] text-base md:text-lg"
                            style={{ 
                                backgroundColor: '#f2e7dd',
                                color: '#5f0a3c'
                            }}
                        >
                            <span>Conoce mis Servicios</span>
                            <svg
                                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-4 md:px-8 bg-transparent text-white font-medium rounded-full border-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[56px] text-base md:text-lg"
                            style={{ 
                                borderColor: '#98ada4',
                                color: '#f2e7dd'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(152, 173, 164, 0.2)';
                                e.currentTarget.style.borderColor = '#e05353';
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

            {/* Partners Carousel */}
            {animationComplete && <PartnersCarousel />}

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
