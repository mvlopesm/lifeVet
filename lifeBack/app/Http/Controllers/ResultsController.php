<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModelAnimals;
use App\Models\ModelResults;

class ResultsController extends Controller
{
    private $animalModel;
    private $resultsModel;

    public function __construct()
    {
        $this->animalModel = new ModelAnimals();
        $this->resultsModel = new ModelResults();
    }

    public function index()
    {
        $results = $this->resultsModel->all();
        return response()->json($results);
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
            'result' => 'required|string',
        ]);

        // Criação de um novo resultado
        $result = $this->resultsModel->create([
            'animal_id' => $request->input('animal_id'),
            'exam_id' => $request->input('exam_id'),
            'result' => $request->input('result'),
        ]);

        // Retorno de uma resposta ou redirecionamento, conforme necessário
        return response()->json(['message' => 'O resultado do exame foi concluído', 'result' => $result], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->resultsModel->find($id);

        if (!$result) {
            return response()->json(['message' => 'Nenhum resultado foi encontrado'], 404);
        }

        return response()->json($result);
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
            'result' => 'string',
        ]);

        $result = $this->resultsModel->find($id);

        if (!$result) {
            return response()->json(['message' => 'Nenhum resultado foi encontrado'], 404);
        }

        // Atualização dos dados do resultado
        $result->update($request->only(['animal_id', 'exam_id', 'result']));

        return response()->json(['message' => 'O resultado do exame doi alterado', 'result' => $result]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->resultsModel->find($id);

        if (!$result) {
            return response()->json(['message' => 'Nenhum resultado foi encontrado'], 404);
        }

        // Remoção do resultado do banco de dados
        DB::transaction(function () use ($result) {
            $result->delete();
        });

        return response()->json(['message' => 'O resultado do exame foi apagado']);
    }
}
