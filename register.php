<?php
$servername = "localhost";
$name = "antinc";
$password = "AntInc_AntInc123";
$dbname = "Ant_Planner";
$conn = mysqli_connect($servername, $name, $password, $dbname);
if (!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}
if(!$_GET) {
	die("This file cannot be accessed directly!");
}

$username = $_GET["username"];
$email = $_GET["email"];
$password = $_GET["password"];
$password2 = $_GET["password2"];
if(isset($_GET["remember"])) {
	$time = 3600*24*90;
} else {
	$time = 300;
}

$valid = true;
$errorMsg = "<div class='alert alert-danger' role='alert'><ul>";

$usernameValidation = '/^[a-zA-Z0-9 ]{3,20}$/';
$emailValidation = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/';
$passwordValidation = '/^(?=.*[a-zA-Z])(?=.*[0-9])/';

if(preg_match($usernameValidation, $username) !== 1) {
	$errorMsg .= "<li>The username can only contain letters, numbers and spaces, and 3-20 characters</li>";
	$valid = false;
}
if(preg_match($emailValidation, $email) !== 1) {
	$errorMsg .= "<li>Please enter a valid email address</li>";
	$valid = false;
}
if($password !== $password2) {
	$errorMsg .= "<li>Two passwords do not match</li>";
	$valid = false;
}
if(!(preg_match($passwordValidation, $password))){
	$errorMsg .= "<li>The password should contain both letters and numbers</li>";
	$valid = false;
}
if (strlen($password) < 6) {
	$errorMsg .= "<li>The password should contain at least 6 characters</li>";
	$valid = false;
}
if (strlen($password) > 15) {
	$errorMsg .= "<li>The password should contain at most 15 characters</li>";
	$valid = false;
}
$UsernameCheckQuery = "select * from Users where username='".$username."'";
$usernameResult = $conn->query($UsernameCheckQuery);
if($usernameResult->num_rows > 0){
	$errorMsg .= "<li>Username already taken</li>";
	$valid = false;
}
$EmailCheckQuery = "select * from Users where email='".$email."'";
$EmailResult = $conn->query($EmailCheckQuery);
if($EmailResult->num_rows > 0){
	$errorMsg .= "<li>Email already taken</li>";
	$valid = false;
}

if($valid){
	$sql = "insert into Users (username, email, password, friends) values('".$username."','".$email."','".$password."','')";
	if($conn->query($sql) === true) {
		$getID = "select id from Users where email='".$email."'";
		$id = mysqli_fetch_array($conn->query($getID))["id"];
		setcookie("username", $username, time()+$time, "/");
		setcookie("ownerId", $id, time()+$time, "/");
		setcookie("password", $password, time()+$time, "/");
		echo "<div class='alert alert-success' role='alert'><strong>Account Created!</strong><ul><li>Username: ".$username."</li><li>Email: ".$email."</li></ul><strong id='redirect'></strong></div>";
	} else {
		echo "<div class='alert alert-danger' role='alert'><p>Connection error. Please try again later.</p></div>";
	}
} else {
	echo $errorMsg."</ul></div>";
}

?>
<!-- 