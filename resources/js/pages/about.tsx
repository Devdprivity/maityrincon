import { Heart, GraduationCap, Award, Users, BookOpen, ArrowLeft, Shield, Sparkles, Target, CheckCircle2 } from 'lucide-react';
import Layout from '../layouts/website';
import { Link } from '@inertiajs/react';
import FloatingParticles from '../components/FloatingParticles';
import AnimatedText from '../components/AnimatedText';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const storyRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const approachRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animación de la sección historia
        if (storyRef.current) {
            gsap.from(storyRef.current.querySelectorAll('.animate-item'), {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 60,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        // Animación de educación y certificaciones
        if (educationRef.current) {
            gsap.from(educationRef.current.querySelectorAll('.education-card'), {
                scrollTrigger: {
                    trigger: educationRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });
        }

        // Animación del enfoque terapéutico
        if (approachRef.current) {
            const cards = approachRef.current.querySelectorAll('.approach-card');
            // Asegurar visibilidad inicial antes de animar
            gsap.set(cards, { opacity: 1, y: 0 });
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: approachRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        }

        // Animación de valores
        if (valuesRef.current) {
            const cards = valuesRef.current.querySelectorAll('.value-card');
            // Asegurar visibilidad inicial antes de animar
            gsap.set(cards, { opacity: 1, scale: 1 });
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.4)"
            });
        }
    }, []);

    return (
        <Layout title="Sobre Mí - Psicóloga Clínica" hideFooterOnMobile={true}>
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
                            <h2 className="text-base md:text-xl font-light text-white mb-4 md:mb-6 drop-shadow-lg px-2">Maity Rincón Reinberg | Psicólogo Clinico en Maracaibo | Terapia Online, Presencial, Individual y de Pareja.</h2>
                        </AnimatedText>
                    </div>
                </div>
            </section>

            {/* Historia Personal */}
            <section ref={storyRef} className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                                <h2 className="animate-item text-3xl md:text-5xl font-light mb-4 md:mb-6" style={{ color: '#5f0a3c' }}>Sobre mi</h2>
                                <p className="animate-item text-base md:text-lg leading-relaxed mb-4" style={{ color: '#706363' }}>
                                    Hola, soy <span className="font-semibold" style={{ color: '#e05353' }}>Maity Rincón Reinberg</span>, <span className="font-semibold" style={{ color: '#5f0a3c' }}>Psicólogo Clínico</span> con más de <span className="font-semibold" style={{ color: '#e05353' }}>9 años de experiencia</span> en el campo de la salud mental, mi misión es brindarte un apoyo genuino y profesional en tu camino hacia el bienestar emocional.
                                </p>
                                <p className="animate-item text-base md:text-lg leading-relaxed mb-4" style={{ color: '#706363' }}>
                                    Creo firmemente en la capacidad de cada persona para transformar su vida. Mi enfoque es <span className="font-semibold" style={{ color: '#5f0a3c' }}>cálido, profesional</span> y se centra en el <span className="font-semibold" style={{ color: '#e05353' }}>crecimiento personal y la resiliencia</span>. A través de la terapia, te ofrezco un espacio seguro y confidencial, ya sea en mi consulta <span className="font-semibold" style={{ color: '#5f0a3c' }}>Presencial en Maracaibo</span> o mediante sesiones de <span className="font-semibold" style={{ color: '#e05353' }}>terapia online</span>, para que juntos podamos:
                                </p>
                                <ul className="animate-item space-y-3 text-base md:text-lg" style={{ color: '#706363' }}>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <span><span className="font-semibold">Superar desafíos emocionales</span>.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <span><span className="font-semibold">Desarrollar herramientas prácticas</span>.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <span><span className="font-semibold">Mejorar tu calidad de vida</span> y tus relaciones interpersonales.</span>
                                    </li>
                                </ul>

                            </div>
                            <div className="animate-item relative order-1 md:order-2">
                                <div style={{ borderRadius: '45px', overflow: 'hidden' }} className="w-full h-94 md:h-96">
                                    <img
                                        src="/img/maiti-sobremi.png"
                                        alt="Maity Rincón"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios y Enfoque */}
            <section className="py-12 md:py-20 bg-white pb-safe-bottom-mobile">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto space-y-8 md:space-y-16">
                        {/* Servicios de consulta */}
                        <div className="rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border-2 mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                            <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-0 md:mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Heart className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-semibold" style={{ color: '#5f0a3c' }}>
                                    Servicios de Consulta Psicológica
                                </h2>
                            </div>
                            <p className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#e05353' }}>
                                Accesibles online y presenciales
                            </p>
                            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#706363' }}>
                                Ofrezco servicios de consulta psicológica tanto <span className="font-semibold" style={{ color: '#e05353' }}>online como presenciales</span>,
                                adaptados a tus necesidades y preferencias individuales. Mi objetivo es proporcionarte un espacio seguro y confidencial donde puedas explorar tus emociones, pensamientos y preocupaciones personales.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#706363' }}>
                                Ya sea que prefieras la comodidad de las consultas online desde cualquier ubicación o la interacción cara a cara en mi consulta, te ofrezco un enfoque profesional y comprensivo para ayudarte a mejorar tu bienestar emocional y mental. Juntos podemos trabajar para superar obstáculos, desarrollar estrategias efectivas y alcanzar tus metas de una manera que se adapte mejor a tu estilo de vida y necesidades personales.

                            </p>
                        </div>

                        {/* Refugio de bienestar */}
                        <div className="rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border-2 mobile-card" style={{ backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                            <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-0 md:mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <Users className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-semibold" style={{ color: '#5f0a3c' }}>
                                    Un Refugio de Bienestar
                                </h2>
                            </div>
                            <p className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>
                                Tu espacio seguro y confidencial
                            </p>
                            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#706363' }}>
                                Me comprometo a ofrecerte un espacio de escucha activa y apoyo incondicional. Me centro en ayudarte a explorar y entender tus emociones y pensamientos, facilitando así tu proceso de autodescubrimiento y crecimiento personal.

                            </p>
                            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#706363' }}>
                                Con un enfoque integrador y basado en la evidencia, te proporciono herramientas prácticas y estrategias efectivas para manejar el estrés, mejorar tus relaciones y encontrar la claridad mental que necesitas para vivir una vida más equilibrada y satisfactoria. Estoy aquí para acompañarte hacia el bienestar emocional y personal, ayudándote a alcanzar tus metas y desarrollar todo tu potencial.

                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formación y Certificaciones */}
            <section ref={educationRef} className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Formación Profesional</h2>
                            <p className="text-lg md:text-xl mb-4 md:mb-8 px-2" style={{ color: '#706363' }}>
                                Mi compromiso con la excelencia profesional y el aprendizaje continuo
                            </p>
                            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12 px-2" style={{ color: '#706363' }}>
                                Mi práctica profesional está respaldada por una <span className="font-semibold" style={{ color: '#e05353' }}>sólida formación académica</span> y una constante actualización en las técnicas de intervención psicológica más efectivas. Esto asegura que recibas una <span className="font-semibold" style={{ color: '#5f0a3c' }}>terapia basada en la evidencia científica</span> para tu bienestar emocional.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                            {/* Títulos Académicos */}
                            <div className="education-card bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border-2 mobile-card" style={{ borderColor: '#98ada4' }}>
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                        <GraduationCap className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-semibold" style={{ color: '#5f0a3c' }}>Títulos Académicos</h3>
                                </div>
                                <ul className="space-y-3 md:space-y-4">
                                    <li className="flex items-start">
                                        <Award className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <div>
                                            <p className="font-semibold text-base md:text-lg" style={{ color: '#5f0a3c' }}>Magister Scientiarum en Psicología Clínica</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Award className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <div>
                                            <p className="font-semibold text-base md:text-lg" style={{ color: '#5f0a3c' }}>Psicólogo Clínico</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Award className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#98ada4' }} />
                                        <div>
                                            <p className="text-sm md:text-base" style={{ color: '#706363' }}>Egresada de la <span className="font-semibold" style={{ color: '#5f0a3c' }}>Universidad Rafael Urdaneta (URU)</span>, Maracaibo, Venezuela.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Especializaciones */}
                            <div className="education-card bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border-2 mobile-card" style={{ borderColor: '#5f0a3c' }}>
                                <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                        <BookOpen className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-semibold" style={{ color: '#5f0a3c' }}>Especializaciones y Certificaciones</h3>
                                </div>
                                <ul className="space-y-3 md:space-y-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#5f0a3c' }} />
                                        <div>
                                            <p className="font-semibold text-base md:text-lg" style={{ color: '#5f0a3c' }}>Especialista en Terapia Cognitivo-Conductual (TCC)</p>
                                            <p className="text-xs md:text-sm mt-1" style={{ color: '#706363' }}>Enfoque principal utilizado para el tratamiento de la ansiedad, la depresión y los problemas de regulación emocional.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#5f0a3c' }} />
                                        <div>
                                            <p className="font-semibold text-base md:text-lg" style={{ color: '#5f0a3c' }}>Formación avanzada en Intervención en Salud Mental</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#e05353' }} />
                                        <div>
                                            <p className="font-semibold text-base md:text-lg" style={{ color: '#5f0a3c' }}>Certificación en Psiconeuroinmunología (PNI)</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Credenciales Profesionales */}
                        <div className="education-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border-2 mobile-card" style={{ background: 'linear-gradient(135deg, rgba(152, 173, 164, 0.3), rgba(224, 83, 83, 0.3))', borderColor: '#e05353' }}>
                            <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #5f0a3c)' }}>
                                    <Award className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-3xl font-semibold" style={{ color: '#5f0a3c' }}>Credenciales Profesionales</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-white/80 rounded-xl p-4">
                                    <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                        <span className="font-semibold" style={{ color: '#e05353' }}>FVP N°17855</span> (Federación de Psicólogos de Venezuela)
                                    </p>
                                </div>
                                <div className="bg-white/80 rounded-xl p-4">
                                    <p className="text-sm md:text-base" style={{ color: '#706363' }}>
                                        <span className="font-semibold" style={{ color: '#5f0a3c' }}>Docente Universitaria</span> - Experiencia compartiendo conocimientos en la formación de futuros profesionales de la psicología.
                                    </p>
                                </div>
                                <div className="bg-white/80 rounded-xl p-4 md:col-span-2">
                                    <p className="text-center text-base md:text-lg" style={{ color: '#706363' }}>
                                        <span className="font-semibold" style={{ color: '#e05353' }}>Más de 9 años de experiencia</span> en el área clínica.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enfoque Terapéutico */}
            <section ref={approachRef} className="py-12 md:py-20 bg-white pb-safe-bottom-mobile">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Mi Enfoque Terapéutico</h2>
                            <p className="text-lg md:text-xl mb-3 md:mb-4 px-2" style={{ color: '#706363' }}>
                                Cada persona es única, por eso adapto mi enfoque a tus necesidades específicas
                            </p>
                            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-2" style={{ color: '#706363' }}>
                                Utilizo un <span className="font-semibold" style={{ color: '#e05353' }}>enfoque basado en la evidencia científica</span>, garantizando un tratamiento efectivo y adaptado a tus necesidades únicas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                            <div className="approach-card p-6 md:p-8 rounded-2xl md:rounded-3xl text-center active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ opacity: 1, backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Heart className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Centrado en la Persona</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Creo en tu <span className="font-semibold" style={{ color: '#e05353' }}>capacidad innata para crecer y sanar</span>. Mi rol es facilitar ese proceso proporcionando un ambiente seguro y de apoyo.
                                </p>
                            </div>

                            <div className="approach-card p-6 md:p-8 rounded-2xl md:rounded-3xl text-center active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ opacity: 1, backgroundColor: '#f2e7dd', borderColor: '#5f0a3c' }}>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <Target className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Terapia Cognitivo-Conductual (TCC)</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Se enfoca en identificar y modificar los <span className="font-semibold" style={{ color: '#5f0a3c' }}>patrones de pensamiento y comportamiento</span> que causan malestar. Es altamente efectiva para el tratamiento de la <span className="font-semibold" style={{ color: '#e05353' }}>ansiedad, depresión y trastornos de pánico</span>.
                                </p>
                            </div>

                            <div className="approach-card p-6 md:p-8 rounded-2xl md:rounded-3xl text-center active:scale-95 transition-all duration-300 border-2 shadow-lg mobile-card" style={{ opacity: 1, backgroundColor: '#f2e7dd', borderColor: '#98ada4' }}>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Sparkles className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Enfoque Integrador</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Combino diferentes técnicas terapéuticas para crear un <span className="font-semibold" style={{ color: '#5f0a3c' }}>plan de tratamiento personalizado</span> que se adapte perfectamente a tus necesidades y objetivos específicos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section ref={valuesRef} className="py-12 md:py-20 pb-safe-bottom-mobile" style={{ backgroundColor: '#f2e7dd' }}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-5xl font-light mb-3 md:mb-4" style={{ color: '#5f0a3c' }}>Mis Valores</h2>
                            <p className="text-lg md:text-xl px-2" style={{ color: '#706363' }}>
                                Mi práctica se basa en principios éticos y humanos para asegurar un proceso de sanación seguro y efectivo
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#98ada4' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Shield className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Ética y Confidencialidad</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Te ofrezco un <span className="font-semibold" style={{ color: '#e05353' }}>espacio seguro y libre de juicios</span>, donde la privacidad de tu información es absoluta y mi máxima prioridad profesional.
                                </p>
                            </div>

                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#5f0a3c' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <Heart className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Empatía y Calidez</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Brindo una <span className="font-semibold" style={{ color: '#5f0a3c' }}>escucha activa y comprensiva</span> para validar tus emociones, acompañándote con calidez en cada paso de tu proceso terapéutico.
                                </p>
                            </div>

                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#98ada4' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Sparkles className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Autenticidad</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Creo en la <span className="font-semibold" style={{ color: '#e05353' }}>transparencia y honestidad</span> en nuestra relación terapéutica, fomentando un ambiente donde puedas ser completamente tú mismo.
                                </p>
                            </div>

                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#5f0a3c' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <Users className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Respeto</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Valoro tu <span className="font-semibold" style={{ color: '#5f0a3c' }}>dignidad y autonomía</span>, respetando tus decisiones y ritmo personal en el proceso de cambio y crecimiento.
                                </p>
                            </div>

                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#98ada4' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)' }}>
                                    <Target className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Compromiso con tu Bienestar</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Mi objetivo es promover el <span className="font-semibold" style={{ color: '#e05353' }}>cambio duradero y la regulación emocional</span>, brindándote herramientas prácticas para desarrollar todo tu potencial.
                                </p>
                            </div>

                            <div className="value-card bg-white p-6 md:p-8 rounded-2xl active:scale-95 transition-all duration-300 shadow-lg border-2 mobile-card" style={{ opacity: 1, borderColor: '#5f0a3c' }}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, #e05353, #98ada4)' }}>
                                    <Award className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#f2e7dd' }} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3" style={{ color: '#5f0a3c' }}>Enfoque Basado en Evidencia</h3>
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#706363' }}>
                                    Garantizo tratamientos efectivos al utilizar <span className="font-semibold" style={{ color: '#5f0a3c' }}>terapias científicamente probadas</span> (como la TCC), asegurando los mejores resultados para tu salud mental.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <WhatsAppWidget />
        </Layout >
    );
}
