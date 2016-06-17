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

$id = $_GET["id"];
$password = $_GET["password"];
$friendName = $_GET["friendName"];

$verificationPW = "select password from Users where id='".$id."'";
$pw = mysqli_fetch_array($conn->query($verificationPW))["password"];

if($pw === $password){
	$friendId = mysqli_fetch_array($conn->query("select id from Users where username='".$friendName."'"))['id'];
	$conn->query("delete from Requests where Requests.from='".$friendId."' and Requests.to='".$id."'");
	$conn->query("delete from Requests where Requests.from='".$id."' and Requests.to='".$friendId."'");
	break;
}

?>