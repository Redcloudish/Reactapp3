<?php

require_once('../config/config.php');
require_once('../config/database.php');

header('Content-Type: application/json');

// Pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

// Query tweets
$query = "SELECT t.id, t.content, t.created_at, u.username AS author 
          FROM tweets t 
          JOIN users u ON t.author_id = u.id 
          ORDER BY t.created_at DESC 
          LIMIT ?, ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ii', $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$tweets = $result->fetch_all(MYSQLI_ASSOC);

if (empty($tweets)) {
    http_response_code(404);
    echo json_encode(['message' => 'No tweets found']);
} else {
    echo json_encode(['tweets' => $tweets]);
}

$stmt->close();
$conn->close();


?>