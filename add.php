<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "zestx";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = trim($_POST['name']);
$description = trim($_POST['description']);
$image = trim($_POST['image']);
$price = floatval($_POST['price']);
$tag = trim($_POST['tag']);

if (empty($name) || empty($description) || empty($image) || $price <= 0 || empty($tag)) {
  echo "Please fill out all fields correctly.";
  exit;
}

$stmt = $conn->prepare("INSERT INTO menu (name, description, image, price, tag) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssds", $name, $description, $image, $price, $tag);

if ($stmt->execute()) {
  echo '<script>
  alert("Item added successfully!");
  setTimeout(function() {
    window.location.href = "zomato.html";
   }, 3000);
  </script>';
} else {
  echo "Error adding item: " . $conn->error;
}

$stmt->close();
$conn->close();
?>