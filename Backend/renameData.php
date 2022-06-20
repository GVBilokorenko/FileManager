<?php
include "./api.php";

$id = $_POST["id"];
$name = $_POST["name"];

$sql = "UPDATE root
SET name = '$name' 
WHERE id = $id;";

$result = requset($sql);

echo $result;
