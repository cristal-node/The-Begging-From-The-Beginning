<?php

// Start the session
session_start();

// Destroy all data registered to a session
session_destroy();

// Redirect the user back to the main game page
header('Location: index.php');
exit(); // Ensure no other code runs after the redirect

?>