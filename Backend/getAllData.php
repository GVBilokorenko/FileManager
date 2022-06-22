<?php
$postPath = $_POST["path"];


$path    = __DIR__ . "/" . $postPath;
$files = scandir($path);


$resArr = [];
$id = 0;
$type = NULL;
$date = NULL;
foreach ($files as $file) {
    if ($file != "." && $file != ".."){
        if (is_file($path."/".$file)) {
            $type = "File";
        } else {
            $type = "Folder";
        }

        if (file_exists($path."/".$file)) {
            $date = date("d.m.y H:i:s", filemtime($path."/".$file));
        }

        $resArr[] = ["id" => $id, "name" => $file, "type" => $type, "parent" => $postPath, "date" => $date];
        $id+=1;
    }
}

echo json_encode($resArr);
