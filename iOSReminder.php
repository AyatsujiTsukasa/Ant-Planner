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

$email = $_GET["email"];
$password = $_GET["password"];

$verification = "select password from Users where email='".$email."'";
$pw = mysqli_fetch_array($conn->query($verification))["password"];

if($pw === $password){
	$id = mysqli_fetch_array($conn->query("select id from Users where email='".$email."'"))["id"];
	$getPlans = "select * from Plans where ownerId='".$id."'";
	$date = getdate();
	$formattedDate = $date['year']."-".$date['mon']."-".$date['mday'];
	$formattedDateTime = $formattedDate." ".$date['hours'].":".$date['minutes'].":".$date['seconds'];
	$conn->query("delete from Plans where id='".$id."' and reminder <= date_add('".$formattedDateTime."', interval -7 day)");
	$getPlans .= " and reminder >= '".$formattedDateTime."'";
	$plans = $conn->query($getPlans . " order by reminder");
	$rows = array();
	$i=0;
	while($r = mysqli_fetch_assoc($plans)) {
	    $rows[] = $r;
	    $i++;
	}
	echo "{\"contents\": ".json_encode($rows)."}";
} else {
	echo "Error";
}


?>