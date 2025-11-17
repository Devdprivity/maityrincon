import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const partners = [
    '/img/partners/drjuaarrieta.webp',
    '/img/partners/Fiverr-logo-01.png',
    '/img/partners/masquemedicos.webp',
    '/img/partners/psicologos y mente.webp',
    '/img/partners/psicologos.webp',
    '/img/partners/sello de calidad.webp',
    '/img/partners/tupsicosalud.jpg',
    '/img/partners/uru-logo-maracaibo.png',
    '/img/partners/workplaceoptions.svg',
  ];

  useEffect(() => {
    if (!trackRef.current || loadedImages.length === 0) return;

    const track = trackRef.current;

    // Esperar a que las imágenes estén renderizadas
    setTimeout(() => {
      const contentWidth = track.scrollWidth;
      const duplicatedContent = track.innerHTML;
      track.innerHTML += duplicatedContent;

      // Calcular duración proporcional (para mantener velocidad constante)
      const pixelsPerSecond = 60; // velocidad suave (px por segundo)
      const totalDuration = contentWidth / pixelsPerSecond;

      // Animación infinita sin cortes
      gsap.set(track, { x: 0, opacity: 0 });
      gsap.to(track, { opacity: 1, duration: 1, ease: 'power1.out' });

      const animation = gsap.to(track, {
        x: -contentWidth / 2,
        duration: totalDuration,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % -(contentWidth / 2)), // movimiento infinito continuo
        },
      });

      const pauseOnHover = () => animation.pause();
      const resumeOnLeave = () => animation.resume();

      track.addEventListener('mouseenter', pauseOnHover);
      track.addEventListener('mouseleave', resumeOnLeave);

      return () => {
        animation.kill();
        track.removeEventListener('mouseenter', pauseOnHover);
        track.removeEventListener('mouseleave', resumeOnLeave);
      };
    }, 600);
  }, [loadedImages]);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => [...prev, src]);
  };

  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl px-4">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center"
          style={{ width: 'max-content', gap: '2rem' }}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '150px', height: '80px' }}
            >
              <img
                src={partner}
                alt={`Partner ${index + 1}`}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                loading="lazy"
                onLoad={() => handleImageLoad(partner)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
