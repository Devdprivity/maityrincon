import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
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

export default function HamiltonTestForm({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [responses, setResponses] = useState<{ [key: number]: number }>({})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)

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

            onClose()
            alert('Test enviado exitosamente. Los resultados serán enviados a tu correo electrónico.')
        } catch {
            setErrors({ submit: 'Error al enviar el test. Por favor intenta de nuevo.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-4 rounded-xl" style={{ backgroundColor: '#f2e7dd' }}>
                <div>
                    <Label htmlFor="name" className="font-semibold" style={{ color: '#5f0a3c' }}>Nombre completo</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className={errors.name ? 'border-red-500' : ''}
                        style={{ borderColor: errors.name ? undefined : '#98ada4' } as React.CSSProperties}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold" style={{ color: '#5f0a3c' }}>Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                        style={{ borderColor: errors.email ? undefined : '#98ada4' } as React.CSSProperties}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2 p-3 rounded-lg" style={{ backgroundColor: '#f2e7dd' }}>
                        <Label className="text-sm font-semibold" style={{ color: '#5f0a3c' }}>{index + 1}. {question.text}</Label>
                        <div className="space-y-1">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center space-x-2 text-sm p-2 rounded transition-colors cursor-pointer hover:bg-white/50">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.value}
                                        checked={responses[question.id] === option.value}
                                        onChange={() => handleResponseChange(question.id, option.value)}
                                        className="h-4 w-4"
                                        style={{ accentColor: '#e05353' }}
                                    />
                                    <span style={{ color: '#706363' }}>{option.label}</span>
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
            <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold shadow-md hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #98ada4, #e05353)', color: '#5f0a3c' }}
            >
                {loading ? 'Evaluando...' : 'Evaluar'}
            </Button>
        </form>
    )
}

