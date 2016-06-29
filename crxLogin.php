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

$email = isset($_GET["email"])?$_GET["email"]:"";
$username = isset($_GET["username"])?$_GET["username"]:"";
$password = $_GET["password"];

$verified = false;

$PWResult = $conn->query("select password, id from Users where email='".$email."' or username='".$username."'");
if($PWResult->num_rows > 0){
	$user = mysqli_fetch_array($PWResult);
	$ownerId = $user['id'];
	if($user['password'] === $password) {
		$verified = true;
	}
}

if($verified){
	$result = $conn->query("select id, name, due, customTags, url, rep from Plans where ownerId = '".$ownerId."'");
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
	    $rows[] = $r;
	}
	echo json_encode($rows);
} else {
	echo "Not verified";
}


?>