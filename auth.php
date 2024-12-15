<?php
session_start();

// File to store user data
$usersFile = 'users.json';

// Load existing users from the file (if it exists)
if (file_exists($usersFile)) {
    $users = json_decode(file_get_contents($usersFile), true);
} else {
    $users = [];
}

// Sign Up (Register a new user)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);  // Hash password

    // Check if the username already exists
    if (isset($users[$username])) {
        echo "Username already exists!";
    } else {
        // Add the new user
        $users[$username] = $password;

        // Save the users array to the file
        file_put_contents($usersFile, json_encode($users));

        // Redirect to login page after successful registration
        header("Location: login.html");
        exit();  // Make sure the script stops here
    }
}

// Log In
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username exists and the password matches
    if (isset($users[$username]) && password_verify($password, $users[$username])) {
        $_SESSION['user'] = $username;
        header("Location: task-management.html"); // Redirect to task management page after login
        exit();
    } else {
        echo "Invalid username or password!";
    }
}

// Log Out
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: login.html"); // Redirect to login page after logout
    exit();
}
?>
