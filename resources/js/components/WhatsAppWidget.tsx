import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '584246287530';

  // Animación de apertura del mini chat
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.chat-box',
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  // Función para abrir WhatsApp con mensaje predefinido
  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Widget flotante - Solo visible en desktop */}
      <div className="hidden md:block fixed bottom-[180px] right-[74px] z-50">
        {/* Botón principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group relative overflow-visible"
          style={{ 
            background: 'linear-gradient(135deg, #f2e7dd, #e05353)'
          }}
          aria-label="Abrir chat de WhatsApp"
        >
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <img
              src="/img/15-8.png"
              alt="WhatsApp"
              className="w-14 h-14 object-contain"
            />
          )}
          {/* Pulso animado cuando está cerrado */}
          {!isOpen && (
            <span 
              className="absolute inset-0 rounded-full opacity-75 animate-ping"
              style={{ backgroundColor: '#f2e7dd' }}
            ></span>
          )}
        </button>

        {/* Mini chat */}
        {isOpen && (
          <div className="chat-box absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden w-80">
            {/* Header */}
            <div 
              className="p-4 text-white"
              style={{ 
                background: 'linear-gradient(135deg, #98ada4, #5f0a3c)'
              }}
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/img/logo2blanco.png"
                  alt="Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">Maity Rincón</h3>
                  <p className="text-xs text-white/90">Psicología Clínica</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div 
              className="p-4"
              style={{ backgroundColor: '#f2e7dd' }}
            >
              <p className="text-sm mb-4" style={{ color: '#706363' }}>
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
                  className="w-full bg-white text-left p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border-2 border-transparent"
                  style={{ 
                    '--hover-border': '#e05353'
                  } as React.CSSProperties & { '--hover-border': string }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#e05353';
                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p 
                        className="font-semibold transition-colors"
                        style={{ color: '#706363' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
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
                  className="w-full bg-white text-left p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border-2 border-transparent"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#98ada4';
                    e.currentTarget.style.backgroundColor = '#f2e7dd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🩺</span>
                    <div>
                      <p 
                        className="font-semibold transition-colors"
                        style={{ color: '#706363' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#98ada4'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}
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
        )}
      </div>

      {/* Overlay para cerrar al hacer click afuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

