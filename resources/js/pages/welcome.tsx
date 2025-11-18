import { Head } from '@inertiajs/react';
import { useState, useEffect, FormEvent, lazy, Suspense } from 'react';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import NavbarMobile from '@/components/NavbarMobile';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Lazy load componentes pesados
const PlanFolder = lazy(() => import('@/components/PlanFolder'));
const TestimonialsCarousel = lazy(() => import('@/components/TestimonialsCarousel'));
const InteractiveQuestions = lazy(() => import('@/components/InteractiveQuestions'));
const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));

type TestType = 'hamilton' | 'beck-anxiety' | 'beck-depression' | null;

// Componente de Test de Hamilton (versión simplificada para modal)
function HamiltonTest({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [responses, setResponses] = useState<{ [key: number]: number }>({});

    const questions = [
        { id: 1, text: 'Estado de ánimo ansioso: Preocupaciones, temor de que suceda lo peor, temor anticipado, irritabilidad.' },
        { id: 2, text: 'Tensión: Sensaciones de tensión, fatigabilidad, sobresalto al responder, llanto fácil, temblores, sensación de inquietud, imposibilidad de relajarse.' },
        { id: 3, text: 'Temores: A la oscuridad, a los desconocidos, a quedarse solo, a los animales grandes, al tráfico, a las multitudes.' },
        { id: 4, text: 'Insomnio: Dificultad para dormirse, sueño interrumpido, sueño insatisfactorio y sensación de fatiga al despertar, sueños penosos, pesadillas, terrores nocturnos.' },
        { id: 5, text: 'Intelectual (cognitivo): Dificultad para concentrarse, mala memoria.' },
        { id: 6, text: 'Estado de ánimo depresivo: Pérdida de interés, falta de placer en los pasatiempos, depresión, despertar prematuro, cambios de humor durante el día.' },
        { id: 7, text: 'Síntomas somáticos generales (musculares): Dolores y molestias, rigidez muscular, sacudidas mioclónicas, rechinar de dientes, voz vacilante, tono muscular aumentado.' },
        { id: 8, text: 'Síntomas somáticos generales (sensoriales): Zumbidos de oídos, visión borrosa, oleadas de frío y calor, sensación de debilidad, sensación de hormigueo.' },
        { id: 9, text: 'Síntomas cardiovasculares: Taquicardia, palpitaciones, dolor en el pecho, latidos vasculares, sensación de desmayo, extrasístole.' },
        { id: 10, text: 'Síntomas respiratorios: Presión o constricción en el pecho, sensación de ahogo, suspiros, disnea.' },
        { id: 11, text: 'Síntomas gastrointestinales: Dificultad para tragar, flatulencia, dolor abdominal, sensación de ardor, pesadez abdominal, náuseas, vómitos, constipación, pérdida de peso, diarrea.' },
        { id: 12, text: 'Síntomas genitourinarios: Micción frecuente, micción urgente, amenorrea, menorragia, desarrollo de frigidez, eyaculación precoz, pérdida de libido, impotencia.' },
        { id: 13, text: 'Síntomas del sistema nervioso autónomo: Boca seca, rubor, palidez, tendencia a sudar, vértigos, cefaleas de tensión, piloerección (pelos de punta).' },
        { id: 14, text: 'Comportamiento en la entrevista: Inquietud, impaciencia o intranquilidad, temblor de manos, ceño fruncido, rostro preocupado, suspiros o respiración rápida, palidez facial, tragar saliva, eructos, tensión muscular aumentada.' },
    ];

    const options = [
        { value: 0, label: '0 - Ausente' },
        { value: 1, label: '1 - Leve' },
        { value: 2, label: '2 - Moderado' },
        { value: 3, label: '3 - Grave' },
        { value: 4, label: '4 - Muy grave / Incapacitante' },
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ name, email, responses });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-4 rounded-xl" style={{ backgroundColor: '#f2e7dd' }}>
                <div>
                    <Label htmlFor="name" className="font-semibold" style={{ color: '#5f0a3c' }}>Nombre completo</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold" style={{ color: '#5f0a3c' }}>Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2 p-3 rounded-lg" style={{ backgroundColor: '#f2e7dd' }}>
                        <Label className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>{index + 1}. {question.text}</Label>
                        <div className="space-y-1">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center space-x-2 text-sm p-2 rounded transition-colors cursor-pointer hover:bg-white/50">
                                    <input type="radio" name={`question-${question.id}`} value={option.value} checked={responses[question.id] === option.value} onChange={() => setResponses({ ...responses, [question.id]: option.value })} className="h-4 w-4" style={{ accentColor: '#e05353' }} />
                                    <span style={{ color: '#706363' }}>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button type="submit" className="w-full font-semibold shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#5f0a3c' }}>Enviar Test</Button>
        </form>
    );
}

// Componente de Test de Beck Ansiedad
function BeckAnxietyTestComponent({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [responses, setResponses] = useState<{ [key: number]: number }>({});

    const questions = [
        { id: 1, text: 'Torpe o entumecido' },
        { id: 2, text: 'Acalorado' },
        { id: 3, text: 'Con temblor en las piernas' },
        { id: 4, text: 'Incapaz de relajarse' },
        { id: 5, text: 'Con temor a que ocurra lo peor' },
        { id: 6, text: 'Mareado, o que se le va la cabeza' },
        { id: 7, text: 'Con latidos del corazón fuertes y acelerados' },
        { id: 8, text: 'Inestable' },
        { id: 9, text: 'Atemorizado o asustado' },
        { id: 10, text: 'Nervioso' },
        { id: 11, text: 'Con sensación de bloqueo' },
        { id: 12, text: 'Con temblores en las manos' },
        { id: 13, text: 'Inquieto, inseguro' },
        { id: 14, text: 'Con miedo a perder el control' },
        { id: 15, text: 'Con sensación de ahogo' },
        { id: 16, text: 'Con temor a morir' },
        { id: 17, text: 'Con miedo' },
        { id: 18, text: 'Con problemas digestivos (ej: dolor de estómago, náuseas, malestar estomacal)' },
        { id: 19, text: 'Con desvanecimientos' },
        { id: 20, text: 'Con rubor facial (sonrojado)' },
        { id: 21, text: 'Con sudores, fríos o calientes' },
    ];

    const options = ['En absoluto', 'Levemente (no me molesta mucho)', 'Moderadamente (es desagradable pero puedo soportarlo)', 'Gravemente (casi no podía soportarlo)'];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ name, email, responses });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-4 rounded-xl" style={{ backgroundColor: '#f2e7dd' }}>
                <div>
                    <Label htmlFor="name" className="font-semibold" style={{ color: '#5f0a3c' }}>Nombre completo</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold" style={{ color: '#5f0a3c' }}>Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2 p-3 rounded-lg" style={{ backgroundColor: '#f2e7dd' }}>
                        <Label className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>{index + 1}. {question.text}</Label>
                        <div className="space-y-1">
                            {options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center space-x-2 text-sm p-2 rounded transition-colors cursor-pointer hover:bg-white/50">
                                    <input type="radio" name={`question-${question.id}`} value={optIndex} checked={responses[question.id] === optIndex} onChange={() => setResponses({ ...responses, [question.id]: optIndex })} className="h-4 w-4" style={{ accentColor: '#e05353' }} />
                                    <span style={{ color: '#706363' }}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button type="submit" className="w-full font-semibold shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#5f0a3c' }}>Enviar Test</Button>
        </form>
    );
}

// Componente de Test de Beck Depresión
function BeckDepressionTestComponent({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [responses, setResponses] = useState<{ [key: number]: number }>({});

    const questions = [
        { id: 1, text: 'Tristeza' },
        { id: 2, text: 'Pesimismo' },
        { id: 3, text: 'Fracaso' },
        { id: 4, text: 'Pérdida de Placer' },
        { id: 5, text: 'Sentimientos de Culpa' },
        { id: 6, text: 'Sentimientos de Castigo' },
        { id: 7, text: 'Disconformidad con uno mismo' },
    ];

    const options = ['Nada', 'Leve', 'Moderado', 'Grave'];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ name, email, responses });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-4 rounded-xl" style={{ backgroundColor: '#f2e7dd' }}>
                <div>
                    <Label htmlFor="name" className="font-semibold" style={{ color: '#5f0a3c' }}>Nombre completo</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold" style={{ color: '#5f0a3c' }}>Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="focus:ring-2" style={{ borderColor: '#98ada4', '--tw-ring-color': '#98ada4' } as React.CSSProperties} />
                </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2 p-3 rounded-lg" style={{ backgroundColor: '#f2e7dd' }}>
                        <Label className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>{index + 1}. {question.text}</Label>
                        <div className="space-y-1">
                            {options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center space-x-2 text-sm p-2 rounded transition-colors cursor-pointer hover:bg-white/50">
                                    <input type="radio" name={`question-${question.id}`} value={optIndex} checked={responses[question.id] === optIndex} onChange={() => setResponses({ ...responses, [question.id]: optIndex })} className="h-4 w-4" style={{ accentColor: '#e05353' }} />
                                    <span style={{ color: '#706363' }}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button type="submit" className="w-full font-semibold shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#5f0a3c' }}>Enviar Test</Button>
        </form>
    );
}

export default function Welcome() {
    const [openTest, setOpenTest] = useState<TestType>(null);
    const [showTestimonials, setShowTestimonials] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    useEffect(() => {
        // Escuchar cuando la animación del hero termine (timeouts reducidos)
        const handleHeroComplete = () => {
            setTimeout(() => {
                setShowTestimonials(true);
                setTimeout(() => {
                    setShowQuestions(true);
                    setTimeout(() => {
                        setShowWidget(true);
                    }, 200);
                }, 400);
            }, 200);
        };

        window.addEventListener('heroAnimationComplete', handleHeroComplete);

        return () => {
            window.removeEventListener('heroAnimationComplete', handleHeroComplete);
        };
    }, []);

    return (
        <>
            <Head title="Psicóloga Clínica - Maity Rincón" />

            {/* Header fijo - oculto en mobile */}
            <div className="hidden md:block">
                <Header />
            </div>

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

            <div className="scroll-snap-container mobile-app-container">
                {/* Sección 1: Hero */}
                <div className="hero-section w-full h-screen pt-safe-top pb-safe-bottom">
                    <Hero />
                </div>

                {/* Sección 2: Testimonios */}
                {showTestimonials && (
                    <div className="testimonials-section w-full h-screen overflow-hidden pt-safe-top pb-safe-bottom">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#98ada4' }}></div></div>}>
                            <TestimonialsCarousel />
                        </Suspense>
                    </div>
                )}

                {/* Sección 3: Preguntas Interactivas */}
                {showQuestions && (
                    <div className="questions-section w-full h-screen overflow-hidden pt-safe-top pb-safe-bottom">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#98ada4' }}></div></div>}>
                            <InteractiveQuestions />
                        </Suspense>
                    </div>
                )}

                {/* Sección 4: Planes (incluye Footer) */}
                {showQuestions && (
                    <div className="plan-section w-full h-screen overflow-y-auto pt-safe-top pb-safe-bottom">
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#98ada4' }}></div></div>}>
                            <PlanFolder />
                        </Suspense>
                    </div>
                )}
            </div>

            {/* WhatsApp Widget fijo */}
            {showWidget && (
                <Suspense fallback={null}>
                    <WhatsAppWidget />
                </Suspense>
            )}

            {/* Botones verticales de tests en el lado derecho - solo desktop */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-0 z-50">
                <button 
                    onClick={() => setOpenTest('hamilton')} 
                    className="px-1 py-1.5 rounded-tl-md rounded-bl-md shadow-lg transition-all duration-300 hover:px-1.5 border-l-2" 
                    style={{ 
                        writingMode: 'vertical-rl', 
                        textOrientation: 'mixed', 
                        marginTop: '25px',
                        background: 'linear-gradient(135deg, #98ada4, #e05353)',
                        color: '#f2e7dd ',
                        borderColor: '#5f0a3c'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                        e.currentTarget.style.borderColor = '#e05353';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                        e.currentTarget.style.borderColor = '#5f0a3c';
                    }}
                >
                    <span className="text-[9px] font-semibold tracking-wide">Hamilton</span>
                </button>
                <button 
                    onClick={() => setOpenTest('beck-anxiety')} 
                    className="px-1 py-1.5 shadow-lg transition-all duration-300 hover:px-1.5 border-l-2" 
                    style={{ 
                        writingMode: 'vertical-rl', 
                        textOrientation: 'mixed',
                        background: 'linear-gradient(135deg, #98ada4, #e05353)',
                        color: '#f2e7dd ',
                        borderColor: '#5f0a3c'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                        e.currentTarget.style.borderColor = '#e05353';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                        e.currentTarget.style.borderColor = '#5f0a3c';
                    }}
                >
                    <span className="text-[9px] font-semibold tracking-wide">Ansiedad</span>
                </button>
                <button 
                    onClick={() => setOpenTest('beck-depression')} 
                    className="px-1 py-1.5 rounded-bl-md shadow-lg transition-all duration-300 hover:px-1.5 border-l-2" 
                    style={{ 
                        writingMode: 'vertical-rl', 
                        textOrientation: 'mixed', 
                        marginBottom: '25px',
                        background: 'linear-gradient(135deg, #98ada4, #e05353)',
                        color: '#f2e7dd ',
                        borderColor: '#5f0a3c'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e05353, #98ada4)';
                        e.currentTarget.style.borderColor = '#e05353';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #98ada4, #e05353)';
                        e.currentTarget.style.borderColor = '#5f0a3c';
                    }}
                >
                    <span className="text-[9px] font-semibold tracking-wide">Depresión</span>
                </button>
            </div>

            {/* Mobile Bottom Navigation */}
            <NavbarMobile />

            {/* Modal para mostrar los tests */}
            <Dialog open={openTest !== null} onOpenChange={() => setOpenTest(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden mobile-modal">
                    <DialogHeader>
                        <DialogTitle className="mobile-modal-title">
                            {openTest === 'hamilton' && 'Test de Ansiedad de Hamilton'}
                            {openTest === 'beck-anxiety' && 'Inventario de Ansiedad de Beck'}
                            {openTest === 'beck-depression' && 'Inventario de Depresión de Beck'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-100px)] mobile-modal-content">
                        {openTest === 'hamilton' && <HamiltonTest onClose={() => setOpenTest(null)} />}
                        {openTest === 'beck-anxiety' && <BeckAnxietyTestComponent onClose={() => setOpenTest(null)} />}
                        {openTest === 'beck-depression' && <BeckDepressionTestComponent onClose={() => setOpenTest(null)} />}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
