<?php
$servername = "localhost";
$name = "cnitna_antinc";
$password = "Zyh2FXwxpTsmVQCx";
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
$time = $_POST["remember"] === "remember" ? 300 : 3600*24*90;

$valid = true;
$errorMsg = "Error: <ul>";

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
	$errorMsg .= "<li>Email does not exist</li>";
	$valid = false;
} else {
	$row = mysqli_fetch_array($EmailResult);
	if($row['password'] !== $password) {
		$errorMsg .= "<li>Incorrect password</li>";
		$valid = false;
	}
}

if($valid){
	$username = $row['username'];
	$id = $row['id'];
	setcookie("username", $username, time()+$time, "/");
	setcookie("id", $id, time()+$time, "/");
	echo "<script>
			window.location = 'userhome.html';
		  </script>";
} else {
	echo $errorMsg."</ul>";
}

?>