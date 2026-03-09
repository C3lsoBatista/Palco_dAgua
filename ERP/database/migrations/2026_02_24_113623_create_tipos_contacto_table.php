<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tipos_contacto', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->boolean('ativo')->default(true);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->softDeletes('deleted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tipos_contacto');
    }
};
