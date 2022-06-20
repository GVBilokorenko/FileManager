<?php
// MySQL Database configuration
include "./config.php";

function requset($sql){
  // Create connection
  $conn = mysqli_connect($GLOBALS["servername"], $GLOBALS["username"], $GLOBALS["password"], $GLOBALS["dbname"]);

  // Verify connection
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  // Try to make request
  try {
    $result = mysqli_query($conn, $sql);
  }
  catch(Exception $e) {
    $result = "Operation finished with error: " . mysqli_error($conn);
  }

  // Close connection
  mysqli_close($conn);

  return $result;
}