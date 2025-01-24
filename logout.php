<?php
// Eliminar las cookies 'id_empleado' y 'nombre_apellido'
setcookie('id_empleado', '', time() - 3600, "/");
setcookie('nombre_apellido', '', time() - 3600, "/");
setcookie('jwt','', time() - 3600,"/");

// Redirigir al usuario a la página de inicio de sesión
$base_url = 'http://' . $_SERVER['HTTP_HOST'] . '/metreciclafront/';
header("Location: " . $base_url . "login.php");
exit();