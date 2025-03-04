<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>
<div class="container-sm">
    <br />
    <div class="alert-container" name="alertContainer" id="alertContainer"></div>

    <form method="post">
        <!-- Nombre -->
        <div class="col-md-6 mb-3">
            <label for="nombre" class="form-label">Nombre:</label>
            <input type="text" value="" name="nombre" class="form-control" id="nombre" placeholder="Nombre">
            <span class="text-danger"></span>
        </div>
        <!-- Direccion -->
        <div class="col-md-6 mb-3">
            <label for="direccion" class="form-label">Dirección:</label>
            <input type="text" value="" name="direccion" class="form-control" id="direccion" placeholder="Dirección">
            <span class="text-danger"></span>
        </div>

        <!-- Telefono -->
        <div class="col-md-6 mb-3">
            <label for="telefono" class="form-label">Telefono:</label>
            <input type="number" value="" name="telefono" class="form-control" id="telefono" placeholder="Telefono">
            <span class="text-danger"></span>
        </div>

        <div class="col-md-6 mb-3">
            <label for="btnemp" class="form-label"></label>
            <input type="hidden" name="token_csrf" value="<?php echo $token; ?>">
            <button type="button" class="btn btn-success" id="btnemp" onclick="addLocalVentaForm()">Añadir Local</button>
        </div>

        <div class="col-md-6 mb-3">
            <a href="../views/localesventa.php" class="btn btn-secondary">Volver Atrás</a>

        </div>

    </form>
</div>

<script src="../js/alv.js"></script>
<script src="../js/config.js"></script>
<?php include("../includes/footer.php"); ?>