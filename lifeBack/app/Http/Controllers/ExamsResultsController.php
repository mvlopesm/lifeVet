<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModelAnimals;
use App\Models\ModelExamsResults;
use Illuminate\Support\Facades\DB;

class ExamsResultsController extends Controller
{
    private $animalModel;
    private $examsResultsModel;

    public function __construct()
    {
        $this->animalModel = new ModelAnimals();
        $this->examsResultsModel = new ModelExamsResults();
    }

    public function index()
    {
        $examsResults = $this->examsResultsModel->all();
        return response()->json($examsResults);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validação dos dados do request
        $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'exam_id' => 'required|exists:exams,id',
            'comment' => 'string',
            'result' => 'string',
        ]);

        // Criação de um novo resultado
        $examsResult = $this->examsResultsModel->create([
            'animal_id' => $request->input('animal_id'),
            'exam_id' => $request->input('exam_id'),
            'comment' => $request->input('comment'),
            'result' => $request->input('result'),
        ]);

        // Retorno de uma resposta ou redirecionamento, conforme necessário
        return response()->json(['message' => 'O exame foi atualizado', 'result' => $examsResult], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $examsResult = $this->examsResultsModel->find($id);

        if (!$examsResult) {
            return response()->json(['message' => 'Nenhum exame foi encontrado'], 404);
        }

        return response()->json($examsResult);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validação dos dados do request
        $request->validate([
            'animal_id' => 'exists:animals,id',
            'exam_id' => 'exists:exams,id',
            'comment' => 'string',
            'result' => 'string',
        ]);

        $examsResult = $this->examsResultsModel->find($id);

        if (!$examsResult) {
            return response()->json(['message' => 'Nenhum resultado foi encontrado'], 404);
        }

        // Atualização dos dados do resultado
        $examsResult->update($request->only(['animal_id', 'exam_id', 'comment', 'result']));

        return response()->json(['message' => 'O exame foi alterado', 'result' => $examsResult]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $examsResult = $this->examsResultsModel->find($id);

        if (!$examsResult) {
            return response()->json(['message' => 'Nenhum resultado foi encontrado'], 404);
        }

        try {
            DB::transaction(function () use ($examsResult) {
                $examsResult->delete();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir animal', 'error' => $e->getMessage()], 500);
        };
        return response()->json(['message' => 'O exame foi apagado']);
    }
}
