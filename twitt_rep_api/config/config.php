<?php
// Allowed origins for CORS
$allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];
$allowedHeaders = ['Content-Type', 'Authorization'];
$allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

// Set headers for CORS
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
    header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));
    header('Access-Control-Max-Age: 86400'); // Cache preflight request for 24 hours
    http_response_code(200);
    exit();
}
?>