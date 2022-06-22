<?php
$fileName = $_POST["name"];
$path = $_POST["path"];
$type = $_POST["type"];

$loc = $path . "/" . $fileName;

if ($type == "Folder"){
  array_map('unlink', glob("$loc/*"));
  rmdir($loc);
  echo "The folder ".$fileName. " has been successfully deleted!";
} else {
  unlink($loc);
  echo "The file ".$fileName. " has been successfully deleted!";
}