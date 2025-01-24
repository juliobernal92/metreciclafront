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
                <label for="nombre" class="form-label">Nombre y Apellido:</label>
                <input type="text" value="" name="nombre" class="form-control" id="nombre" placeholder="Nombre y Apellido">
                <span class="text-danger"></span>
            </div>

            <!-- Teléfono -->
            <div class="col-md-12 mb-3">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input type="text" value="" name="telefono" class="form-control" id="telefono" placeholder="Teléfono">
                <span class="text-danger"></span>
            </div>

            <!-- Dirección -->
            <div class="col-md-12 mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input type="text" value="" name="direccion" class="form-control" id="direccion" placeholder="Dirección">
                <span class="text-danger"></span>
            </div>

            <!-- Cedula -->
            <div class="col-md-12 mb-3">
                <label for="cedula" class="form-label">Cédula:</label>
                <input type="text" value="" name="cedula" class="form-control" id="cedula" placeholder="Cédula">
                <span class="text-danger"></span>
            </div>

            <!-- Fecha -->
            <div class="col-md mb-3 position-relative" id="fecha-container">
                <label asp-for="Fecha" for="fecha" class="form-label">Fecha de Contratacion:</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="fecha" placeholder="Fecha">
                    <span class="input-group-text" id="datepicker-icon"><i class="fas fa-calendar-alt"></i></span>
                </div>
                <span class="text-danger"></span>
            </div>
            <!-- Sucursal (combobox) -->
            <div class="col-md-12 mb-3">
                <label for="idChatarra" class="form-label">Sucursal:</label>
                <select class="form-select" id="idSucursalSelect">
                    <!-- Opciones cargadas dinámicamente -->
                </select>
                <!-- Campos ocultos para almacenar ID  -->
                <input type="hidden" id="idsucursal" name="idsucursal">
            </div>


            <!-- Contraseña -->
            <div class="col-md-12 mb-3">
                <label for="contraseña" class="form-label">Contraseña:</label>
                <div class="input-group">
                    <input type="password" value="" name="contraseña" class="form-control" id="contraseña" placeholder="Contraseña">
                    <button type="button" class="btn btn-outline-secondary" id="togglePassword">
                        <i class="fa fa-eye"></i>
                    </button>
                </div>
                <span class="text-danger"></span>
            </div>

            <!-- Confirmar Contraseña -->
            <div class="col-md-12 mb-3">
                <label for="confirmarContraseña" class="form-label">Confirmar Contraseña:</label>
                <div class="input-group">
                    <input type="password" value="" name="confirmarContraseña" class="form-control" id="confirmarContraseña" placeholder="Confirmar Contraseña">
                    <button type="button" class="btn btn-outline-secondary" id="toggleConfirmPassword">
                        <i class="fa fa-eye"></i>
                    </button>
                </div>
                <span class="text-danger"></span>
            </div>
        </div>

        <!-- Botones de añadir y volver atrás en la misma línea -->
        <div class="row justify-content-center">
            <div class="col-md-12 d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-success" id="btnemp" onclick="addEmpleado()">Crear Empleado</button>
                <a href="../views/empleados.php" class="btn btn-secondary ms-2">Volver Atrás</a>
            </div>
        </div>
    </form>
</div>

<script src="../js/empleados.js"></script>
<script src="https://kit.fontawesome.com/a076d05399.js"></script> <!-- Incluye Font Awesome -->
<script>
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordField = document.getElementById('contraseña');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.querySelector('i').classList.remove('fa-eye');
            this.querySelector('i').classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            this.querySelector('i').classList.remove('fa-eye-slash');
            this.querySelector('i').classList.add('fa-eye');
        }
    });

    document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
        const confirmPasswordField = document.getElementById('confirmarContraseña');
        if (confirmPasswordField.type === 'password') {
            confirmPasswordField.type = 'text';
            this.querySelector('i').classList.remove('fa-eye');
            this.querySelector('i').classList.add('fa-eye-slash');
        } else {
            confirmPasswordField.type = 'password';
            this.querySelector('i').classList.remove('fa-eye-slash');
            this.querySelector('i').classList.add('fa-eye');
        }
    });
</script>
<script src="<?php echo BASE_URL; ?>/js/fecha.js"></script>
<script src="<?php echo BASE_URL; ?>/js/empleados.js"></script>
<?php include("../includes/footer.php"); ?>