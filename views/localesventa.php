<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>
<div class="container-sm">
    <h4>Lista de Locales - Venta</h4>
    <br>
    <div id="alertContainer"><br/></div>
    <a href="../views/crearlocal.php" class="btn btn-secondary">Añadir Local</a>
    <br><br>
    <a href="../views/preciolocal.php" class="btn btn-secondary">Añadir Precios</a>
    <br><br>

    <table class="table dataTable" id="tablaLocales">
        <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>



<!--MODALES-->

<!-- Modal para la Edición -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Local</h5>
                <button type="button" class="close" data-dismiss="modal" onclick="cerrarModalEdit()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario para editar local -->
                <form id="editForm">
                    <input type="hidden" id="modalLocalId" name="modalLocalId" value="">
                    <div class="mb-3">
                        <label for="modalNombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="modalNombre" name="modalNombre" placeholder="Nombre">
                    </div>

                    <div class="mb-3">
                        <label for="modalDireccion" class="form-label">Direccion:</label>
                        <input type="text" class="form-control" id="modalDireccion" name="modalDireccion" placeholder="Direccion">
                    </div>

                    <div class="mb-3">
                        <label for="modalTelefono" class="form-label">Telefono:</label>
                        <input type="text" class="form-control" id="modalTelefono" name="modalTelefono" placeholder="Telefono">
                    </div>

                    
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="saveEditLocal()">Guardar Cambios</button>
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
                    ¿Estás seguro de que deseas eliminar el local?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="cerrarDelete()" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

<script src="../js/locales.js"></script>
<?php include("../includes/footer.php"); ?>