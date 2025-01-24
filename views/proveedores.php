<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>
<div class="container-sm">
    <h4>Lista de Proveedores</h4>
    <Br />
    <div id="alertContainer"></div>
    <a href="../views/crearproveedor.php" class="btn btn-secondary">Crear Proveedor</a>
    <br>
    <br />
    <table class="table" id="tablaProveedores">
        <!-- ... Cabecera de la tabla ... -->
        <thead class="table table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <!-- Aquí se insertarán las filas de empleados usando JavaScript -->
        </tbody>
    </table>
</div>

<!--MODALES-->
<!-- Modal para la Edición -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Información del Proveedor</h5>
                <button type="button" class="close" data-dismiss="modal" onclick="cerrarModalEdit()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario para editar Proveedor -->
                <form id="editForm">
                    <input type="hidden" id="modalProveedorId" name="modalProveedorId" value="">
                    <div class="mb-3">
                        <label for="modalNombre" class="form-label">Nuevo Nombre:</label>
                        <input type="text" class="form-control" id="modalNombre" name="modalNombre" placeholder="Nuevo Nombre">
                    </div>

                    <div class="mb-3">
                        <label for="modalDireccion" class="form-label">Nueva Direccion:</label>
                        <input type="text" class="form-control" id="modalDireccion" name="modalDireccion" placeholder="Nueva Direccion">
                    </div>

                    <div class="mb-3">
                        <label for="modalTelefono" class="form-label">Nuevo Telefono:</label>
                        <input type="text" class="form-control" id="modalTelefono" name="modalTelefono" placeholder="Nuevo Telefono">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="saveEditProveedor()">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal de Confirmación de Eliminación -->
<div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Eliminación</h5>
                <button type="button" class="close" onclick="cerrarDelete()" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ¿Estás seguro de que deseas eliminar el Proveedor?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="cerrarDelete()" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
            </div>
        </div>
    </div>
</div>

<script src="../js/proveedores.js"></script>
<?php include("../includes/footer.php"); ?>