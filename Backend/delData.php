<?php
include "./api.php";

$ids = $_POST["ids"];

foreach($ids as $id) {
  $sql = "DELETE FROM root WHERE id = $id" ;
  $result = requset($sql);
}

echo $result;