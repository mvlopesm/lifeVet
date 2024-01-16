<?php

use App\Http\Controllers\ResultsController;
use App\Http\Controllers\AnimalsController;

Route::get('/', function () {
    return view('welcome');
});

// Rotas para ResultsController
Route::get('/results', [ResultsController::class, 'index']);
Route::get('/results/{id}', [ResultsController::class, 'show']);
Route::post('/results', [ResultsController::class, 'store']);
Route::put('/results/{id}', [ResultsController::class, 'update']);
Route::delete('/results/{id}', [ResultsController::class, 'destroy']);

// Rotas para AnimalsController
Route::get('/animals', [AnimalsController::class, 'index']);
Route::get('/animals/{id}', [AnimalsController::class, 'show']);
Route::post('/animals', [AnimalsController::class, 'store']);
Route::put('/animals/{id}', [AnimalsController::class, 'update']);
Route::delete('/animals/{id}', [AnimalsController::class, 'destroy']);
