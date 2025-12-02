import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

const questions = [
    {
        id: 1,
        text: 'Tristeza',
        options: [
            'No me siento triste',
            'Me siento triste gran parte del tiempo',
            'Me siento triste todo el tiempo',
            'Me siento tan triste o soy tan infeliz que no puedo soportarlo',
        ],
    },
    {
        id: 2,
        text: 'Pesimismo',
        options: [
            'No estoy desalentado respecto del mi futuro',
            'Me siento más desalentado respecto de mi futuro de lo que solía estarlo',
            'No espero que las cosas funcionen para mi',
            'Siento que no hay esperanza para mi futuro y que sólo puede empeorar',
        ],
    },
    {
        id: 3,
        text: 'Fracaso',
        options: [
            'No me siento como un fracasado',
            'He fracasado más de lo que hubiera debido',
            'Cuando miro hacia atrás, veo muchos fracasos',
            'Siento que como persona soy un fracaso total',
        ],
    },
    {
        id: 4,
        text: 'Pérdida de Placer',
        options: [
            'Obtengo tanto placer como siempre por las cosas de las que disfruto',
            'No disfruto tanto de las cosas como solía hacerlo',
            'Obtengo muy poco placer de las cosas de las que solía disfrutar',
            'No puedo obtener ningún placer de las cosas de las que solía disfrutar',
        ],
    },
    {
        id: 5,
        text: 'Sentimientos de Culpa',
        options: [
            'No me siento particularmente culpable',
            'Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho',
            'Me siento bastante culpable la mayor parte del tiempo',
            'Me siento culpable todo el tiempo',
        ],
    },
    {
        id: 6,
        text: 'Sentimientos de Castigo',
        options: [
            'No siento que este siendo castigado',
            'Siento que tal vez pueda ser castigado',
            'Espero ser castigado',
            'Siento que estoy siendo castigado',
        ],
    },
    {
        id: 7,
        text: 'Disconformidad con Uno Mismo',
        options: [
            'Siento acerca de mi lo mismo que siempre',
            'He perdido la confianza en mí mismo',
            'Estoy decepcionado conmigo mismo',
            'No me gusto a mí mismo',
        ],
    },
    {
        id: 8,
        text: 'Autocrítica',
        options: [
            'No me critico ni me culpo más de lo habitual',
            'Estoy más crítico conmigo mismo de lo que solía estarlo',
            'Me critico a mí mismo por todos mis errores',
            'Me culpo a mí mismo por todo lo malo que sucede',
        ],
    },
    {
        id: 9,
        text: 'Pensamientos o Deseos Suicidas',
        options: [
            'No tengo ningún pensamiento de matarme',
            'He tenido pensamientos de matarme, pero no lo haría',
            'Querría matarme',
            'Me mataría si tuviera la oportunidad de hacerlo',
        ],
    },
    {
        id: 10,
        text: 'Llanto',
        options: [
            'No lloro más de lo que solía hacerlo',
            'Lloro más de lo que solía hacerlo',
            'Lloro por cualquier pequeñez',
            'Siento ganas de llorar pero no puedo',
        ],
    },
    {
        id: 11,
        text: 'Agitación',
        options: [
            'No estoy más inquieto o tenso que lo habitual',
            'Me siento más inquieto o tenso que lo habitual',
            'Estoy tan inquieto o agitado que me es difícil quedarme quieto',
            'Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo',
        ],
    },
    {
        id: 12,
        text: 'Pérdida de Interés',
        options: [
            'No he perdido el interés en otras actividades o personas',
            'Estoy menos interesado que antes en otras personas o cosas',
            'He perdido casi todo el interés en otras personas o cosas',
            'Me es difícil interesarme por algo',
        ],
    },
    {
        id: 13,
        text: 'Indecisión',
        options: [
            'Tomo mis propias decisiones tan bien como siempre',
            'Me resulta más difícil que de costumbre tomar decisiones',
            'Encuentro mucha más dificultad que antes para tomar decisiones',
            'Tengo problemas para tomar cualquier decisión',
        ],
    },
    {
        id: 14,
        text: 'Desvalorización',
        options: [
            'No siento que yo no sea valioso',
            'No me considero a mi mismo tan valioso y útil como solía considerarme',
            'Me siento menos valioso cuando me comparo con otros',
            'Siento que no valgo nada',
        ],
    },
    {
        id: 15,
        text: 'Pérdida de Energía',
        options: [
            'Tengo tanta energía como siempre',
            'Tengo menos energía que la que solía tener',
            'No tengo suficiente energía para hacer demasiado',
            'No tengo energía suficiente para hacer nada',
        ],
    },
    {
        id: 16,
        text: 'Cambios en los Hábitos de Sueño',
        options: [
            'No he experimentado ningún cambio en mis hábitos de sueño',
            'Duermo un poco menos que lo habitual',
            'Duermo mucho menos que lo habitual',
            'Me despierto 1-2 horas más temprano y no puedo volver a dormirme',
        ],
    },
    {
        id: 17,
        text: 'Irritabilidad',
        options: [
            'No estoy tan irritable que lo habitual',
            'Estoy más irritable que lo habitual',
            'Estoy mucho más irritable que lo habitual',
            'Estoy irritable todo el tiempo',
        ],
    },
    {
        id: 18,
        text: 'Cambios en el Apetito',
        options: [
            'No he experimentado ningún cambio en mi apetito',
            'Mi apetito es un poco menor que lo habitual',
            'Mi apetito es mucho menor que antes',
            'No tengo apetito en absoluto',
        ],
    },
    {
        id: 19,
        text: 'Dificultad de Concentración',
        options: [
            'Puedo concentrarme tan bien como siempre',
            'No puedo concentrarme tan bien como habitualmente',
            'Me es difícil mantener la mente en algo por mucho tiempo',
            'Encuentro que no puedo concentrarme en nada',
        ],
    },
    {
        id: 20,
        text: 'Cansancio o Fatiga',
        options: [
            'No estoy más cansado o fatigado que lo habitual',
            'Me fatigo o me canso más fácilmente que lo habitual',
            'Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer',
            'Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer',
        ],
    },
    {
        id: 21,
        text: 'Pérdida de Interés en el Sexo',
        options: [
            'No he notado ningún cambio reciente en mi interés por el sexo',
            'Estoy menos interesado en el sexo de lo que solía estarlo',
            'Estoy mucho menos interesado en el sexo',
            'He perdido completamente el interés en el sexo',
        ],
    },
]

interface BeckDepressionTestFormProps {
    onClose?: () => void
    inModal?: boolean
}

export default function BeckDepressionTestForm({ onClose, inModal = false }: BeckDepressionTestFormProps) {
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
        if (calculatedScore <= 13) {
            return 'Depresión mínima'
        } else if (calculatedScore <= 19) {
            return 'Depresión leve'
        } else if (calculatedScore <= 28) {
            return 'Depresión moderada'
        } else {
            return 'Depresión severa'
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
                    test_type: 'beck_depression',
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
                        Gracias por completar el Test de depresión (BDI-II) (BDI-II)
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
                        Test de depresión (BDI-II) (BDI-II)
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
                            Este test es una guía inicial. Si el resultado indica depresión elevada, te recomendamos agendar una cita para un proceso de evaluación más completo.
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
                <CardTitle className="text-2xl">
                    Test de depresión (BDI-II) (BDI-II)
                </CardTitle>
                <CardDescription>
                    Este cuestionario consta de 21 grupos de afirmaciones. Por favor, lea con
                    atención cada uno de ellos cuidadosamente. Luego elija uno de cada grupo, el que
                    mejor describa el modo como se ha sentido las últimas dos semanas, incluyendo el
                    día de hoy.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEvaluate} className="space-y-6">
                    {/* Instrucciones */}
                    <Alert>
                        <AlertDescription>
                            Seleccione la afirmación que mejor describa cómo se ha sentido durante
                            las últimas dos semanas, incluyendo el día de hoy.
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
                                    {question.options.map((option, optionIndex) => (
                                        <label
                                            key={optionIndex}
                                            className="flex items-start space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors"
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={optionIndex}
                                                checked={responses[question.id] === optionIndex}
                                                onChange={() =>
                                                    handleResponseChange(question.id, optionIndex)
                                                }
                                                className="h-4 w-4 mt-0.5"
                                            />
                                            <span className="flex-1">{option}</span>
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
