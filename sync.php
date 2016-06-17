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
$timeFilter = $_POST["timeFilter"];
$tagFilter = $_POST["tagFilter"];
$time = 300;

$verification = "select password from Users where id='".$ownerId."'";
$pw = mysqli_fetch_array($conn->query($verification))["password"];

if($pw === $password){
	$friendIds = explode("&", mysqli_fetch_array($conn->query("select friends from Users where id='".$ownerId."'"))["friends"]);
	$friends = "";
	foreach ($friendIds as $value) {
		$friends .= mysqli_fetch_array($conn->query("select username from Users where id='".$value."'"))["username"]."&";
	}
	$requestIds = $conn->query("select Requests.from from Requests where Requests.to = '".$ownerId."'");
	$requests = "";
	while ($value = mysqli_fetch_array($requestIds)["from"]) {
		$requests .= mysqli_fetch_array($conn->query("select username from Users where id='".$value."'"))["username"]."&";
	}
	setcookie("friends", $friends, time()+$time, "/");
	setcookie("requests", $requests, time()+$time, "/");
	$getPlans = "select * from Plans where ownerId='".$ownerId."'";
	if($tagFilter !== "All"){
		$getPlans .= " and customTags='".$tagFilter."'";
	}
	$date = getdate();
	$formattedDate = $date['year']."-".$date['mon']."-".$date['mday'];
	switch ($timeFilter) {
		case 'Today':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 1 day)";
			break;
		case 'Tomorrow':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 2 day)";
			break;
		case 'Next 7 days':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 8 day)";
			break;
		default:
			break;
	}
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
	setcookie("numPlans", $i, time()+$time, "/");
	echo "Success";
} else {
	echo "Error";
}


?>