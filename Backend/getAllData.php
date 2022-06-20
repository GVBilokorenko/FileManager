<?php
include "./api.php";

$sql = "SELECT id, name, type, parent, date FROM root";
$result = requset($sql);

if (mysqli_num_rows($result) > 0) {
    $resArr = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resArr[] = ["id" => $row["id"], "name" => $row["name"], "type" => $row["type"], "parent" => $row["parent"], "date" => $row["date"]];
    }
    echo json_encode($resArr);
} else {
    echo "0 results";
}
