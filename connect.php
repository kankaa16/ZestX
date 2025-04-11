<?php
$server = "localhost";
$username = "root";
$password = "";
$dbname = "zestx";

$con = mysqli_connect($server, $username, $password, $dbname);
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['firstname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "INSERT INTO customers (firstname, email, password) VALUES ('$name', '$email', '$password')";
    $result = mysqli_query($con, $sql);

    if ($result) {
        echo '<script>
  alert("Signup successful!");
  setTimeout(function() {
    window.location.href = "login.html";
   }, 3000);
  </script>';
    } else {
        echo " Query failed: " . mysqli_error($con);
    }
}

mysqli_close($con);
?>
