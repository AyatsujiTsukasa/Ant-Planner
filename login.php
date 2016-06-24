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

$email = $_POST["email"];
$password = $_POST["password"];
if(isset($_POST["remember"])) {
	$time = 3600*24*90;
} else {
	$time = 300;
}

$valid = true;
$errorMsg = "<div class='alert alert-danger' role='alert'><ul>";

$emailValidation = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/';
$passwordValidation = '/^(?=.*[a-zA-Z])(?=.*[0-9])/';

if(preg_match($emailValidation, $email) !== 1) {
	$errorMsg .= "<li>Please enter a valid email address</li>";
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
$EmailCheckQuery = "select * from Users where email='".$email."'";
$EmailResult = $conn->query($EmailCheckQuery);
if($EmailResult->num_rows === 0){
	$errorMsg .= "<li>The email does not match any account</li>";
	$valid = false;
} else {
	$row = mysqli_fetch_array($EmailResult);
	if($row['password'] !== $password) {
		$errorMsg .= "<li>The email and password do not match</li>";
		$valid = false;
	}
}

if($valid){
	$username = $row['username'];
	$id = $row['id'];
	setcookie("username", $username, time()+$time, "/");
	setcookie("ownerId", $id, time()+$time, "/");
	setcookie("password", $password, time()+$time, "/");
	echo "Verified";
} else {
	echo $errorMsg."</ul><div>";
}

?>