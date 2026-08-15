<?php

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'your_database',
        'user' => 'your_database_user',
        'pass' => 'your_database_password',
        'charset' => 'utf8mb4',
    ],

    'timezone' => 'Asia/Jakarta',

    // Generate your own password hash with:
    // password_hash('your-password', PASSWORD_DEFAULT)
    'password_hash' => '$2y$10$REPLACE_WITH_YOUR_PASSWORD_HASH',
];
