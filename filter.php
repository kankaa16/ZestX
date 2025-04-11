<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "zestx";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$tag = isset($_GET['tag']) ? $conn->real_escape_string($_GET['tag']) : '';
$sql = "SELECT * FROM menu WHERE tag = '$tag'";
$result = $conn->query($sql);
$items = [];

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $items[] = $row;
  }
}

echo json_encode($items);
$conn->close();
?>
