<?php
require_once(__DIR__ . '/auth.php');

if (!isAuthenticated()) {
    $base_url = 'http://' . $_SERVER['HTTP_HOST'] . '/metreciclafront/';
    header("Location: " . $base_url . "login.php");
    exit();
}

// Verificar y establecer la cookie 'id_empleado'
if (isset($_COOKIE['id_empleado'])) {
    $id_empleado = decryptCookie($_COOKIE['id_empleado']);
} else {
    echo "Cookie 'id_empleado' no está definida.<br>";
}

// Verificar y establecer la cookie 'nombre_apellido'
if (isset($_COOKIE['nombre_apellido'])) {
    $nombre_apellido = decryptCookie($_COOKIE['nombre_apellido']);
} else {
    echo "Cookie 'nombre_apellido' no está definida.<br>";
}


//verificar id sucursal
if(isset($_COOKIE['id_sucursal'])){
    $id_sucursal=$_COOKIE['id_sucursal'];
}else{
    echo "Cookie 'nombre_apellido' no está definida.<br>";
}

//verificar nombre sucursal
if(isset($_COOKIE['nombre_sucursal'])){
    $nombre_sucursal=$_COOKIE['nombre_sucursal'];
}else{
    echo "Cookie 'nombre_sucursal' no está definida.<br>";
}

//verificar direccion sucursal
if(isset($_COOKIE['direccion_sucursal'])){
    $direccion_sucursal=$_COOKIE['direccion_sucursal'];
}else{
    echo "Cookie 'direccion_sucursal' no está definida.<br>";
}

//verificar telefono sucursal
if(isset($_COOKIE['telefono_sucursal'])){
    $telefono_sucursal=$_COOKIE['telefono_sucursal'];
}else{
    echo "Cookie 'telefono_sucursal' no está definida.<br>";
}

