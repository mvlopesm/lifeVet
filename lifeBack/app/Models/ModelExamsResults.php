<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelExamsResults extends Model
{
    use HasFactory;

    protected $table = 'exams_results';
    protected $fillable = ['animal_id', 'exam_id', 'comment', 'result'];

    public function relAnimal()
    {
        return $this->belongsTo(ModelAnimals::class, 'animal_id');
    }

    public function relExam()
    {
        return $this->belongsTo(ModelExams::class, 'exam_id');
    }
}

