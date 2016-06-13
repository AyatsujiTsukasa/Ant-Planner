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
$errorMsg = "  Error: <ul>";

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
	setcookie("ownerId", $id, time()+$time, "/");
	$getPlans = "select * from Plans where ownerId='".$row['id']."'";
	$plans = $conn->query($getPlans);
	for($i=0; $plan = mysqli_fetch_array($plans); $i++){
		setcookie("planId_".$i, $plan['id'], time()+$time, "/");
		setcookie("ownerId_".$i, $plan['ownerId'], time()+$time, "/");
		setcookie("name_".$i, $plan['name'], time()+$time, "/");
		setcookie("description_".$i, $plan['description'], time()+$time, "/");
		setcookie("due_".$i, $plan['due'], time()+$time, "/");
		setcookie("importance_".$i, $plan['importance'], time()+$time, "/");
		setcookie("phonePush_".$i, $plan['phonePush'], time()+$time, "/");
		setcookie("phoneAlarm_".$i, $plan['phoneAlarm'], time()+$time, "/");
		setcookie("desktopPush_".$i, $plan['desktopPush'], time()+$time, "/");
		setcookie("tags_".$i, $plan['customTags'], time()+$time, "/");
		setcookie("url_".$i, $plan['url'], time()+$time, "/");
		setcookie("lat_".$i, $plan['lat'], time()+$time, "/");
		setcookie("lng_".$i, $plan['lng'], time()+$time, "/");
		setcookie("location_".$i, $plan['location'], time()+$time, "/");
		setcookie("rep_".$i, $plan['rep'], time()+$time, "/");
	}
	echo "<script>
			window.location = 'userhome.html';
		  </script>";
} else {
	echo $errorMsg."</ul>";
}

?>