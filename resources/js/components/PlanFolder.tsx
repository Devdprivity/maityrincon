import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Footer from "./Footer";

interface Plan {
  name: string;
  price: string;
  description: string;
}

const plansOnline: Plan[] = [
  {
    name: "Terapia Psicológica Online - Individual",
    price: "$50/mes",
    description: "Sesiones personalizadas de psicoterapia online para tu crecimiento personal, manejo de ansiedad, autoestima y bienestar emocional. Atención confidencial y adaptada a tus necesidades individuales. Ideal para quienes buscan apoyo psicológico profesional desde casa."
  },
  {
    name: "Terapia Psicológica Online - Pareja",
    price: "$60/mes",
    description: "Terapia psicológica online para parejas que desean fortalecer su comunicación, resolver conflictos y mejorar la relación. Enfoque profesional en vínculos afectivos, confianza y crecimiento conjunto. Mejora tu relación de pareja con acompañamiento experto."
  },
  {
    name: "Terapia Psicológica Online - Familiar",
    price: "$80/mes",
    description: "Intervención psicológica online para familias que buscan mejorar la convivencia, resolver dificultades y promover el bienestar emocional de todos sus miembros. Espacio seguro para abordar dinámicas familiares, crianza y apoyo integral con enfoque profesional."
  },
];

const plansPresencial: Plan[] = [
  {
    name: "Terapia Psicológica Presencial - Individual",
    price: "$50/mes",
    description: "Sesiones personalizadas de psicoterapia presencial para tu crecimiento personal, manejo de ansiedad, autoestima y bienestar emocional. Atención confidencial y adaptada a tus necesidades individuales. Ambiente seguro y profesional en consultorio para tu bienestar emocional."
  },
  {
    name: "Terapia Psicológica Presencial - Pareja",
    price: "$70/mes",
    description: "Terapia psicológica presencial para parejas que desean fortalecer su comunicación, resolver conflictos y mejorar la relación. Enfoque profesional en vínculos afectivos, confianza y crecimiento conjunto. Mejora tu relación de pareja con acompañamiento experto en un espacio presencial."
  },
  {
    name: "Terapia Psicológica Presencial - Familiar",
    price: "$100/mes",
    description: "Intervención psicológica presencial para familias que buscan mejorar la convivencia, resolver dificultades y promover el bienestar emocional de todos sus miembros. Espacio seguro y confortable en consultorio para abordar dinámicas familiares, crianza y apoyo integral con enfoque profesional."
  },
];

const PlanFolder: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [planType, setPlanType] = useState<"online" | "presencial">("online");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const plans = planType === "online" ? plansOnline : plansPresencial;

  const handlePlanClick = (plan: Plan) => setSelectedPlan(plan);
  const closeModal = () => setSelectedPlan(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando entra en vista: animar desde abajo
            setTimeout(() => {
              gsap.fromTo(
                ".plan-card",
                {
                  y: 100,
                  opacity: 0,
                  scale: 0.8
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  stagger: 0.2,
                  ease: "back.out(1.7)"
                }
              );
            }, 100);
          } else {
            // Cuando sale de vista: animación completamente fluida
            gsap.to(
              ".plan-card",
              {
                opacity: 0,
                duration: 0.3,
                stagger: {
                  each: 0.03,
                  from: "start"
                },
                ease: "power1.out"
              }
            );
          }
        });
      },
      { threshold: 0.3 } // Se activa cuando el 30% del componente es visible
    );

    observer.observe(currentContainer);

    return () => {
      observer.unobserve(currentContainer);
    };
  }, []);

  // Animación cuando cambia el tipo de plan
  useEffect(() => {
    gsap.fromTo(
      ".plan-card",
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }
    );
  }, [planType]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/img/maity-price.png')" }}
    >
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-center pt-20">
        {/* Pestañas para cambiar entre online y presencial */}
        <div className="mb-8 flex gap-4 backdrop-blur-sm rounded-full p-2 shadow-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
          <button
            onClick={() => setPlanType("online")}
            className="px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
            style={{
              backgroundColor: planType === "online" ? "#e05353" : "transparent",
              color: planType === "online" ? "#f2e7dd" : "rgba(242, 231, 221, 0.8)",
              transform: planType === "online" ? "scale(1.05)" : "scale(1)"
            }}
          >
            Online
          </button>
          <button
            onClick={() => setPlanType("presencial")}
            className="px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
            style={{
              backgroundColor: planType === "presencial" ? "#e05353" : "transparent",
              color: planType === "presencial" ? "#f2e7dd" : "rgba(242, 231, 221, 0.8)",
              transform: planType === "presencial" ? "scale(1.05)" : "scale(1)"
            }}
          >
            Presencial
          </button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block p-8 w-full">
          <div className="flex flex-row gap-6 justify-center items-end max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="plan-card flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:scale-105 transition-transform rounded-xl shadow-lg w-64 border-2"
                onClick={() => handlePlanClick(plan)}
                style={{
                  opacity: 0,
                  backgroundColor: '#f2e7dd',
                  borderColor: '#e05353'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e05353'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e05353'}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: '#5f0a3c' }}>{plan.name}</h3>
                <p className="font-bold text-2xl mb-3" style={{ color: '#e05353' }}>{plan.price}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#706363' }}>{plan.description}</p>
                <button
                  className="mt-auto w-full font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px]"
                  style={{
                    background: 'linear-gradient(135deg, #e05353, #e05353)',
                    color: '#f2e7dd'
                  }}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden w-full px-4 py-4 overflow-x-auto">
          <div className="flex gap-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {plans.map((plan, index) => (
              <div
                key={index}
                className="plan-card flex flex-col items-center justify-center text-center p-6 cursor-pointer active:scale-95 transition-transform rounded-xl shadow-lg flex-shrink-0 w-[85vw] snap-center border-2 mobile-card"
                onClick={() => handlePlanClick(plan)}
                style={{
                  opacity: 0,
                  backgroundColor: '#f2e7dd',
                  borderColor: '#f2e7dd'
                }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: '#5f0a3c' }}>{plan.name}</h3>
                <p className="font-bold text-2xl mb-3" style={{ color: '#e05353' }}>{plan.price}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#f2e7dd' }}>{plan.description}</p>
                <button
                  className="mt-auto w-full font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] text-base"
                  style={{
                    background: 'linear-gradient(135deg, #f2e7dd)',
                    color: '#e05353'
                  }}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


      {selectedPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 md:p-0">
          <div className="rounded-2xl p-6 w-full max-w-md md:w-80 shadow-2xl relative border-2 mobile-modal" style={{ backgroundColor: '#f2e7dd', borderColor: '#e05353', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ color: '#e05353' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}
            >
              ✕
            </button>

            {/* Header con gradiente */}
            <div className="rounded-xl p-4 mb-4 -m-2" style={{ background: 'linear-gradient(135deg, #e05353, #e05353)' }}>
              <h2 className="text-lg md:text-xl font-bold" style={{ color: '#f2e7dd' }}>{selectedPlan.name}</h2>
              <p className="text-base md:text-lg font-semibold" style={{ color: '#5f0a3c' }}>{selectedPlan.price}</p>
            </div>

            <p className="mb-6 leading-relaxed text-sm md:text-base" style={{ color: '#706363' }}>{selectedPlan.description}</p>

            <a
              href="https://wa.me/584246287530"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-semibold py-4 md:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 min-h-[56px] flex items-center justify-center text-base"
              style={{
                background: 'linear-gradient(135deg, #e05353, #e05353)',
                color: '#f2e7dd'
              }}
            >
              Reservar Consulta
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanFolder;
