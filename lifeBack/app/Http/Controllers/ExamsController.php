<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModelExams;
use Illuminate\Support\Facades\DB;


class ExamsController extends Controller
{
    private $examsModel;

    public function __construct()
    {
        $this->examsModel = new ModelExams();
    }

    public function index()
    {
        $exams = $this->examsModel->all();
        return response()->json($exams);
    }

    public function show($id)
    {
        $exams = $this->examsModel->find($id);

        if (!$exams) {
            return response()->json(['message' => 'Error'], 404);
        }

        return response()->json($exams);
    }
}
