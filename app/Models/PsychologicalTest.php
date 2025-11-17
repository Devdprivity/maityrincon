<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsychologicalTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'test_type',
        'responses',
        'score',
        'interpretation',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'responses' => 'array',
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    const TYPE_HAMILTON_ANXIETY = 'hamilton_anxiety';
    const TYPE_BECK_ANXIETY = 'beck_anxiety';
    const TYPE_BECK_DEPRESSION = 'beck_depression';

    public function getTestTypes(): array
    {
        return [
            self::TYPE_HAMILTON_ANXIETY => 'Test de Ansiedad de Hamilton',
            self::TYPE_BECK_ANXIETY => 'Inventario de Ansiedad de Beck (BAI)',
            self::TYPE_BECK_DEPRESSION => 'Inventario de Depresión de Beck (BDI-II)',
        ];
    }
}
