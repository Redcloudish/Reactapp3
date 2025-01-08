<?php
// Database configuration
$dbHost = "localhost";          // Database host (use "127.0.0.1" if "localhost" causes issues)
$dbUsername = "root";           // Database username
$dbPassword = "";               // Database password
$dbName = "twitter_replacement"; // Updated database name for your project

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    // Log the error message (optional: write to a log file for debugging)
    error_log("Database connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}
?>