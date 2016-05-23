<?php
$servername = "localhost";
$username = "cnitna_antinc";
$password = "Zyh2FXwxpTsmVQCx";

// Create connection
$conn = mysql_connect($servername, $username, $password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>