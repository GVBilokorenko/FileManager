<?php
$folderName = $_POST["name"];
$path = $_POST["path"];


mkdir($path . "/" . $folderName);


echo "The folder ".$folderName. " has been successfully created!";