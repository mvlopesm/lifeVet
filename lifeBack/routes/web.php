<?php

use App\Http\Controllers\ExamsResultsController;
use App\Http\Controllers\AnimalsController;
use App\Http\Controllers\ExamTypesController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::post('/login', [LoginController::class, 'store']);
// Route::post('/register', [LoginController::class, 'register']);

// // Rotas protegidas por autenticação
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get('/exams-results', [ExamsResultsController::class, 'index']);
//     Route::get('/exams-results/{id}', [ExamsResultsController::class, 'show']);
//     Route::post('/exams-results/store', [ExamsResultsController::class, 'store']);
//     Route::put('/exams-results/update/{id}', [ExamsResultsController::class, 'update']);
//     Route::delete('/exams-results/destroy/{id}', [ExamsResultsController::class, 'destroy']);

//     // Rotas para AnimalsController
//     Route::get('/animals', [AnimalsController::class, 'index']);
//     Route::get('/animals/{id}', [AnimalsController::class, 'show']);
//     Route::post('/animals/store', [AnimalsController::class, 'store']);
//     Route::put('/animals/update/{id}', [AnimalsController::class, 'update']);
//     Route::delete('/animals/destroy/{id}', [AnimalsController::class, 'destroy']);

//     // Rotas para ExamTypesController
//     Route::get('/exam-types', [ExamTypesController::class, 'index']);
//     Route::get('/exam-types/{id}', [ExamTypesController::class, 'show']);

//     // Rotas para ExamsController
//     Route::get('/exams', [ExamsController::class, 'index']);
//     Route::get('/exams/{id}', [ExamsController::class, 'show']);
// });
