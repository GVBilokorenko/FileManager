<?php
include "./api.php";

$name = $_POST["name"];
$sql = "INSERT INTO root (name)
VALUES ('$name')";
$result = requset($sql);
echo $result;