import React, { useState, useEffect, useRef } from 'react';
import CardSwap, { Card } from './CardSwap';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';

interface Testimonial {
  nombre: string;
  testimonio: string;
}

const testimonials: Testimonial[] = [
  {
    nombre: "Cadabra",
    testimonio: "Excelente profesional me ha ayudado en mi proceso psicológico y me ha dado muchas herramientas!! me escucha y ofrece un apoyo incondicional ❤️"
  },
  {
    nombre: "Valeria Arrieta",
    testimonio: "Excelente profesional! Recomiendo su trabajo. Muy amable"
  },
  {
    nombre: "Sofía Mendoza",
    testimonio: "Trabajar con ella ha sido una bendición. Me ha acompañado con empatía, claridad y mucha paciencia. Gracias a su guía, hoy me siento más fuerte y en paz conmigo misma. 💫"
  },
  {
    nombre: "Diego Ramírez",
    testimonio: "Un profesional excepcional. Escucha sin juzgar, ofrece herramientas prácticas y crea un espacio seguro donde puedes ser tú mismo. Totalmente recomendado."
  },
  {
    nombre: "Camila Rojas",
    testimonio: "Desde la primera sesión sentí que estaba en las manos correctas. Es atenta, comprometida y tiene una sensibilidad única para entender lo que uno necesita. ¡Mil gracias por tu apoyo!"
  },
  {
    nombre: "Andrés Fuentes",
    testimonio: "Su enfoque es humano, profesional y muy efectivo. Me ha ayudado a entender patrones que arrastraba hace años. Hoy veo la vida con otra perspectiva. ¡Gracias por tu luz!"
  },
  {
    nombre: "Lucía Morales",
    testimonio: "Es más que una terapeuta: es una guía en el camino del autocuidado. Siempre disponible, empática y con una energía que transmite calma. Sin duda, una de las mejores decisiones que tomé fue contactarla. 🌿"
  }
];

const textColor = '#f2e7dd';

const TestimonialsCarousel: React.FC = () => {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentBackgroundRef = backgroundRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ENTRANDO: Animar la imagen de blanco/negro a color
            if (currentBackgroundRef) {
              gsap.to(currentBackgroundRef, {
                filter: 'grayscale(0%) brightness(100%)',
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                  // Mostrar testimonios inmediatamente
                  setShowTestimonials(true);
                }
              });
            }
          } else {
            // SALIENDO: Animar la imagen de color a blanco/negro
            setShowTestimonials(false);
            if (currentBackgroundRef) {
              gsap.to(currentBackgroundRef, {
                filter: 'grayscale(100%) brightness(150%)',
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in'
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentBackgroundRef) {
      observer.observe(currentBackgroundRef);
    }

    return () => {
      if (currentBackgroundRef) {
        observer.unobserve(currentBackgroundRef);
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="w-full h-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url(/img/maity-testimonio.png)',
        filter: 'grayscale(100%) brightness(150%)',
        opacity: 0
      }}
    >

      {/* Desktop Testimonials View */}
      {showTestimonials && (
        <div className="hidden md:block relative z-10 w-full" style={{ transform: 'translateY(100px)' }}>
          <CardSwap
            cardDistance={90}
            verticalDistance={40}
            delay={5000}
            pauseOnHover={false}
            width={550}
            height={400}
            skewAmount={6}
            easing="elastic"
            onCardClick={(idx) => console.log('Testimonial clicked:', idx)}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <div
                  className="h-full p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(156, 1, 32, 0.92)',
                    backdropFilter: 'blur(10px) saturate(180%)',
                    border: '1px solid rgba(163, 9, 40, 0.9)',
                    boxShadow: '0 8px 32px 0 rgba(255, 7, 58, 0.1), 0 0 20px rgba(255, 7, 58, 0.3)',
                    color: textColor
                  }}
                >
                  {/* Quote icon */}
                  <div className="flex justify-start mb-5">
                    <Quote className="w-12 h-12" style={{ color: textColor, opacity: 0.6 }} />
                  </div>

                  {/* Testimonial text */}
                  <div className="flex-1 mb-5">
                    <p className="text-lg leading-relaxed font-medium" style={{ color: textColor }}>
                      "{testimonial.testimonio}"
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" style={{ color: '#fbbf24' }} />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      )}

      {/* Mobile Testimonials View */}
      {showTestimonials && (
        <div className="md:hidden w-full px-4 py-8 overflow-x-auto">
          <div className="flex gap-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] snap-center testimonial-card-mobile rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(255, 7, 58, 0.5)',
                  backdropFilter: 'blur(10px) saturate(180%)',
                  border: '1px solid rgba(255, 7, 58, 0.6)',
                  boxShadow: '0 8px 32px 0 rgba(255, 7, 58, 0.4), 0 0 20px rgba(255, 7, 58, 0.3)',
                  color: textColor
                }}
              >
                <div className="flex justify-start mb-4">
                  <Quote className="w-8 h-8" style={{ color: textColor, opacity: 0.6 }} />
                </div>
                <div className="flex-1 mb-4">
                  <p className="text-base leading-relaxed font-medium" style={{ color: textColor }}>
                    "{testimonial.testimonio}"
                  </p>
                </div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#fbbf24' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
