<?php
include "./api.php";

$path = $_POST["path"];
if ($path === "root"){
    $path = -1;
}

// echo $path;

$sql = "SELECT id, name, type, parent, date 
from root 
where parent in ($path) 
ORDER BY type DESC;";
$result = requset($sql);


if (mysqli_num_rows($result) > 0) {
    $resArr = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resArr[] = ["id" => $row["id"], "name" => $row["name"], "type" => $row["type"], "parent" => $row["parent"], "date" => $row["date"]];
    }
    echo json_encode($resArr);
} else {
    echo null;
}
