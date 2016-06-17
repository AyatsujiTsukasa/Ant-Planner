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

$id = $_POST["id"];
$key = $_POST["key"];

$sentResults = $conn->query("select Requests.to from Requests where Requests.from='".$id."'");
$requestedFriends = array();
while($result = mysqli_fetch_array($sentResults)){
	array_push($requestedFriends, $result["to"]);
}
$friends = explode("&", mysqli_fetch_array($conn->query("select friends from Users where id='".$id."'"))["friends"]);
$sql = "select username, id from Users where username like '%".$key."%' and id!='".$id."'";
$results = $conn->query($sql);
$ans = "";
while($result = mysqli_fetch_array($results)){
	$ans .= "&".$result["username"];
	if(in_array($result["id"], $requestedFriends)){
		$ans .= "+searchResult_Requested";
	} else if (in_array($result["id"], $friends)){
		$ans .= "+searchResult_Friend";
	} else {
		$ans .= "+searchResult_Normal";
	}
	$ans .= "+".$result["id"];
}
echo $ans;

?>