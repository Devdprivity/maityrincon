import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

const questions = [
    {
        id: 1,
        text: 'Mi cabeza está llena de preocupaciones y me espero lo peor ante una situación',
    },
    {
        id: 2,
        text: 'Me cuesta mucho relajarme, me encuentro en una situación de tensión y me sobresalto con facilidad',
    },
    {
        id: 3,
        text: 'Tengo muchos miedos: a la oscuridad, los desconocidos, a quedarme solo/a,...',
    },
    {
        id: 4,
        text: 'Me cuesta mucho dormirme y me suelo despertar cansado/a',
    },
    {
        id: 5,
        text: 'Me noto deprimido/a la mayor parte del tiempo',
    },
    {
        id: 6,
        text: 'Me cuesta mantener la atención y concentrarme',
    },
    {
        id: 7,
        text: 'Noto mis músculos en tensión, me duelen e incluso a veces puedo notar cómo se sacuden mis dientes',
    },
    {
        id: 8,
        text: 'Percibo una opresión en el pecho, tengo la sensación de que me ahogo y no puedo respirar',
    },
    {
        id: 9,
        text: 'Me cuesta tragar, tengo estreñimiento y me cuesta digerir pequeñas cantidades de comida',
    },
    {
        id: 10,
        text: 'Tengo la boca seca, sensaciones de vértigo y me duele la cabeza sin razón alguna',
    },
]

const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
]

interface HamiltonAnxietyTestFormProps {
    onClose?: () => void
    inModal?: boolean
}

export default function HamiltonAnxietyTestForm({ onClose, inModal = false }: HamiltonAnxietyTestFormProps) {
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
        if (calculatedScore < 18) {
            return 'Ansiedad ligera'
        } else if (calculatedScore < 25) {
            return 'Ansiedad leve a moderada'
        } else if (calculatedScore < 30) {
            return 'Ansiedad moderada a severa'
        } else {
            return 'Ansiedad muy severa'
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
        const responsesArray = questions.map((q) => responses[q.id] || 1)
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
            const responsesArray = questions.map((q) => responses[q.id] || 1)

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
            if (inModal) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } catch {
            setErrors({ submit: 'Error al enviar el test. Por favor intenta de nuevo.' })
        } finally {
            setLoading(false)
        }
    }

    // Pantalla de éxito (después de enviar email)
    if (success) {
        return (
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">¡Resultados Enviados!</CardTitle>
                    <CardDescription>
                        Gracias por completar el Test de Ansiedad - Hamilton
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

    // Pantalla de resultados (después de evaluar, antes de enviar email)
    if (showResult) {
        return (
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Resultados de tu Evaluación</CardTitle>
                    <CardDescription>
                        Test de Ansiedad - Hamilton
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Resultado */}
                    <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium text-gray-600">Tu puntuación</p>
                            <p className="text-4xl font-bold text-blue-600">{score} puntos</p>
                            <p className="text-lg font-semibold text-gray-800 mt-2">{interpretation}</p>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <Alert>
                        <AlertDescription>
                            Este test es una guía inicial. Si el resultado indica ansiedad elevada, te recomendamos agendar una cita para un proceso de evaluación más completo.
                        </AlertDescription>
                    </Alert>

                    {/* Formulario para enviar resultados por email */}
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
                <CardTitle className="text-2xl">Test de Ansiedad - Hamilton</CardTitle>
                <CardDescription>
                <>
                    Como psicóloga clínica, veo a diario cómo el ritmo de nuestra sociedad nos exige, a menudo, más de lo que sentimos poder gestionar. ¿Sientes que el estrés diario te está sobrepasando? Quiero que sepas que no estás solo/a en esto.
                    <br />
                    <br />
                    Reconocer que el nerviosismo está afectando tu bienestar emocional es, sin duda, el primer paso y el más valiente para recuperar tu calma. Por eso, para acompañarte en este proceso de autoconocimiento, he preparado para ti esta versión breve del Test de Hamilton, una herramienta fundamental para identificar indicadores de ansiedad.
                    <br />
                    <br />
                    Recuerda que este test es una guía inicial. Si el resultado indica ansiedad elevada, por favor, agenda una cita y juntos empecemos tu proceso de sanación emocional.
                    <br />
                    <br />
                    Por favor, responde a todas las preguntas seleccionando un número del 1 al 5 según tu estado durante la última semana.
                </>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!inModal && (
                    <div className="mb-6 space-y-4 text-base leading-relaxed text-gray-700">
                        <p>
                            Como psicóloga clínica, veo a diario cómo el ritmo de nuestra sociedad nos exige, a menudo, más de lo que sentimos poder gestionar. ¿Sientes que el estrés diario te está sobrepasando? Quiero que sepas que no estás solo/a en esto.
                        </p>
                        <p>
                            Reconocer que el nerviosismo está afectando tu bienestar emocional es, sin duda, el primer paso y el más valiente para recuperar tu calma. Por eso, para acompañarte en este proceso de autoconocimiento, he preparado para ti esta versión breve del Test de Hamilton, una herramienta fundamental para identificar indicadores de ansiedad.
                        </p>
                        <p>
                            Recuerda que este test es una guía inicial. Si el resultado indica ansiedad elevada, por favor, agenda una cita y juntos empecemos tu proceso de sanación emocional.
                        </p>
                    </div>
                )}

                <form onSubmit={handleEvaluate} className="space-y-6">
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
