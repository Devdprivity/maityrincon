<?php

namespace App\Mail;

use App\Models\PsychologicalTest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestResultsNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public PsychologicalTest $test
    ) {}

    public function envelope(): Envelope
    {
        $testNames = [
            PsychologicalTest::TYPE_HAMILTON_ANXIETY => 'Hamilton Ansiedad',
            PsychologicalTest::TYPE_BECK_ANXIETY => 'Beck Ansiedad (BAI)',
            PsychologicalTest::TYPE_BECK_DEPRESSION => 'Beck Depresión (BDI-II)',
        ];

        $testName = $testNames[$this->test->test_type] ?? 'Test';

        return new Envelope(
            subject: "Nuevo test completado: {$this->test->name} - {$testName}",
        );
    }

    public function content(): Content
    {
        $testNames = [
            PsychologicalTest::TYPE_HAMILTON_ANXIETY => 'Test de Ansiedad de Hamilton',
            PsychologicalTest::TYPE_BECK_ANXIETY => 'Inventario de Ansiedad de Beck (BAI)',
            PsychologicalTest::TYPE_BECK_DEPRESSION => 'Inventario de Depresión de Beck (BDI-II)',
        ];

        return new Content(
            view: 'emails.test-results-notification',
            with: [
                'test' => $this->test,
                'testName' => $testNames[$this->test->test_type] ?? 'Test Psicológico',
            ],
        );
    }
}
