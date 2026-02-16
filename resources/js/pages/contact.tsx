import { Phone, Mail, MapPin, Clock, ArrowLeft, Send } from 'lucide-react';
import Layout from '../layouts/website';
import { Link } from '@inertiajs/react';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function Contact() {
    return (
        <Layout title="Contacto - Psicóloga Clínica" hideFooterOnMobile={true}>
            {/* Mobile Header simplificado */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm safe-area-top">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                            <img src="/img/logo2blanco.png" alt="Logo" className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>Maity Rincón</h1>
                            <p className="text-xs" style={{ color: '#706363' }}>Psicóloga Clínica</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <section className="relative py-12 md:py-20 bg-cover bg-center bg-no-repeat pt-safe-top md:pt-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/DSC09263.png)' }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Link href="/" className="mb-6 md:mb-8 text-white transition-colors inline-flex items-center text-sm md:text-base" onMouseEnter={(e) => e.currentTarget.style.color = '#f2e7dd'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                            <ArrowLeft className="inline w-4 h-4 md:w-5 md:h-5 mr-2" />
                            Volver al inicio
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-light text-white mb-4 md:mb-6 drop-shadow-lg px-2">Contacto</h1>
                        <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md px-2">
                            Estoy aquí para escucharte. Contáctame para agendar tu consulta inicial
                        </p>
                    </div>
                </div>
            </section>

            {/* Información de Contacto */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                            {/* Información de contacto */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8" style={{ color: '#5f0a3c' }}>Información de Contacto</h2>

                                <div className="space-y-6 md:space-y-8">
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                            <Phone className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#f2e7dd' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: '#5f0a3c' }}>Teléfono</h3>
                                            <a href="https://wa.me/584246287530" target="_blank" rel="noopener noreferrer" className="mb-2 text-sm md:text-base transition-colors" style={{ color: '#706363' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'} onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}>
                                                +58 424 628 7530
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 md:gap-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                            <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#f2e7dd' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: '#5f0a3c' }}>Email</h3>
                                            <a href="mailto:psicomaityrincon@gmail.com" className="mb-2 text-sm md:text-base transition-colors break-all" style={{ color: '#706363' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e05353'} onMouseLeave={(e) => e.currentTarget.style.color = '#706363'}>
                                                psicomaityrincon@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 md:gap-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                            <MapPin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#f2e7dd' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: '#5f0a3c' }}>Ubicación</h3>
                                            <p className="mb-2 text-sm md:text-base" style={{ color: '#706363' }}>Calle 64 entre Av 3E y Avenida 3F</p>
                                            <p className="text-xs md:text-sm" style={{ color: '#706363', opacity: 0.8 }}>Maracaibo, Venezuela 4001</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 md:gap-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                            <Clock className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#f2e7dd' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-light mb-2" style={{ color: '#5f0a3c' }}>Horarios</h3>
                                            <div className="space-y-1 text-sm md:text-base" style={{ color: '#706363' }}>
                                                <p><span className="font-semibold">Presencial:</span> Lunes a Viernes</p>
                                                <p><span className="font-semibold">Online:</span> Lunes a Domingo</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Formulario de contacto */}
                            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-6" style={{ color: '#5f0a3c' }}>Envíame un Mensaje</h2>

                                <form className="space-y-4 md:space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label htmlFor="nombre" className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#5f0a3c' }}>
                                                Nombre *
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                required
                                                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base border rounded-xl transition-colors"
                                                style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                                placeholder="Tu nombre completo"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#5f0a3c' }}>
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base border rounded-xl transition-colors"
                                                style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label htmlFor="telefono" className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#5f0a3c' }}>
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                name="telefono"
                                                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base border rounded-xl transition-colors"
                                                style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                                placeholder="+58 424 628 7530"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="servicio" className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#5f0a3c' }}>
                                                Servicio de Interés
                                            </label>
                                            <select
                                                id="servicio"
                                                name="servicio"
                                                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base border rounded-xl transition-colors"
                                                style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                            >
                                                <option value="">Selecciona un servicio</option>
                                                <option value="individual">Terapia Individual</option>
                                                <option value="pareja">Terapia de Pareja</option>
                                                <option value="familiar">Terapia Familiar</option>
                                                <option value="consulta">Consulta Inicial</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="mensaje" className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#5f0a3c' }}>
                                            Mensaje *
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            name="mensaje"
                                            rows={5}
                                            required
                                            className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base border rounded-xl transition-colors resize-none"
                                            style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties}
                                            placeholder="Cuéntame sobre ti y cómo puedo ayudarte..."
                                        ></textarea>
                                    </div>

                                    <div className="flex items-start gap-2 md:gap-3">
                                        <input
                                            type="checkbox"
                                            id="privacidad"
                                            name="privacidad"
                                            required
                                            className="mt-1 w-4 h-4 rounded flex-shrink-0"
                                            style={{ accentColor: '#e05353' }}
                                        />
                                        <label htmlFor="privacidad" className="text-xs md:text-sm" style={{ color: '#706363' }}>
                                            Acepto la política de privacidad y el tratamiento de mis datos personales *
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-base md:text-lg py-3 md:py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 min-h-[48px] md:min-h-0"
                                        style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}
                                    >
                                        <Send className="inline w-4 h-4 md:w-5 md:h-5 mr-2" />
                                        Enviar Mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Preguntas Frecuentes</h2>
                            <p className="text-lg md:text-xl px-2" style={{ color: '#706363' }}>
                                Respuestas a las preguntas más comunes
                            </p>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Ofreces servicios de terapia psicológica online?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Ofrezco servicios de terapia psicológica online para brindar comodidad y accesibilidad a aquellos que prefieren recibir atención desde la comodidad de su hogar u oficina.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Ofreces consultas psicológicas presenciales?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Sí, ofrezco consultas psicológicas presenciales en un ambiente acogedor y confidencial. Durante estas sesiones, trabajo directamente contigo para abordar tus preocupaciones emocionales, mentales o conductuales. Creo en la importancia del contacto personal durante la terapia, facilitando así una comunicación más cercana y efectiva para tu bienestar integral.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Cuánto tiempo dura usualmente una sesión de terapia contigo?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    La duración de una sesión de terapia conmigo suele ser entre 60 minutos y 75 minutos, aunque puedo ajustar la duración según tus necesidades individuales.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Cómo garantizas la confidencialidad de la información compartida durante la terapia?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Respeto y protejo la confidencialidad de toda la información compartida durante las sesiones de terapia, cumpliendo las leyes y regulaciones de privacidad de datos. Las consultas son un espacio seguro para que puedas expresar abiertamente tu sentir.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Cómo puedo agendar una cita contigo para una consulta psicológica?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Puedes agendar una cita conmigo para una consulta psicológica escribiéndome a mi número de contacto vía WhatsApp <a href="https://wa.me/584246287530" target="_blank" rel="noopener noreferrer" className="font-semibold transition-colors" style={{ color: '#e05353' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5f0a3c'} onMouseLeave={(e) => e.currentTarget.style.color = '#e05353'}>+58 424 628 7530</a>.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Cómo puedo obtener más información sobre tus servicios y cómo puedo contactarte?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Para obtener más información sobre mis servicios y cómo puedo ayudarte, no dudes en contactarme directamente a través del WhatsApp o completando el formulario de contacto en mi sitio web. Estoy aquí para responder todas tus preguntas y ayudarte en tu proceso de búsqueda de apoyo emocional.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Qué enfoque utilizas en tu práctica de terapia psicológica?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Utilizo un enfoque cognitivo-conductual, el cual se centra en identificar y cambiar patrones de pensamiento y comportamiento que puedan estar contribuyendo a tus dificultades emocionales. Este enfoque colaborativo y basado en la evidencia se adapta a tus necesidades únicas para promover tu crecimiento y bienestar emocional.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Qué debo esperar durante nuestra primera sesión de terapia?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Durante nuestra primera sesión de terapia, puedes tener la oportunidad de compartir tus preocupaciones y objetivos terapéuticos conmigo, y juntos comenzaremos a desarrollar un plan de tratamiento personalizado.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Qué tipo de problemas pueden tratarse en la terapia psicológica contigo?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    En mi práctica, trato una amplia variedad de problemas, incluyendo ansiedad, depresión, estrés, problemas de relaciones interpersonales, duelo, procesos de adaptación, autoestima y regulación emocional.
                                </p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>¿Cuáles son las ventajas de la terapia psicológica presencial?</h3>
                                <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                    Las ventajas de la terapia psicológica presencial incluyen una conexión más personal y directa conmigo como terapeuta, lo que facilita una comunicación más fluida y una comprensión más profunda de tus preocupaciones.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <WhatsAppWidget />
        </Layout>
    );
}
