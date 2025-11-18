import { useState, FormEvent } from 'react'
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout'

const questions = [
    {
        id: 1,
        text: 'Estado de ánimo ansioso: Preocupaciones, temor de que suceda lo peor, temor anticipado, irritabilidad.',
    },
    {
        id: 2,
        text: 'Tensión: Sensaciones de tensión, fatigabilidad, sobresalto al responder, llanto fácil, temblores, sensación de inquietud, imposibilidad de relajarse.',
    },
    {
        id: 3,
        text: 'Temores: A la oscuridad, a los desconocidos, a quedarse solo, a los animales grandes, al tráfico, a las multitudes.',
    },
    {
        id: 4,
        text: 'Insomnio: Dificultad para dormirse, sueño interrumpido, sueño insatisfactorio y sensación de fatiga al despertar, sueños penosos, pesadillas, terrores nocturnos.',
    },
    {
        id: 5,
        text: 'Intelectual (cognitivo): Dificultad para concentrarse, mala memoria.',
    },
    {
        id: 6,
        text: 'Estado de ánimo depresivo: Pérdida de interés, falta de placer en los pasatiempos, depresión, despertar prematuro, cambios de humor durante el día.',
    },
    {
        id: 7,
        text: 'Síntomas somáticos generales (musculares): Dolores y molestias, rigidez muscular, sacudidas mioclónicas, rechinar de dientes, voz vacilante, tono muscular aumentado.',
    },
    {
        id: 8,
        text: 'Síntomas somáticos generales (sensoriales): Zumbidos de oídos, visión borrosa, oleadas de frío y calor, sensación de debilidad, sensación de hormigueo.',
    },
    {
        id: 9,
        text: 'Síntomas cardiovasculares: Taquicardia, palpitaciones, dolor en el pecho, latidos vasculares, sensación de desmayo, extrasístole.',
    },
    {
        id: 10,
        text: 'Síntomas respiratorios: Presión o constricción en el pecho, sensación de ahogo, suspiros, disnea.',
    },
    {
        id: 11,
        text: 'Síntomas gastrointestinales: Dificultad para tragar, flatulencia, dolor abdominal, sensación de ardor, pesadez abdominal, náuseas, vómitos, constipación, pérdida de peso, diarrea.',
    },
    {
        id: 12,
        text: 'Síntomas genitourinarios: Micción frecuente, micción urgente, amenorrea, menorragia, desarrollo de frigidez, eyaculación precoz, pérdida de libido, impotencia.',
    },
    {
        id: 13,
        text: 'Síntomas del sistema nervioso autónomo: Boca seca, rubor, palidez, tendencia a sudar, vértigos, cefaleas de tensión, piloerección (pelos de punta).',
    },
    {
        id: 14,
        text: 'Comportamiento en la entrevista: Inquietud, impaciencia o intranquilidad, temblor de manos, ceño fruncido, rostro preocupado, suspiros o respiración rápida, palidez facial, tragar saliva, eructos, tensión muscular aumentada.',
    },
]

const options = [
    { value: 0, label: '0 - Ausente' },
    { value: 1, label: '1 - Leve' },
    { value: 2, label: '2 - Moderado' },
    { value: 3, label: '3 - Grave' },
    { value: 4, label: '4 - Muy grave / Incapacitante' },
]

export default function HamiltonAnxietyTest() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [responses, setResponses] = useState<{ [key: number]: number }>({})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleResponseChange = (questionId: number, value: number) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (!name.trim()) {
            newErrors.name = 'El nombre es requerido'
        }

        if (!email.trim()) {
            newErrors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'El email no es válido'
        }

        const answeredQuestions = Object.keys(responses).length
        if (answeredQuestions < questions.length) {
            newErrors.responses = `Por favor responde todas las preguntas (${answeredQuestions}/${questions.length} completadas)`
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setLoading(true)
        setErrors({})

        try {
            const responsesArray = questions.map((q) => responses[q.id] || 0)

            await fetch('/api/psychological-tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    name,
                    email,
                    test_type: 'hamilton_anxiety',
                    responses: responsesArray,
                }),
            })

            setSuccess(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch {
            setErrors({ submit: 'Error al enviar el test. Por favor intenta de nuevo.' })
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <AuthSimpleLayout>
                <Head title="Test de Ansiedad de Hamilton - Completado" />
                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Test Completado</CardTitle>
                        <CardDescription>
                            Gracias por completar el Test de Ansiedad de Hamilton
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertDescription>
                                Los resultados han sido enviados a tu correo electrónico ({email}). Por
                                favor revisa tu bandeja de entrada.
                            </AlertDescription>
                        </Alert>
                        <div className="mt-6">
                            <Button onClick={() => (window.location.href = '/')} className="w-full">
                                Volver al inicio
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </AuthSimpleLayout>
        )
    }

    return (
        <AuthSimpleLayout>
            <Head title="Test de Ansiedad de Hamilton" />
            <Card className="mx-auto max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Test de Ansiedad de Hamilton</CardTitle>
                    <CardDescription>
                        Escala de evaluación de ansiedad de Hamilton (HARS). Por favor, responde a todas
                        las preguntas según tu estado durante la última semana.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Información personal */}
                        <div className="space-y-4 border-b pb-6">
                            <div>
                                <Label htmlFor="name">Nombre completo</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Tu nombre"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Preguntas */}
                        <div className="space-y-6">
                            {questions.map((question, index) => (
                                <div key={question.id} className="space-y-3">
                                    <Label className="text-base font-semibold">
                                        {index + 1}. {question.text}
                                    </Label>
                                    <div className="space-y-2">
                                        {options.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option.value}
                                                    checked={responses[question.id] === option.value}
                                                    onChange={() =>
                                                        handleResponseChange(question.id, option.value)
                                                    }
                                                    className="h-4 w-4"
                                                />
                                                <span>{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {errors.responses && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.responses}</AlertDescription>
                            </Alert>
                        )}

                        {errors.submit && (
                            <Alert variant="destructive">
                                <AlertDescription>{errors.submit}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Enviando...' : 'Enviar Test'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AuthSimpleLayout>
    )
}
