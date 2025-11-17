import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideLeft' | 'slideRight';
}

export default function AnimatedText({ 
    children, 
    delay = 0, 
    duration = 1, 
    className = '',
    animation = 'fadeIn'
}: AnimatedTextProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const element = textRef.current;
            
            // Configurar estado inicial según el tipo de animación
            switch (animation) {
                case 'fadeIn':
                    gsap.set(element, { opacity: 0 });
                    break;
                case 'slideUp':
                    gsap.set(element, { opacity: 0, y: 50 });
                    break;
                case 'scaleIn':
                    gsap.set(element, { opacity: 0, scale: 0.8 });
                    break;
                case 'slideLeft':
                    gsap.set(element, { opacity: 0, x: -50 });
                    break;
                case 'slideRight':
                    gsap.set(element, { opacity: 0, x: 50 });
                    break;
            }

            // Crear timeline para la animación
            const tl = gsap.timeline({ delay });
            
            switch (animation) {
                case 'fadeIn':
                    tl.to(element, { opacity: 1, duration, ease: "power2.out" });
                    break;
                case 'slideUp':
                    tl.to(element, { opacity: 1, y: 0, duration, ease: "power3.out" });
                    break;
                case 'scaleIn':
                    tl.to(element, { opacity: 1, scale: 1, duration, ease: "back.out(1.7)" });
                    break;
                case 'slideLeft':
                    tl.to(element, { opacity: 1, x: 0, duration, ease: "power2.out" });
                    break;
                case 'slideRight':
                    tl.to(element, { opacity: 1, x: 0, duration, ease: "power2.out" });
                    break;
            }
        }
    }, [delay, duration, animation]);

    return (
        <div ref={textRef} className={className}>
            {children}
        </div>
    );
}
