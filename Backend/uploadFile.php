<?php
// Include the database configuration file
include "./api.php";

$targetDir = "./uploads/";
$fileName = basename($_FILES["file"]["name"]);
$targetFilePath = $targetDir . $fileName;
$fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);


if(empty($_FILES["file"]["name"])){
  die("Please select a file to upload!");
}

if(!in_array($fileType, ['jpg','png','jpeg','gif','pdf', 'txt'])){
  die("Only JPG, JPEG, PNG, GIF, TXT, & PDF files are allowed to upload!");
}

if(!move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
  die("There was an error while uploading your file!");
}

$sql = "INSERT INTO root (name, type, parent)
VALUES ('$fileName', 'File', -1)";

$result = requset($sql);

if (!$result) {
  die("File upload failed, please try again!");
}

echo "The file ".$fileName. " has been successfully uploaded!";