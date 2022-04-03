<?php

return [
    'secret' => env('MIX_NOCAPTCHA_SECRET'),
    'sitekey' => env('MIX_NOCAPTCHA_SITEKEY'),
    'options' => [
        'timeout' => 30,
    ],
];
