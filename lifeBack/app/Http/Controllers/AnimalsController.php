<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModelAnimals;
use App\Models\ModelResults;

class AnimalsController extends Controller
{
    private $animalModel;
    private $resultsModel;

    public function __construct()
    {
        $this->animalModel = new ModelAnimals();
        $this->resultsModel = new ModelResults();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $animals = $this->animalModel->all();
        return response()->json($animals);
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
        $request->validate([
            'name' => 'required|string',
            'species' => 'required|string',
            'breed' => 'required|string',
            'age' => 'required|integer',
            'tutor' => 'required|string',
        ]);

        $animal = $this->animalModel->create($request->all());

        return response()->json(['message' => 'Animal cadastrado', 'animal' => $animal], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $animal = $this->animalModel->find($id);

        if (!$animal) {
            return response()->json(['message' => 'Animal não encontrado'], 404);
        }

        return response()->json($animal);
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
        $request->validate([
            'name' => 'string',
            'species' => 'string',
            'breed' => 'string',
            'age' => 'integer',
            'tutor' => 'string',
        ]);

        $animal = $this->animalModel->find($id);

        if (!$animal) {
            return response()->json(['message' => 'Animal não encontrado'], 404);
        }

        $animal->update($request->all());

        return response()->json(['message' => 'Cadastro atualizado', 'animal' => $animal]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $animal = $this->animalModel->find($id);

        if (!$animal) {
            return response()->json(['message' => 'Animal não encontrado'], 404);
        }

        DB::transaction(function () use ($animal) {
            $animal->delete();
        });

        return response()->json(['message' => 'Cadastro excluído']);
    }
}
