<?php 
include_once('base.php');
require_once(__DIR__ . '/auth.php');

$nombre_sucursal = $_COOKIE['nombre_sucursal'] ?? 'N/A';
$direccion_sucursal = $_COOKIE['direccion_sucursal'] ?? 'N/A';
$telefono_sucursal = $_COOKIE['telefono_sucursal'] ?? 'N/A';

if (isset($_COOKIE['id_empleado'])) {
    $id_empleado_encrypted = $_COOKIE['id_empleado'];
    $id_empleado = decryptCookie($id_empleado_encrypted);
} else {
    echo "Cookie 'id_empleado' no está definida.<br>";
}

if (isset($_COOKIE['nombre_apellido'])) {
    $nombre_apellido_encrypted = $_COOKIE['nombre_apellido'];
    $nombre_apellido = decryptCookie($nombre_apellido_encrypted);
} else {
    echo "Cookie 'nombre_apellido' no está definida.<br>";
}


?>
<!doctype html>
<html lang="en">

<head>
    <title>Met Recicla</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.1/jspdf.plugin.autotable.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <style>
        body {
            padding-top: 56px;
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="<?php echo BASE_URL; ?>/index.php">Met Recicla</a>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="<?php echo BASE_URL; ?>/index.php" aria-current="page">Inicio <span class="visually-hidden">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo BASE_URL; ?>/views/compras.php">Compras</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo BASE_URL; ?>/views/ventas.php">Ventas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo BASE_URL; ?>/views/gastos.php">Gastos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Paginas</a>
                            <div class="dropdown-menu" aria-labelledby="dropdownId">
                                <a class="dropdown-item" href="<?php echo BASE_URL; ?>/views/chatarras.php">Chatarras</a>
                                <a class="dropdown-item" href="<?php echo BASE_URL; ?>/views/proveedores.php">Proveedores</a>
                                <a class="dropdown-item" href="<?php echo BASE_URL; ?>/views/empleados.php">Empleados</a>
                                <a class="dropdown-item" href="<?php echo BASE_URL; ?>/views/localesventa.php">Locales Venta</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item" id="bienvenidaContainer"><?php
                                                                        if (isset($nombre_apellido)) {
                                                                            echo 'Bienvenido ' . $nombre_apellido;
                                                                        } else {
                                                                            echo 'Bienvenido';
                                                                        }
                                                                        ?></li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo BASE_URL; ?>/logout.php"> | Cerrar Sesion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        
        <style>
            .navbar-nav {
                display: flex;
                align-items: center;
            }

            #bienvenidaContainer {
                margin-left: auto;
                color: white;
            }
        </style>
    </header>
    <!-- Variables ocultas para datos de la sucursal -->
<input type="hidden" id="idSucursal" value="<?php echo htmlspecialchars($id_sucursal); ?>">
<input type="hidden" id="nombreSucursal" value="<?php echo htmlspecialchars($nombre_sucursal); ?>">
<input type="hidden" id="direccionSucursal" value="<?php echo htmlspecialchars($direccion_sucursal); ?>">
<input type="hidden" id="telefonoSucursal" value="<?php echo htmlspecialchars($telefono_sucursal); ?>">
    <main>
        <br />