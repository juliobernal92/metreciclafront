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
        <!-- Precio -->
        <div class="col-md-6 mb-3">
            <label for="precio" class="form-label">Precio:</label>
            <input type="number" value="" name="precio" class="form-control" id="precio" placeholder="Precio">
            <span class="text-danger"></span>
        </div>

        <div class="col-md-6 mb-3">
            <label for="btnemp" class="form-label"></label>
            <button type="button" class="btn btn-success" id="btnemp" onclick="addChatarraForm()">Añadir Chatarra</button>
        </div>

        <div class="col-md-6 mb-3">
            <a href="../views/chatarras.php" class="btn btn-secondary">Volver Atrás</a>

        </div>

    </form>
</div>

<script src="../js/chatarras.js"></script>
<?php include("../includes/footer.php"); ?>