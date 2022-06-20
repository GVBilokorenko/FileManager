<?php
include "./api.php";

$id = $_POST["id"];
$sql = "DELETE FROM root WHERE id=$id";
$result = requset($sql);
echo $result;