import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingParticlesProps {
    count?: number;
    className?: string;
}

export default function FloatingParticles({ count = 8, className = '' }: FloatingParticlesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const particles = Array.from(containerRef.current.children);
            
            // Configurar estado inicial
            gsap.set(particles, { 
                opacity: 0, 
                scale: 0,
                rotation: 0
            });

            // Animación de entrada
            gsap.to(particles, {
                opacity: 1,
                scale: 1,
                duration: 2,
                stagger: 0.3,
                ease: "power2.out",
                delay: 0.5
            });

            // Animación continua de flotación
            particles.forEach((particle) => {
                const tl = gsap.timeline({ repeat: -1 });
                
                tl.to(particle, {
                    y: `random(-30, 30)`,
                    x: `random(-15, 15)`,
                    rotation: `random(-180, 180)`,
                    duration: `random(4, 8)`,
                    ease: "sine.inOut"
                })
                .to(particle, {
                    y: `random(-20, 20)`,
                    x: `random(-10, 10)`,
                    rotation: `random(-90, 90)`,
                    duration: `random(3, 6)`,
                    ease: "sine.inOut"
                }, "-=2");
            });
        }
    }, [count]);

    const particles = Array.from({ length: count }, (_, i) => {
        const colors = [
            'from-pink-200/40 to-purple-200/40',
            'from-blue-200/30 to-green-200/30',
            'from-yellow-200/35 to-pink-200/35',
            'from-purple-200/25 to-blue-200/25',
            'from-green-200/30 to-yellow-200/30'
        ];
        
        const sizes = ['w-4 h-4', 'w-6 h-6', 'w-8 h-8', 'w-3 h-3', 'w-5 h-5'];
        const positions = [
            'top-1/4 left-1/4',
            'top-1/3 right-1/3',
            'bottom-1/3 left-1/3',
            'top-1/2 right-1/4',
            'bottom-1/4 right-1/5',
            'top-1/5 left-1/5',
            'bottom-1/2 left-1/4',
            'top-2/3 right-1/5'
        ];

        return (
            <div
                key={i}
                className={`absolute ${positions[i % positions.length]} ${sizes[i % sizes.length]} bg-gradient-to-br ${colors[i % colors.length]} rounded-full particle`}
                style={{
                    filter: 'blur(1px)',
                }}
            />
        );
    });

    return (
        <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
            {particles}
        </div>
    );
}
