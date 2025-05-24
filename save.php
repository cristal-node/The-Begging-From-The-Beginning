<?php

// Always start the session first
session_start();

// We only want to run this code if data was sent via a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the raw JSON data sent from our JavaScript 'fetch'
    $json_data = file_get_contents('php://input');

    // Decode the JSON string into a PHP object/array
    $game_state = json_decode($json_data);

    // Store the entire game state object in the session
    $_SESSION['gameState'] = $game_state;

    // Send a success response back to the JavaScript
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'Game saved successfully.']);

} else {
    // If someone tries to just navigate to save.php, do nothing.
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

?>