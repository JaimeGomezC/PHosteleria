<?php

return [

    'default' => env('MAIL_MAILER', 'smtp'),

    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.gmail.com'),
            'port' => env('MAIL_PORT', 587),
            'encryption' => env('MAIL_ENCRYPTION', 'tls'),
            'username' => env('MAIL_USERNAME', 'hostelerialaflota21@gmail.com'),
            'password' => env('MAIL_PASSWORD', 'rytgxcjbneddqijd'),
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