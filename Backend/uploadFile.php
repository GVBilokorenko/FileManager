<?php
$path = $_POST["path"];
$fileName = basename($_FILES["file"]["name"]);


$loc = $path . "/" . $fileName;


if(!move_uploaded_file($_FILES["file"]["tmp_name"], $loc)){
  die("There was an error while uploading your file!");
}

echo "The file ".$fileName. " has been successfully uploaded!";