<?php
// DNS Updater - run on Hostinger server
$token = 'JD5chFukk7qE4L1RFOC7TWtgjZIKfZgWiOzMdD7Wbde0805f';

// Try to update DNS via hPanel internal API
$urls = [
    'https://hpanel.hostinger.com/api/v1/websites/boazclothes.com/dns',
    'https://hpanel.hostinger.com/api/hosting/v1/domains/boazclothes.com/dns',
];

$payload = json_encode([
    'dns_records' => [
        ['type' => 'A', 'name' => '@', 'value' => '75.2.60.5', 'ttl' => 300],
        ['type' => 'A', 'name' => '@', 'value' => '99.83.190.102', 'ttl' => 300],
    ]
]);

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
            'Accept: application/json',
            'User-Agent: Mozilla/5.0',
        ],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    echo "URL: $url\nHTTP: $http\nResponse: " . substr($resp, 0, 1000) . "\nError: $err\n\n";
}

// Also try via WordPress HTTP API if curl fails
if (function_exists('wp_remote_request')) {
    foreach ($urls as $url) {
        $resp = wp_remote_request($url, [
            'method' => 'PUT',
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ],
            'body' => $payload,
            'timeout' => 15,
        ]);
        if (!is_wp_error($resp)) {
            echo "WP HTTP API $url: " . wp_remote_retrieve_response_code($resp) . "\n";
            echo "Body: " . substr(wp_remote_retrieve_body($resp), 0, 500) . "\n\n";
        } else {
            echo "WP Error: " . $resp->get_error_message() . "\n\n";
        }
    }
}

echo "DONE\n";
