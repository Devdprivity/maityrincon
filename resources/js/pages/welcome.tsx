import { Head } from '@inertiajs/react';
import { useState, useEffect, lazy, Suspense } from 'react';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import NavbarMobile from '@/components/NavbarMobile';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import HamiltonAnxietyTestForm from '@/components/Tests/HamiltonAnxietyTestForm';
// import BeckAnxietyTestForm from '@/components/Tests/BeckAnxietyTestForm';
import BeckDepressionTestForm from '@/components/Tests/BeckDepressionTestForm';

// Lazy load componentes pesados
const PlanFolder = lazy(() => import('@/components/PlanFolder'));
const TestimonialsCarousel = lazy(() => import('@/components/TestimonialsCarousel'));
const InteractiveQuestions = lazy(() => import('@/components/InteractiveQuestions'));
const WhatsAppWidget = lazy(() => import('@/components/WhatsAppWidget'));

type TestType = 'hamilton' | 'beck-anxiety' | 'beck-depression' | null;

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
                            {openTest === 'hamilton' && 'Test de Ansiedad - Hamilton'}
                            {openTest === 'beck-depression' && 'Test de depresión (BDI-II)'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-100px)] mobile-modal-content">
                        {openTest === 'hamilton' && (
                            <HamiltonAnxietyTestForm onClose={() => setOpenTest(null)} inModal={true} />
                        )}
                        {openTest === 'beck-depression' && (
                            <BeckDepressionTestForm onClose={() => setOpenTest(null)} inModal={true} />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
