<?php

namespace App\Mail;

use App\Models\PsychologicalTest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestResultsMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public PsychologicalTest $test
    ) {}

    public function envelope(): Envelope
    {
        $testNames = [
            PsychologicalTest::TYPE_HAMILTON_ANXIETY => 'Test de Ansiedad de Hamilton',
            PsychologicalTest::TYPE_BECK_ANXIETY => 'Inventario de Ansiedad de Beck (BAI)',
            PsychologicalTest::TYPE_BECK_DEPRESSION => 'Inventario de Depresión de Beck (BDI-II)',
        ];

        $testName = $testNames[$this->test->test_type] ?? 'Test Psicológico';

        return new Envelope(
            subject: "Tus resultados: {$testName} - Psic. Maity Rincón",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.test-results',
            with: [
                'test' => $this->test,
                'testName' => $this->getTestName(),
                'recommendations' => $this->getRecommendations(),
            ],
        );
    }

    private function getTestName(): string
    {
        $names = [
            PsychologicalTest::TYPE_HAMILTON_ANXIETY => 'Test de Ansiedad de Hamilton',
            PsychologicalTest::TYPE_BECK_ANXIETY => 'Inventario de Ansiedad de Beck (BAI)',
            PsychologicalTest::TYPE_BECK_DEPRESSION => 'Inventario de Depresión de Beck (BDI-II)',
        ];

        return $names[$this->test->test_type] ?? 'Test Psicológico';
    }

    private function getRecommendations(): string
    {
        $score = $this->test->score;
        $type = $this->test->test_type;

        if ($type === PsychologicalTest::TYPE_BECK_ANXIETY || $type === PsychologicalTest::TYPE_HAMILTON_ANXIETY) {
            if ($score <= 15) {
                return 'Tus niveles de ansiedad se encuentran dentro de un rango bajo. Mantener hábitos saludables como ejercicio regular, buena alimentación y descanso adecuado te ayudará a conservar tu bienestar emocional.';
            } elseif ($score <= 25) {
                return 'Tus niveles de ansiedad son moderados. Te recomiendo considerar una consulta profesional para explorar estrategias que te ayuden a manejar estos síntomas de manera efectiva.';
            } else {
                return 'Tus niveles de ansiedad son elevados. Es importante que busques apoyo profesional para trabajar en estrategias de manejo y mejorar tu calidad de vida. Estoy aquí para ayudarte.';
            }
        }

        if ($type === PsychologicalTest::TYPE_BECK_DEPRESSION) {
            if ($score <= 13) {
                return 'Tus niveles de estado de ánimo se encuentran dentro de un rango saludable. Continúa cuidando tu bienestar emocional con actividades que disfrutes y relaciones significativas.';
            } elseif ($score <= 19) {
                return 'Se detectan algunos indicadores leves. Te recomiendo estar atento/a a cómo te sientes y considerar una consulta para explorar herramientas de bienestar emocional.';
            } else {
                return 'Los resultados sugieren que podrías beneficiarte significativamente de apoyo profesional. No dudes en agendar una cita, estoy aquí para acompañarte en tu proceso.';
            }
        }

        return 'Te recomiendo agendar una consulta para revisar estos resultados en detalle y diseñar un plan personalizado para tu bienestar.';
    }
}
