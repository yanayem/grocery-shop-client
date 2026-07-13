<?php

return [
    'projects' => [
        'app' => [
            'credentials' => [
                'project_id' => env('FIREBASE_PROJECT_ID'),
                'private_key' => str_replace('\\n', "\n", env('FIREBASE_PRIVATE_KEY')),
                'client_email' => env('FIREBASE_CLIENT_EMAIL'),
            ],
        ],
    ],
];
