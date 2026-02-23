import { useState } from 'react';
import { Heart, Users, BookOpen, CheckCircle, ArrowLeft, X } from 'lucide-react';
import Layout from '../layouts/website';
import { Link } from '@inertiajs/react';
import FloatingParticles from '../components/FloatingParticles';
import AnimatedText from '../components/AnimatedText';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { plansOnline, plansPresencial } from '@/components/PlanFolder';

interface Plan {
    name: string;
    price: string;
    description: string;
}

export default function Services() {
    const [planType, setPlanType] = useState<'online' | 'presencial'>('online');
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const plans = planType === 'online' ? plansOnline : plansPresencial;

    return (
        <Layout title="Servicios - Psicóloga Clínica" hideFooterOnMobile={true}>
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

            {/* Header con efectos de paz */}
            <section className="relative py-12 md:py-20 bg-cover bg-center bg-no-repeat overflow-hidden pt-safe-top md:pt-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/DSC09263.png)' }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <FloatingParticles count={6} />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <AnimatedText animation="slideUp" delay={0.2}>
                            <Link href="/" className="mb-6 md:mb-8 text-white hover:text-pink-200 transition-colors inline-flex items-center text-sm md:text-base">
                                <ArrowLeft className="inline w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Volver al inicio
                            </Link>
                        </AnimatedText>

                        <AnimatedText animation="scaleIn" delay={0.4}>
                            <h1 className="text-3xl md:text-5xl font-light text-white mb-4 md:mb-6 drop-shadow-lg px-2">Servicios Terapéuticos</h1>
                        </AnimatedText>

                        <AnimatedText animation="fadeIn" delay={0.6}>
                            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md px-2">
                                Enfoques especializados para acompañarte en cada etapa de tu proceso de sanación
                            </p>
                        </AnimatedText>
                    </div>
                </div>
            </section>

            {/* Servicios Principales */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
                            <AnimatedText animation="slideUp" delay={0.8}>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                        <Heart className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4 text-center" style={{ color: '#5f0a3c' }}>Terapia Individual</h3>
                                    <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6" style={{ color: '#706363' }}>
                                        Sesiones personalizadas enfocadas en tu crecimiento personal y bienestar emocional.
                                    </p>
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Sesiones de 50 minutos
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Enfoque personalizado
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Ambiente seguro y confidencial
                                        </div>
                                    </div>
                                </div>
                            </AnimatedText>

                            <AnimatedText animation="slideUp" delay={1.0}>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                        <Users className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4 text-center" style={{ color: '#5f0a3c' }}>Terapia de Pareja</h3>
                                    <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6" style={{ color: '#706363' }}>
                                        Fortalece tu relación y mejora la comunicación con tu pareja.
                                    </p>
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#e05353' }} />
                                            Sesiones de 60 minutos
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#e05353' }} />
                                            Mejora de comunicación
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#e05353' }} />
                                            Resolución de conflictos
                                        </div>
                                    </div>
                                </div>
                            </AnimatedText>

                            <AnimatedText animation="slideUp" delay={1.2}>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                        <BookOpen className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4 text-center" style={{ color: '#5f0a3c' }}>Terapia Familiar</h3>
                                    <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6" style={{ color: '#706363' }}>
                                        Trabajamos juntos para mejorar la dinámica y comunicación familiar.
                                    </p>
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Sesiones de 75 minutos
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Dinámicas familiares
                                        </div>
                                        <div className="flex items-center text-xs md:text-sm" style={{ color: '#706363' }}>
                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" style={{ color: '#98ada4' }} />
                                            Fortalecimiento de vínculos
                                        </div>
                                    </div>
                                </div>
                            </AnimatedText>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enfoques Terapéuticos */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Enfoques Terapéuticos</h2>
                            <p className="text-lg md:text-xl px-2" style={{ color: '#706363' }}>
                                Utilizo diferentes enfoques basados en evidencia científica
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Terapia Cognitivo-Conductual (TCC)</h3>
                                <p className="text-sm md:text-base leading-relaxed mb-3 md:mb-4" style={{ color: '#706363' }}>
                                    Te ayudo a identificar y cambiar patrones de pensamiento negativos
                                    que afectan tus emociones y comportamientos.
                                </p>
                                <ul className="space-y-2" style={{ color: '#706363' }}>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Identificación de pensamientos automáticos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Reestructuración cognitiva</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Técnicas de relajación</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Terapia de Aceptación y Compromiso (ACT)</h3>
                                <p className="text-sm md:text-base leading-relaxed mb-3 md:mb-4" style={{ color: '#706363' }}>
                                    Te enseño a aceptar las emociones difíciles mientras te comprometes
                                    con acciones que reflejen tus valores.
                                </p>
                                <ul className="space-y-2" style={{ color: '#706363' }}>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Mindfulness y atención plena</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Clarificación de valores</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Compromiso con acciones valiosas</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Terapia Dialéctica Conductual (DBT)</h3>
                                <p className="text-sm md:text-base leading-relaxed mb-3 md:mb-4" style={{ color: '#706363' }}>
                                    Especialmente útil para regular emociones intensas y mejorar
                                    las relaciones interpersonales.
                                </p>
                                <ul className="space-y-2" style={{ color: '#706363' }}>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Regulación emocional</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Tolerancia al malestar</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#e05353' }}></div>
                                        <span className="text-xs md:text-sm">Habilidades interpersonales</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 shadow-lg mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <h3 className="text-lg md:text-2xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Terapia Centrada en la Persona</h3>
                                <p className="text-sm md:text-base leading-relaxed mb-3 md:mb-4" style={{ color: '#706363' }}>
                                    Creo en tu capacidad innata para crecer y sanar. Mi rol es facilitar
                                    ese proceso proporcionando un ambiente seguro.
                                </p>
                                <ul className="space-y-2" style={{ color: '#706363' }}>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Empatía genuina</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Aceptación incondicional</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0" style={{ backgroundColor: '#98ada4' }}></div>
                                        <span className="text-xs md:text-sm">Autenticidad terapéutica</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proceso de Terapia */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>¿Cómo Funciona la Terapia?</h2>
                            <p className="text-lg md:text-xl px-2" style={{ color: '#706363' }}>
                                Un proceso estructurado para tu bienestar emocional
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <span className="text-xl md:text-2xl font-light" style={{ color: '#f2e7dd' }}>1</span>
                                </div>
                                <h3 className="text-base md:text-xl font-light mb-2 md:mb-4" style={{ color: '#5f0a3c' }}>Consulta Inicial</h3>
                                <p className="text-xs md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Evaluamos tus necesidades y establecemos objetivos terapéuticos claros.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <span className="text-xl md:text-2xl font-light" style={{ color: '#f2e7dd' }}>2</span>
                                </div>
                                <h3 className="text-base md:text-xl font-light mb-2 md:mb-4" style={{ color: '#5f0a3c' }}>Plan de Tratamiento</h3>
                                <p className="text-xs md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Desarrollamos un plan personalizado basado en tus objetivos y necesidades.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <span className="text-xl md:text-2xl font-light" style={{ color: '#f2e7dd' }}>3</span>
                                </div>
                                <h3 className="text-base md:text-xl font-light mb-2 md:mb-4" style={{ color: '#5f0a3c' }}>Sesiones Regulares</h3>
                                <p className="text-xs md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Trabajamos juntos en sesiones semanales o quincenales según tus necesidades.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <span className="text-xl md:text-2xl font-light" style={{ color: '#f2e7dd' }}>4</span>
                                </div>
                                <h3 className="text-base md:text-xl font-light mb-2 md:mb-4" style={{ color: '#5f0a3c' }}>Seguimiento</h3>
                                <p className="text-xs md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Evaluamos el progreso y ajustamos el tratamiento según sea necesario.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tarifas */}
            <section className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-4xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Tarifas</h2>
                            <p className="text-lg md:text-xl px-2" style={{ color: '#706363' }}>
                                Inversión en tu bienestar emocional
                            </p>
                        </div>

                        {/* Pestañas Online / Presencial */}
                        <div className="flex justify-center mb-8">
                            <div className="flex gap-4 backdrop-blur-sm rounded-full p-2 shadow-lg" style={{ backgroundColor: 'rgba(152, 173, 164, 0.3)' }}>
                                <button
                                    onClick={() => setPlanType('online')}
                                    className="px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
                                    style={{
                                        backgroundColor: planType === 'online' ? '#e05353' : 'transparent',
                                        color: planType === 'online' ? '#f2e7dd' : 'rgba(95, 10, 60, 0.8)',
                                        transform: planType === 'online' ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    Online
                                </button>
                                <button
                                    onClick={() => setPlanType('presencial')}
                                    className="px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
                                    style={{
                                        backgroundColor: planType === 'presencial' ? '#e05353' : 'transparent',
                                        color: planType === 'presencial' ? '#f2e7dd' : 'rgba(95, 10, 60, 0.8)',
                                        transform: planType === 'presencial' ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    Presencial
                                </button>
                            </div>
                        </div>

                        {/* Desktop: tarjetas en fila */}
                        <div className="hidden md:flex flex-row gap-6 justify-center items-end">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:scale-105 transition-transform rounded-xl shadow-lg w-64 border-2"
                                    onClick={() => setSelectedPlan(plan)}
                                    style={{ backgroundColor: '#f2e7dd', borderColor: '#e05353' }}
                                >
                                    <h3 className="font-bold text-lg mb-2" style={{ color: '#5f0a3c' }}>{plan.name}</h3>
                                    <p className="font-bold text-2xl mb-3" style={{ color: '#e05353' }}>{plan.price}</p>
                                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#706363' }}>{plan.description}</p>
                                    <button
                                        className="mt-auto w-full font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px]"
                                        style={{ background: 'linear-gradient(135deg, #e05353, #e05353)', color: '#f2e7dd' }}
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Mobile: carrusel horizontal */}
                        <div className="md:hidden w-full px-4 py-4 overflow-x-auto">
                            <div className="flex gap-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                                {plans.map((plan, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center justify-center text-center p-6 cursor-pointer active:scale-95 transition-transform rounded-xl shadow-lg flex-shrink-0 w-[85vw] snap-center border-2"
                                        onClick={() => setSelectedPlan(plan)}
                                        style={{ backgroundColor: '#f2e7dd', borderColor: '#e05353' }}
                                    >
                                        <h3 className="font-bold text-lg mb-2" style={{ color: '#5f0a3c' }}>{plan.name}</h3>
                                        <p className="font-bold text-2xl mb-3" style={{ color: '#e05353' }}>{plan.price}</p>
                                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#706363' }}>{plan.description}</p>
                                        <button
                                            className="mt-auto w-full font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] text-base"
                                            style={{ background: 'linear-gradient(135deg, #e05353, #e05353)', color: '#f2e7dd' }}
                                        >
                                            Ver detalles
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-8 md:mt-12">
                            <p className="mb-4 md:mb-6 text-sm md:text-base px-2" style={{ color: '#706363' }}>
                                * Las tarifas pueden variar según el tipo de seguro o acuerdos especiales
                            </p>
                            <Link href="/contact" className="text-base md:text-lg px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 inline-flex items-center justify-center min-h-[48px] md:min-h-0" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#f2e7dd' }}>
                                <Heart className="inline w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Agendar Consulta
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal de detalle del plan */}
            {selectedPlan && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 md:p-0">
                    <div className="rounded-2xl p-6 w-full max-w-md md:w-80 shadow-2xl relative border-2" style={{ backgroundColor: '#f2e7dd', borderColor: '#e05353', maxHeight: '90vh', overflowY: 'auto' }}>
                        <button
                            onClick={() => setSelectedPlan(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                            style={{ color: '#e05353' }}
                            aria-label="Cerrar modal"
                        >
                            <X className="w-6 h-6" />
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
                            className="flex items-center justify-center w-full text-center font-semibold py-4 md:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 min-h-[56px] text-base"
                            style={{ background: 'linear-gradient(135deg, #e05353, #e05353)', color: '#f2e7dd' }}
                        >
                            Reservar Consulta
                        </a>
                    </div>
                </div>
            )}

            <WhatsAppWidget />
        </Layout>
    );
}
