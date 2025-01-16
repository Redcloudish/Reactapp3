<?php

include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);  // Hash the password

    // Check if user already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $existingUser = $stmt->fetch();

    if ($existingUser) {
        echo json_encode(['success' => false, 'message' => 'User already exists']);
    } else {
        // Register new user
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registration successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed']);
        }
    }
}
?>


?>