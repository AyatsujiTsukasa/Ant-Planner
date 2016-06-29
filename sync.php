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
	$formattedDateTime = $formattedDate." ".$date['hours'].":".$date['minutes'].":".$date['seconds'];
	$conn->query("delete from Plans where ownerId='".$ownerId."' and due <= date_add('".$formattedDateTime."', interval -7 day)");
	switch ($timeFilter) {
		case 'Today':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 1 day) and due >= '".$formattedDate."'";
			break;
		case 'Tomorrow':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 2 day) and due >= '".$formattedDate."'";
			break;
		case 'Next 7 days':
			$getPlans .= " and due <= date_add('".$formattedDate."', interval 8 day) and due >= '".$formattedDate."'";
			break;
		case 'All future plans':
			$getPlans .= " and due >= '".$formattedDateTime."'";
			break;
		case 'Archive':
			$getPlans .= " and due <= '".$formattedDateTime."'";
			break;
		default:
			break;
	}
	$plans = $conn->query($getPlans);
	$rows = array();
	$i=0;
	while($r = mysqli_fetch_assoc($plans)) {
	    $rows[] = $r;
	    $i++;
	}
	setcookie("numPlans", $i, time()+$time, "/");
	echo json_encode($rows);
} else {
	echo "Error";
}


?>