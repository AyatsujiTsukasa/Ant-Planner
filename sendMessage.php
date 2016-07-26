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
$content = $_GET["content"];
$to = $_GET["to"];

$PWResult = $conn->query("select password from Users where username='".$username."'");
if($PWResult->num_rows > 0){
	$user = mysqli_fetch_array($PWResult);
	if($user['password'] === $password) {
		$conn->query("insert into Messages (Messages.from, Messages.to, content) values('".$username."', '".$to."', '".$content."')");
	}
}

?>