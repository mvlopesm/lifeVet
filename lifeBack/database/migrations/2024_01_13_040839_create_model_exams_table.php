<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create exams table
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('exam_type_id')->constrained('exam_types');
            $table->timestamps();
        });

        // Insert data into exams table
        collect([
            ['name' => 'Babesia SPP(PCR Real Time)', 'exam_type_id' => 1],
            ['name' => 'Cinomose(PCR Real Time)', 'exam_type_id' => 1],
            ['name' => 'Ehrlichia SPP(PCR Real Time)', 'exam_type_id' => 1],
            ['name' => 'Leishmania spp. - PCR Real Time', 'exam_type_id' => 1],
            ['name' => 'Ácido Úrico', 'exam_type_id' => 2],
            ['name' => 'Albumina', 'exam_type_id' => 2],
            ['name' => 'ALT (TGP)', 'exam_type_id' => 2],
            ['name' => 'Amilase', 'exam_type_id' => 2],
            ['name' => 'Pesquisa Seriada de Hemocitozoários (PSH)', 'exam_type_id' => 3],
            ['name' => 'Teste de Coagulação (PT e APTT)', 'exam_type_id' => 3],
            ['name' => 'Teste de Compatibilidade Sanguínea', 'exam_type_id' => 3],
            ['name' => 'Teste para Anemia Hemolítica Imunomediada', 'exam_type_id' => 3],
            ['name' => '4DX - IgG elisa (Ehrlichia+Borrelia+Dirofilária)', 'exam_type_id' => 4],
            ['name' => 'Cinomose + Parvovirose - Elisa IgG Dot Blot', 'exam_type_id' => 4],
            ['name' => 'Cinomose + Parvovirose - Elisa IgM Dot Blot', 'exam_type_id' => 4],
            ['name' => 'Dirofilariose', 'exam_type_id' => 4],
        ])->each(function ($data) {
            DB::table('exams')->insert($data);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};

