//<?php
//header('Content-Type: application/json');

// Load configuration files
//require_once('../config/config.php');
//require_once('../config/database.php');

// Define configuration options
//$allowedMethods = ['GET'];
//$maxTweetsPerPage = 5; // Maximum tweets per page

// Implement basic pagination
//$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
//$offset = ($page - 1) * $maxTweetsPerPage;

// Query to count total tweets
//$countQuery = "SELECT COUNT(*) AS totalTweets FROM tweets";
//$countResult = mysqli_query($conn, $countQuery);

// Check if total tweets query is successful
//if (!$countResult) {
    //http_response_code(500); // Internal server error
   // echo json_encode(['message' => 'Error querying database for total tweets count: ' . mysqli_error($conn)]);
    //mysqli_close($conn);
    ///exit();
//}

//$countRow = mysqli_fetch_assoc($countResult);
//$totalTweets = $countRow['totalTweets'];

// Query to get paginated tweets with ordering
//$query = "SELECT * FROM tweets ORDER BY created_at DESC LIMIT $offset, $maxTweetsPerPage";
//$result = mysqli_query($conn, $query);

// Check if tweets query is successful
if (!$result) {
    http_response_code(500); // Internal server error
    echo json_encode(['message' => 'Error querying database for paginated tweets: ' . mysqli_error($conn)]);
    mysqli_close($conn);
    exit();
}

// Convert query result into an associative array
$tweets = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Check if there are tweets
//if (empty($tweets)) {
    //http_response_code(404); // Not found error
    //echo json_encode(['message' => 'No tweets found', 'totalTweets' => $totalTweets]);
//} else {
    // Return JSON response including totalTweets
   // echo json_encode(['tweets' => $tweets, 'totalTweets' => $totalTweets]);
//}

// Close database connection
//mysqli_close($conn);

?>



<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = $_POST['user_id'];
    $content = $_POST['content'];

    $stmt = $pdo->prepare("INSERT INTO tweets (user_id, content) VALUES (:user_id, :content)");
    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':content', $content);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Tweet created']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create tweet']);
    }
}
?>
