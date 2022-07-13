<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/select2.css">  
    <link rel="stylesheet" href="css/sweetalert2.css"> 
   <link rel="stylesheet" href="css/css/all.min.css">
    <link rel="stylesheet" href="css/adminlte.css">
    <title>Login</title>
</head>
<?php
session_start();
if(!empty($_SESSION['us_tipo'])){
    header('Location: controlador/LoginController.php');
} else{
    session_destroy();
?>
<body class="hold-transition login-page">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="#" class="h1"><b>Farmacia</b>JOE</a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Inicio de sesión</p>
      <form action="controlador/LoginController.php" method="POST">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="DNI" name="user">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-id-card"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" name="pass">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-primary btn-block" value="iniciar sesion">
             <i class="fas fa-arrow-right mr-2"></i>Sign In
          </button>
          </div>
      </form>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>

</body>
<script src="js/login.js"></script>
</html>
<?php 
}
?>