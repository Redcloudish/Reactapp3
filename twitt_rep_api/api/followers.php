<?php
include 'db.php';

// Fetch followers of a user
$user_id = $_GET['user_id'];
$sql = "SELECT users.username FROM users INNER JOIN followers ON users.id = followers.follower_id WHERE followers.user_id = '$user_id'";
$result = $conn->query($sql);

$followers = [];
while ($row = $result->fetch_assoc()) {
    $followers[] = $row;
}
echo json_encode(['followers' => $followers]);

// Follow a user
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $follower_id = $_POST['follower_id'];

    $sql = "INSERT INTO followers (user_id, follower_id) VALUES ('$user_id', '$follower_id')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}

// Unfollow a user
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $user_id = $_DELETE['user_id'];
    $follower_id = $_DELETE['follower_id'];

    $sql = "DELETE FROM followers WHERE user_id = '$user_id' AND follower_id = '$follower_id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}
?>

