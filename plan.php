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

$id = $_POST["planId"];
$ownerId = intval($_POST["ownerId"]);
$importance = intval($_POST["importance"]);
$planName = $_POST["name"];
$planDesc = $_POST["planDesc"];
$due = $_POST["due"];
switch ($_POST["repeat"]) {
	case 'day':
		$repeat = 1;
		break;
	case 'week':
		$repeat = 2;
		break;
	case 'month':
		$repeat = 3;
		break;
	case 'year':
		$repeat = 4;
		break;
	default:
		$repeat = 0;
		break;
}
$phoneAlarm = $_POST["phoneAlarm"];
$phonePush = $_POST["phonePush"];
$desktopPush = $_POST["desktopPush"];
$url = $_POST["url"];
$location = $_POST["location"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];
$tags = $_POST["tags"];

if($id === ""){
	$sql = "insert into Plans (ownerId, name, description, due, importance, phonePush, phoneAlarm, desktopPush, customTags, url, lat, lng, location, rep) values('".$ownerId."','".$planName."','".$planDesc."','".$due."','".$importance."','".$phonePush."','".$phoneAlarm."','".$desktopPush."','".$tags."','".$url."','".$lat."','".$lng."','".$location."','".$repeat."')";
	$conn->query($sql);
} else {
	$sql = "update Plans set ownerId='".$ownerId."',name='".$planName."',description='".$planDesc."',due='".$due."',importance='".$importance."',phonePush='".$phonePush."',phoneAlarm='".$phoneAlarm."',desktopPush='".$desktopPush."',customTags='".$tags."',url='".$url."',lat='".$lat."',lng='".$lng."',location='".$location."',rep='".$repeat."' where id='".$id."'";
	$conn->query($sql);
}

// $EmailCheckQuery = "select * from Users where email='".$email."'";
// $EmailResult = $conn->query($EmailCheckQuery);



?>