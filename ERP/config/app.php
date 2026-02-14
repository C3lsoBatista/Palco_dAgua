<?php

return [

    'name' => env('APP_NAME', 'Palco d\'Água'),

    'env' => env('APP_ENV', 'production'),

    'debug' => (bool) env('APP_DEBUG', false),

    'url' => env('APP_URL', 'http://localhost'),

    // Alterado para o fuso horário de Portugal Continental
    'timezone' => 'Europe/Lisbon',

    /*
    |--------------------------------------------------------------------------
    | Localização da Aplicação
    |--------------------------------------------------------------------------
    */

    // Definimos pt_PT como padrão
    'locale' => env('APP_LOCALE', 'pt_PT'),

    // Se falhar o pt_PT, mantém o inglês para não quebrar o sistema
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),

    // Faker em português para gerar nomes e moradas realistas nos testes
    'faker_locale' => 'pt_PT',

    'cipher' => 'AES-256-CBC',

    'key' => env('APP_KEY'),

    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],

];