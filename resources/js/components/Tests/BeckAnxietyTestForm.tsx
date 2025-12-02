import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

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
    {
        id: 18,
        text: 'Con problemas digestivos (ej: dolor de estómago, náuseas, malestar estomacal)',
    },
    { id: 19, text: 'Con desvanecimientos' },
    { id: 20, text: 'Con rubor facial (sonrojado)' },
    { id: 21, text: 'Con sudores, fríos o calientes' },
]

const options = [
    { value: 0, label: 'En absoluto' },
    { value: 1, label: 'Levemente (no me molesta mucho)' },
    { value: 2, label: 'Moderadamente (es desagradable pero puedo soportarlo)' },
    { value: 3, label: 'Gravemente (casi no podía soportarlo)' },
]

interface BeckAnxietyTestFormProps {
    onClose?: () => void
    inModal?: boolean
}

export default function BeckAnxietyTestForm({ onClose, inModal = false }: BeckAnxietyTestFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [responses, setResponses] = useState<{ [key: number]: number }>({})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [interpretation, setInterpretation] = useState('')
    const [success, setSuccess] = useState(false)

    const handleResponseChange = (questionId: number, value: number) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }))
    }

    const getInterpretation = (calculatedScore: number): string => {
        if (calculatedScore <= 7) {
            return 'Ansiedad mínima'
        } else if (calculatedScore <= 15) {
            return 'Ansiedad leve'
        } else if (calculatedScore <= 25) {
            return 'Ansiedad moderada'
        } else {
            return 'Ansiedad severa'
        }
    }

    const handleEvaluate = (e: FormEvent) => {
        e.preventDefault()

        const answeredQuestions = Object.keys(responses).length
        if (answeredQuestions < questions.length) {
            setErrors({
                responses: `Por favor responde todas las preguntas (${answeredQuestions}/${questions.length} completadas)`
            })
            return
        }

        setErrors({})
        const responsesArray = questions.map((q) => responses[q.id] || 0)
        const calculatedScore = responsesArray.reduce((sum, val) => sum + val, 0)
        const result = getInterpretation(calculatedScore)

        setScore(calculatedScore)
        setInterpretation(result)
        setShowResult(true)

        if (inModal) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleSendEmail = async (e: FormEvent) => {
        e.preventDefault()

        const newErrors: { [key: string]: string } = {}

        if (!name.trim()) {
            newErrors.name = 'El nombre es requerido'
        }

        if (!email.trim()) {
            newErrors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'El email no es válido'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
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
                    test_type: 'beck_anxiety',
                    responses: responsesArray,
                }),
            })

            setSuccess(true)
            if (inModal) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } catch {
            setErrors({ submit: 'Error al enviar el test. Por favor intenta de nuevo.' })
        } finally {
            setLoading(false)
        }
    }

    // Pantalla de éxito
    if (success) {
        return (
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">¡Resultados Enviados!</CardTitle>
                    <CardDescription>
                        Gracias por completar el Inventario de Ansiedad de Beck (BAI)
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
                        <Button
                            onClick={() => {
                                if (onClose) {
                                    onClose()
                                } else {
                                    window.location.href = '/'
                                }
                            }}
                            className="w-full"
                        >
                            {inModal ? 'Cerrar' : 'Volver al inicio'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Pantalla de resultados
    if (showResult) {
        return (
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Resultados de tu Evaluación</CardTitle>
                    <CardDescription>
                        Inventario de Ansiedad de Beck (BAI)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium text-gray-600">Tu puntuación</p>
                            <p className="text-4xl font-bold text-blue-600">{score} puntos</p>
                            <p className="text-lg font-semibold text-gray-800 mt-2">{interpretation}</p>
                        </div>
                    </div>

                    <Alert>
                        <AlertDescription>
                            Este test es una guía inicial. Si el resultado indica ansiedad elevada, te recomendamos agendar una cita para un proceso de evaluación más completo.
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSendEmail} className="space-y-4">
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold mb-4">¿Deseas recibir tus resultados por email?</h3>

                            <div className="space-y-4">
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

                            {errors.submit && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertDescription>{errors.submit}</AlertDescription>
                                </Alert>
                            )}

                            <div className="flex gap-3 mt-6">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? 'Enviando...' : 'Enviar resultados'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        if (onClose) {
                                            onClose()
                                        } else {
                                            window.location.href = '/'
                                        }
                                    }}
                                    className="flex-1"
                                >
                                    {inModal ? 'Cerrar' : 'No, gracias'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        )
    }

    // Pantalla inicial: formulario de preguntas
    return (
        <Card className="mx-auto max-w-4xl">
            <CardHeader>
                <CardTitle className="text-2xl">Inventario de Ansiedad de Beck (BAI)</CardTitle>
                <CardDescription>
                    A continuación se presenta una lista de síntomas comunes de la ansiedad. Por
                    favor, lea cuidadosamente cada ítem de la lista e indique cuánto le ha afectado
                    en la última semana incluyendo hoy.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEvaluate} className="space-y-6">
                    {/* Instrucciones */}
                    <Alert>
                        <AlertDescription>
                            Durante la última semana, incluyendo hoy, ¿cuánto le ha molestado cada uno
                            de estos síntomas?
                        </AlertDescription>
                    </Alert>

                    {/* Preguntas */}
                    <div className={`space-y-6 ${inModal ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
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

                    <Button type="submit" className="w-full">
                        Evaluar
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
