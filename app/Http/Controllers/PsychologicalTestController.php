<?php

namespace App\Http\Controllers;

use App\Mail\TestResultsMail;
use App\Mail\TestResultsNotificationMail;
use App\Models\PsychologicalTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PsychologicalTestController extends Controller
{
    /**
     * Store a new test submission
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'test_type' => 'required|in:hamilton_anxiety,beck_anxiety,beck_depression',
            'responses' => 'required|array',
        ]);

        $score = $this->calculateScore($validated['test_type'], $validated['responses']);
        $interpretation = $this->getInterpretation($validated['test_type'], $score);

        $test = PsychologicalTest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'test_type' => $validated['test_type'],
            'responses' => $validated['responses'],
            'score' => $score,
            'interpretation' => $interpretation,
            'completed' => true,
            'completed_at' => now(),
        ]);

        // Enviar email con los resultados
        $this->sendResultsEmail($test);

        return response()->json([
            'success' => true,
            'test' => $test,
            'message' => 'Test completado exitosamente. Los resultados han sido enviados a tu correo electrónico.',
        ], 201);
    }

    /**
     * Calculate score based on test type
     */
    private function calculateScore(string $testType, array $responses): int
    {
        $score = 0;

        switch ($testType) {
            case PsychologicalTest::TYPE_HAMILTON_ANXIETY:
                // Hamilton: suma directa de todas las respuestas (0-4 cada una)
                $score = array_sum($responses);
                break;

            case PsychologicalTest::TYPE_BECK_ANXIETY:
                // Beck Anxiety: suma directa de todas las respuestas (0-3 cada una)
                $score = array_sum($responses);
                break;

            case PsychologicalTest::TYPE_BECK_DEPRESSION:
                // Beck Depression: suma directa de todas las respuestas (0-3 cada una)
                $score = array_sum($responses);
                break;
        }

        return $score;
    }

    /**
     * Get interpretation based on test type and score
     */
    private function getInterpretation(string $testType, int $score): string
    {
        switch ($testType) {
            case PsychologicalTest::TYPE_HAMILTON_ANXIETY:
                if ($score < 18) {
                    return 'Ansiedad ligera';
                }
                elseif ($score < 25) {
                    return 'Ansiedad leve a moderada';
                }
                elseif ($score < 30) {
                    return 'Ansiedad moderada a severa';
                }
                else {
                    return 'Ansiedad muy severa';
                }

            case PsychologicalTest::TYPE_BECK_ANXIETY:
                if ($score <= 7) {
                    return 'Ansiedad mínima';
                }
                elseif ($score <= 15) {
                    return 'Ansiedad leve';
                }
                elseif ($score <= 25) {
                    return 'Ansiedad moderada';
                }
                else {
                    return 'Ansiedad severa';
                }

            case PsychologicalTest::TYPE_BECK_DEPRESSION:
                if ($score <= 13) {
                    return 'Depresión mínima';
                }
                elseif ($score <= 19) {
                    return 'Depresión leve';
                }
                elseif ($score <= 28) {
                    return 'Depresión moderada';
                }
                else {
                    return 'Depresión severa';
                }

            default:
                return 'No interpretado';
        }
    }

    /**
     * Send results email
     */
    private function sendResultsEmail(PsychologicalTest $test): void
    {
        try {
            // Email al paciente con sus resultados
            Mail::to($test->email)->send(new TestResultsMail($test));

            // Email de notificación al remitente (Maity) con los datos del paciente
            Mail::to([config('mail.from.address'), 'psicomaityrincon@gmail.com'])->send(new TestResultsNotificationMail($test));
        }
        catch (\Exception $e) {
            Log::error('Error enviando email de resultados del test', [
                'test_id' => $test->id,
                'email' => $test->email,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Show Hamilton Anxiety Test page
     */
    public function showHamilton()
    {
        return Inertia::render('Tests/HamiltonAnxietyTest');
    }

    /**
     * Show Beck Anxiety Test page
     */
    public function showBeckAnxiety()
    {
        return Inertia::render('Tests/BeckAnxietyTest');
    }

    /**
     * Show Beck Depression Test page
     */
    public function showBeckDepression()
    {
        return Inertia::render('Tests/BeckDepressionTest');
    }
}