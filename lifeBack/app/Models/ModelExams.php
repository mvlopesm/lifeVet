<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelExams extends Model
{
    use HasFactory;

    protected $table = 'exams';

    protected $fillable = ['name', 'exam_type_id'];

    public function relAnimal()
    {
        return $this->belongsTo(ModelAnimals::class, 'animal_id');
    }
}
