<?php

use App\Http\Controllers\ExamsResultsController;
use App\Http\Controllers\AnimalsController;
use App\Http\Controllers\ExamTypesController;
use App\Http\Controllers\ExamsController;

Route::get('/', function () {
    return view('welcome');
});

// Rotas para ExamsResultsController
Route::get('/exams-results', [ExamsResultsController::class, 'index']);
Route::get('/exams-results/{id}', [ExamsResultsController::class, 'show']);
Route::post('/exams-results/store', [ExamsResultsController::class, 'store']);
Route::put('/exams-results/update/{id}', [ExamsResultsController::class, 'update']);
Route::delete('/exams-results/destroy/{id}', [ExamsResultsController::class, 'destroy']);

// Rotas para AnimalsController
Route::get('/animals', [AnimalsController::class, 'index']);
Route::get('/animals/{id}', [AnimalsController::class, 'show']);
Route::post('/animals/store', [AnimalsController::class, 'store']);
Route::put('/animals/update/{id}', [AnimalsController::class, 'update']);
Route::delete('/animals/destroy/{id}', [AnimalsController::class, 'destroy']);

// Rotas para ExamTypesController
Route::get('/exam-types', [ExamTypesController::class, 'index']);
Route::get('/exam-types/{id}', [ExamTypesController::class, 'show']);

// Rotas para ExamTypesController
Route::get('/exams', [ExamsController::class, 'index']);
Route::get('/exams/{id}', [ExamsController::class, 'show']);
