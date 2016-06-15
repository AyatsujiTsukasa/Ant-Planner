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
$id = $_POST["id"];

$verificationPW = "select password from Users where id='".$ownerId."'";
$pw = mysqli_fetch_array($conn->query($verificationPW))["password"];

if($pw === $password){
	$sql = "delete from Plans where id='".$id."' and ownerId='".$ownerId."'";
	$conn->query($sql);
}

?>