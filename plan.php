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
$importance = $_POST["importance"];
$planName = $_POST["name"];
$planDesc = $_POST["desc"];
$due = $_POST["due"];
$repeat = $_POST["repeat"];
$phoneAlarm = $_POST["phoneAlarm"];
$phonePush = $_POST["phonePush"];
$desktopPush = $_POST["desktopPush"];
$url = $_POST["url"];
$location = $_POST["locationText"];


?>