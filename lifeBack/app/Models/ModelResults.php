<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelResults extends Model
{
    use HasFactory;

    protected $table = 'results';

    protected $fillable = ['result'];

    public function relAnimal()
    {
        return $this->belongsTo(ModelAnimals::class, 'animal_id');
    }

    public function relExam()
    {
        return $this->belongsTo(ModelExams::class, 'exam_id');
    }
}

