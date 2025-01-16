<?php
// Database configuration
$dbHost = "localhost";          // Database host (use "127.0.0.1" if "localhost" causes issues)
$dbUsername = "root";           // Database username
$dbPassword = "";               // Database password
$dbName = "twitter_replacement"; // Updated database name for your project

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>