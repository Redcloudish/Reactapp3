<?php

require_once('../config/config.php');
require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Retrieve and decode the request body
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

// Validate input fields
if (empty($data['content']) || empty($data['author_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Error: Missing or empty required fields']);
    exit();
}

// Sanitize input
$content = filter_var($data['content'], FILTER_SANITIZE_STRING);
$author_id = (int)$data['author_id']; // Assuming this comes as an integer

// Insert the tweet
$stmt = $conn->prepare('INSERT INTO tweets (content, author_id) VALUES (?, ?)');
$stmt->bind_param('si', $content, $author_id);

if ($stmt->execute()) {
    $id = $stmt->insert_id;
    http_response_code(201);
    echo json_encode(['message' => 'Tweet created successfully', 'id' => $id]);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error creating tweet: ' . $stmt->error]);
}

$stmt->close();
$conn->close();

?>