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
$friendId = $_GET["friendId"];
$action = $_GET["action"];

$verificationPW = "select password from Users where id='".$id."'";
$pw = mysqli_fetch_array($conn->query($verificationPW))["password"];

if($pw === $password){
	switch ($action) {
		case 'sendRequest':
			$conn->query("insert into Requests (Requests.from, Requests.to) values ('".$id."','".$friendId."')");
			break;
		case 'deleteFriend':
			$friends = explode("&", mysqli_fetch_array($conn->query("select friends from Users where id='".$id."'"))["friends"]);
			foreach (array_keys($friends, $friendId) as $key) {
			    unset($friends[$key]);
			}
			$conn->query("update Users set friends='".join("&", $friends)."' where id='".$id."'");
			$op = explode("&", mysqli_fetch_array($conn->query("select friends from Users where id='".$friendId."'"))["friends"]);
			foreach (array_keys($op, $id) as $key) {
			    unset($op[$key]);
			}
			$conn->query("update Users set friends='".join("&", $op)."' where id='".$friendId."'");
			break;
		case 'cancelRequest':
			$conn->query("delete from Requests where Requests.from='".$id."' and Requests.to='".$friendId."'");
			break;
		default:
			break;
	}
}

?>