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

$ownerId = $_POST["ownerId"];
$password = $_POST["password"];

$verification = "select password from Users where id='".$ownerId."'";
$pw = mysqli_fetch_array($conn->query($verification))["password"];

if($pw === $password){
	date_default_timezone_set("Asia/Singapore"); //如果可以修改服务器的默认时间，则可将这行删去
	$date = getdate();
	$formattedDate = $date['year']."-".$date['mon']."-".$date['mday'];
	$formattedDateTime = $formattedDate." ".$date['hours'].":".$date['minutes'].":".$date['seconds'];
	$getPlans = "select name, due, reminder from Plans where ownerId='".$ownerId."' and reminder >= '".$formattedDateTime."' and desktopPush='1' order by reminder";
	$plans = $conn->query($getPlans);
	if($plans->num_rows === 0) {
		echo "No plan";
	} else {
		$nextDuePlan = mysqli_fetch_assoc($plans);
		echo json_encode($nextDuePlan);
	}
} else {
	echo "No plan";
}


?>