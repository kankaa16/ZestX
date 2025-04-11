<?php
$server = "localhost";
$username = "root";
$password = "";
$dbname = "zestx";


$con = mysqli_connect($server, $username, $password, $dbname);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM customers WHERE email='$email' AND password='$password'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
  
    echo '<script>
  alert("Login successful!");
  setTimeout(function() {
    window.location.href = "zomato.html";
   }, 3000);
  </script>';
  
} else {

    header("Location: login.html?error=1");
    exit();
}
?>
