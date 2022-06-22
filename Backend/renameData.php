<?php
$fileName = $_POST["name"];
$path = $_POST["path"];
$newName = $_POST["newName"];

$loc = $path . "/" . $fileName;
$newLoc = $path . "/" . $newName;

rename($loc, $newLoc);
echo "The file ".$fileName. " has been successfully renamed!";