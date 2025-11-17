'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Question {
  id: number;
  text: string;
  answer: string;
  x: string;
  y: string;
  shape: string;
}

export default function InteractiveQuestions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // 🔹 Desplazamiento global para subir todas las preguntas
  const verticalOffset = -60;

  // Forma SVG disponible para las preguntas
  const questionShape = '/img/questions/questionm2.svg';

  const questions: Question[] = [
    // Preguntas del lado derecho
    { id: 1, text: '¿Terapia online?', answer: 'Ofrezco servicios de terapia psicológica online para brindar comodidad y accesibilidad a aquellos que prefieren recibir atención desde la comodidad de su hogar u oficina.', x: '68%', y: '15%', shape: questionShape },
    { id: 3, text: '¿Duración de sesiones?', answer: 'La duración de una sesión de terapia conmigo suele ser entre 60 minutos y 75 minutos, aunque puedo ajustar la duración según tus necesidades individuales.', x: '75%', y: '35%', shape: questionShape },
    { id: 5, text: '¿Cómo agendar cita?', answer: 'Puedes agendar una cita conmigo para una consulta psicológica escribiéndome a mi número de contacto vía WhatsApp +58 4246287530.', x: '72%', y: '55%', shape: questionShape },
    { id: 7, text: '¿Qué enfoque usas?', answer: 'Utilizo un enfoque cognitivo-conductual, el cual se centra en identificar y cambiar patrones de pensamiento y comportamiento que puedan estar contribuyendo a tus dificultades emocionales. Este enfoque colaborativo y basado en la evidencia se adapta a tus necesidades únicas para promover tu crecimiento y bienestar emocional.', x: '76%', y: '70%', shape: questionShape },
    { id: 9, text: '¿Qué problemas tratas?', answer: 'En mi práctica, trato una amplia variedad de problemas, incluyendo ansiedad, depresión, estrés, problemas de relaciones interpersonales, duelos, procesos de adaptación, autoestima y regulación emocional.', x: '68%', y: '85%', shape: questionShape },
 
    // Preguntas del lado izquierdo - más separadas y más hacia la izquierda
    { id: 10, text: '¿Ventajas presencial?', answer: 'Las ventajas de la terapia psicológica presencial incluyen una conexión más personal y directa conmigo como terapeuta, lo que facilita una comunicación más fluida y una comprensión más profunda de tus preocupaciones.', x: '28%', y: '15%', shape: questionShape },
    { id: 8, text: '¿Primera sesión?', answer: 'Durante nuestra primera sesión de terapia, puedes tener la oportunidad de compartir tus preocupaciones y objetivos terapéuticos conmigo, y juntos comenzaremos a desarrollar un plan de tratamiento personalizado.', x: '26%', y: '35%', shape: questionShape },
    { id: 2, text: '¿Consultas presenciales?', answer: 'Sí, ofrezco consultas psicológicas presenciales en un ambiente acogedor y confidencial. Durante estas sesiones, trabajo directamente contigo para abordar tus preocupaciones emocionales, mentales o conductuales. Creo en la importancia del contacto personal durante la terapia, facilitando así una comunicación más cercana y efectiva para tu bienestar integral.', x: '30%', y: '55%', shape: questionShape },
    { id: 4, text: '¿Confidencialidad?', answer: 'Respeto y protejo la confidencialidad de toda la información compartida durante las sesiones de terapia, cumpliendo las leyes y regulaciones de privacidad de datos. Las consultas son un espacio seguro para que puedas expresar abiertamente tu sentir.', x: '28%', y: '75%', shape: questionShape },
    { id: 6, text: '¿Más información?', answer: 'Para obtener más información sobre mis servicios y cómo puedo ayudarte, no dudes en contactarme directamente a través del WhatsApp o completando el formulario de contacto en mi sitio web. Estoy aquí para responder todas tus preguntas y ayudarte en tu proceso de búsqueda de apoyo emocional.', x: '32%', y: '90%', shape: questionShape },
  ];


  // Animación de entrada y salida con IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ENTRANDO: Animar preguntas una por una en secuencia
            setTimeout(() => {
              const qElements = containerRef.current?.querySelectorAll('.question-bubble');
              if (qElements) {
                gsap.fromTo(
                  qElements,
                  { opacity: 0, y: 20, scale: 0.9 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'back.out(1.6)',
                    onComplete: () => {
                      // Agregar flotación después de que aparezcan (más pronunciada)
                      qElements.forEach((el, i) => {
                        gsap.to(el, {
                          y: '+=20',
                          repeat: -1,
                          yoyo: true,
                          ease: 'sine.inOut',
                          duration: 2 + i * 0.3
                        });
                      });
                    }
                  }
                );
              }
            }, 100);
          } else {
            // SALIENDO: Animar preguntas en secuencia inversa
            const qElements = containerRef.current?.querySelectorAll('.question-bubble');
            if (qElements) {
              // Detener animaciones de flotación
              gsap.killTweensOf(qElements);

              gsap.to(
                qElements,
                {
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                  duration: 0.5,
                  stagger: {
                    each: 0.1,
                    from: "end" // Empieza desde el último elemento
                  },
                  ease: 'power2.in'
                }
              );
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  // Cierre del modal
  const handleClose = () => {
    if (!activeQuestion) return;
    const modal = document.querySelector('.modal-box');
    gsap.to(modal, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'power2.in', onComplete: () => setActiveQuestion(null) });
  };

  // Apertura del modal
  useEffect(() => {
    if (activeQuestion) {
      gsap.fromTo('.modal-box', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    }
  }, [activeQuestion]);

  return (
    <section ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f2e7dd' }}>

      {/* Imagen de fondo */}
      <img src="/img/DSC09226.png" alt="Fondo Maity" className="absolute inset-0 w-full h-full object-contain object-center z-0 hidden md:block" />


      {/* Vista móvil */}
      <div className="block md:hidden text-center z-10 px-6">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl text-green-600">?</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#5f0a3c' }}>Preguntas Frecuentes</h2>
          <p className="text-lg mb-8" style={{ color: '#706363' }}>Encuentra respuestas a tus dudas</p>
        </div>
        <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
          {questions.slice(0, 6).map((q) => (
            <button
              key={q.id}
              className="text-sm px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left font-bold border-2"
              style={{ 
                backgroundColor: '#e05353',
                color: '#f2e7dd',
                borderColor: '#5f0a3c'
              }}
              onClick={() => setActiveQuestion(q)}
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Preguntas flotantes con formas SVG */}
      {questions.map((q) => (
        <button
          key={q.id}
          className="question-bubble absolute hover:scale-110 transition-all duration-300 hidden md:block z-40 group"
          style={{
            left: q.x,
            top: `calc(${q.y} + ${verticalOffset}px)`,
            transform: 'translate(-50%, -50%)',
            width: '240px',
            height: '120px',
          }}
          onClick={() => setActiveQuestion(q)}
        >
          {/* Forma SVG de fondo */}
          <div className="relative w-full h-full">
            <img
              src={q.shape}
              alt="Question shape"
              className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
            />
            
            {/* Texto superpuesto */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center max-w-full px-3">
                <span className="text-xs font-bold leading-tight break-words hyphens-auto" style={{ color: '#5f0a3c' }}>
                  {q.text}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}

      {/* Modal */}
      {activeQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="modal-box rounded-2xl shadow-2xl max-w-lg p-8 relative" style={{ backgroundColor: '#f2e7dd', color: '#706363', transformOrigin: 'center' }}>
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#e05353' }}>{activeQuestion.text}</h3>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#706363' }}>{activeQuestion.answer}</p>
            <button onClick={handleClose} className="absolute top-3 right-3 text-2xl transition" style={{ color: '#98ada4' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'} onMouseLeave={(e) => e.currentTarget.style.color = '#98ada4'}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
