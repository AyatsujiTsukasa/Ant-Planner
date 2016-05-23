<?php
$servername = "localhost";
$name = "cnitna_antinc";
$password = "Zyh2FXwxpTsmVQCx";
$dbname = "Ant_Planner";
$conn = mysqli_connect($servername, $name, $password, $dbname);
if (!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}
if(!$_GET) {
	die("This file cannot be accessed directly!");
}
$q = $_GET['q'];
$para = $_GET['para'];
$sql = "select * from Users where ".$para." = '".$q."'";
$result = $conn->query($sql);
if($result->num_rows > 0){
	echo "exist";
} else {
	echo "does not exist";
}
?>