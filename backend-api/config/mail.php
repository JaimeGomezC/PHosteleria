<?php

return [

    'default' => env('MAIL_MAILER', 'smtp'),

    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.zoho.eu'),
            'port' => env('MAIL_PORT', 465),
            'encryption' => env('MAIL_ENCRYPTION', 'SSL'),
            'username' => env('MAIL_USERNAME', 'hostelerialaflota@zohomail.eu'),
            'password' => env('MAIL_PASSWORD', 'Proyectohosteleria21'),
            'timeout' => null,
            'auth_mode' => null,
        ],
        // ... otros transportes de correo
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'hostelerialaflota21@gmail.com'),
        'name' => env('MAIL_FROM_NAME', 'Hosteleria La Flota'),
    ],

    'markdown' => [
        'theme' => 'default',
        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],

];