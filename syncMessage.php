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
$password = $_GET["password"];


$pw = mysqli_fetch_array($conn->query("select password from Users where username='".$username."'"))["password"];

if($pw === $password){
	$messages = $conn->query("select * from (select * from Messages where Messages.from='".$username."' or Messages.to='".$username."' order by id desc limit 20) sub order by id asc");
	$rows = array();
	$i=0;
	while($r = mysqli_fetch_assoc($messages)) {
	    $rows[] = $r;
	    $i++;
	}
	echo "{\"contents\": ".json_encode($rows)."}";
}

?>