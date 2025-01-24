<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>
<div class="container-sm">
    <br />
    <div class="alert-container" name="alertContainer" id="alertContainer"></div>

    <form method="post">
        <div class="row">
            <!-- Nombre -->
            <div class="col-md-12 mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" value="" name="nombre" class="form-control" id="nombre" placeholder="Nombre">
                <span class="text-danger"></span>
            </div>

            <!-- Dirección -->
            <div class="col-md-12 mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input type="text" value="" name="direccion" class="form-control" id="direccion" placeholder="Dirección">
                <span class="text-danger"></span>
            </div>
            
            <!-- Teléfono -->
            <div class="col-md-12 mb-3">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input type="number" value="" name="telefono" class="form-control" id="telefono" placeholder="Telefono">
                <span class="text-danger"></span>
            </div>

            
        </div>

        <!-- Botones de añadir y volver atrás en la misma línea -->
        <div class="row justify-content-center">
            <div class="col-md-6 mb-3 d-flex justify-content-center align-items-center">
                <label for="btnemp" class="form-label"></label>
                <button type="button" class="btn btn-success" id="btnemp" onclick="addProveedorForm()">Añadir Proveedor</button>

                <a href="../views/proveedores.php" class="btn btn-secondary ms-2">Volver Atrás</a>
            </div>
        </div>
    </form>
</div>

<script src="../js/proveedores.js"></script>
<?php include("../includes/footer.php"); ?>
