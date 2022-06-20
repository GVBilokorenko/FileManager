<?php
$servername = "localhost";
$username = "FileManager";
$password = "QwertY54321";
$dbname = "filemanager";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verify connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// $sql = "CREATE TABLE root(
//   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(30) NOT NULL,
//   type VARCHAR(30) NOT NULL,
//   parent INT DEFAULT -1,
//   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// )";
// $sql = "INSERT INTO test (name, type)
// VALUES ('Project', 'Folder')";
// $sql = "SELECT id, name, type, parent, date 
// from root 
// where parent in ('null');";
// $sql = "DROP TABLE root";

$result = mysqli_query($conn, $sql);

// if (mysqli_num_rows($result) > 0) {
//   $resArr = [];
//   while ($row = mysqli_fetch_assoc($result)) {
//     echo json_encode($row);
//       $resArr[] = ["id" => $row["id"], "name" => $row["name"], "parent" => $row["parent"]];
//   }
//   // echo json_encode($resArr);
// } else {
//   echo "0 results";
// }

// Close connection
mysqli_close($conn);