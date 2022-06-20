<?php
// Include the database configuration file
$servername = "localhost";
$username = "FileManager";
$password = "QwertY54321";
$dbname = "filemanager";

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

echo "Successfully uploaded file!";
// $insert = $db->query("INSERT into images (file_name, uploaded_on) VALUES ('".$fileName."', NOW())");
// if($insert){
//   $echo = "The file ".$fileName. " has been uploaded successfully.";
// }else{
//   $echo = "File upload failed, please try again.";
// } 