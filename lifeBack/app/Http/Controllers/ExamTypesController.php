<?php

namespace App\Http\Controllers;

use App\Models\ModelExamTypes;
use Illuminate\Http\Request;


class ExamTypesController extends Controller
{
    private $examTypesModel;

    public function __construct()
    {
        $this->examTypesModel = new ModelExamTypes();
    }

    public function index()
    {
        $examTypes = $this->examTypesModel->all();
        return response()->json($examTypes);
    }

    public function show($id)
    {
        $examTypes = $this->examTypesModel->find($id);

        if (!$examTypes) {
            return response()->json(['message' => 'Error'], 404);
        }

        return response()->json($examTypes);
    }
}
