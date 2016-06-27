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

$password = $_POST["newPassword"];
$password2 = $_POST["newPassword2"];
$id = intval($_POST["id"]);

$valid = true;
$errorMsg = "<div class='alert alert-danger' role='alert'><ul>";

$passwordValidation = '/^(?=.*[a-zA-Z])(?=.*[0-9])/';

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

if($valid){
	$sql = "update Users set password='".$password."' where id='".$id."'";
	if($conn->query($sql) === true) {
		echo "<div class='alert alert-success' role='alert'><strong>Password Changed!</strong><ul><li>Please log in again.</li></ul><strong id='redirect'></strong></div>";
	} else {
		echo "<div class='alert alert-danger' role='alert'><p>Connection error. Please try again later.</p></div>";
	}
} else {
	echo $errorMsg."</ul></div>";
}

?>
<!-- 