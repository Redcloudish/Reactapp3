<?php
include('db.php');

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$stmt = $pdo->prepare("SELECT tweets.*, users.username FROM tweets JOIN users ON tweets.user_id = users.id ORDER BY tweets.created_at DESC LIMIT :limit OFFSET :offset");
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$tweets = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tweets);
?>

