<?php
// Include the database configuration file
include "./api.php";

$folderName = $_POST["name"];
$path = $_POST["path"];
if ($path === "root"){
  $path = -1;
}

$sql = "INSERT INTO root (name, type, parent)
VALUES ('$folderName', 'Folder', $path)";

$result = requset($sql);

if (!$result) {
  die("Folder creation failed, please try again!");
}

echo "The file ".$folderName. " has been successfully uploaded!";