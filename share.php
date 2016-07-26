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
$planId = $_GET["planId"];
$target = $_GET["target"];

$PWResult = $conn->query("select password from Users where username='".$username."'");
if($PWResult->num_rows > 0){
	$user = mysqli_fetch_array($PWResult);
	if($user['password'] === $password) {
		$targetId = mysqli_fetch_array($conn->query("select id from Users where username='".$target."'"))['id'];
		$conn->query("create temporary table tmpTb select * from Plans where id='".$planId."'");
		$conn->query("update tmpTb set id=null, ownerId='".$targetId."'");
		$conn->query("insert into Plans select * from tmpTb");
		$conn->query("drop temporary table if exists tmpTb");
	}
}

?>