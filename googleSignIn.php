<?php
$servername = "localhost";
$name = "antinc";
$password = "AntInc_AntInc123";
$dbname = "Ant_Planner";
$conn = mysqli_connect($servername, $name, $password, $dbname);
if (!$conn) {
	die("Connection failed: ".mysqli_connect_error());
}
if(!$_POST) {
	die("This file cannot be accessed directly!");
}
$username = $_POST['username'];
$email = $_POST['email'];
$password = "google";
$EmailCheckQuery = "select * from Users where email='".$email."'";
$EmailResult = $conn->query($EmailCheckQuery);
if($EmailResult->num_rows === 0){
	// If email does not match to any record, then register first
	$sql = "insert into Users (username, email, password, friends) values('".$username."','".$email."','".$password."','')";
	if($conn->query($sql) === true) {
		$EmailCheckQuery = "select * from Users where email='".$email."'";
		$EmailResult = $conn->query($EmailCheckQuery);
	} else {
		exit("Connection error. Please try again later.");
	}
}
// Log in
$row = mysqli_fetch_array($EmailResult);
$id = $row['id'];
$password = $row['password'];
$time = 300;
setcookie("username", $username, time()+$time, "/");
setcookie("ownerId", $id, time()+$time, "/");
setcookie("password", $password, time()+$time, "/");
echo "<script>
		window.location = 'userhome.html';
	  </script>";
?>