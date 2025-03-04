<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>

<div class="container-sm">
    <h4>Lista de Precios - Locales</h4>
    <div id="alertContainer"></div>
    <div class="row align-items-center">
        <p>
        <h5>Seleccione un Local:</h5>
        </p>

        <!-- SELECT LOCAL -->
        <div class="col-md-8 mb-3">
            <select class="form-select" id="idlocalSelect">
                <!-- Opciones cargadas dinámicamente -->
            </select>
            <!-- Campo oculto para almacenar el ID seleccionado -->
            <input type="hidden" id="idlocal" name="idlocal">
            <input type="hidden" id="nombrelocal" name="nombrelocal">
        </div>

    </div>


    <div class="row align-items-center">
        <p>
        <h5>Seleccione una chatarra:</h5>
        </p>
        <!-- Chatarra (select) -->
        <div class="col-md mb-3">
            <label for="idChatarra" class="form-label">Chatarra:</label>
            <select class="form-select" id="idChatarraSelect" >
                <!-- Opciones cargadas dinámicamente -->
            </select>
            <!-- Campos ocultos para almacenar ID y precio seleccionados -->
            <input type="hidden" id="idChatarra" name="idChatarra">
            <input type="hidden" id="precioChatarra" name="precioChatarra">
        </div>

        <!-- Precio -->
        <div class="col-md mb-3">
            <label for="precio" class="form-label">Precio:</label>
            <input type="numeric" class="form-control" name="precio" id="precio" placeholder="Precio">
        </div>

        <!-- Botones de acción -->
        <div class="col-auto">
            <p></p>
            <label for="btnaddch" class="form-label"><br /></label>
            <button type="button" class="btn btn-success" id="btnaddch" onclick="addPrecioLocal()">Añadir</button>

        </div>


    </div>
    <table class="table dataTable" id="tablaPreciolocal">
        <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
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
                <h5 class="modal-title" id="editModalLabel">Editar Chatarra</h5>
                <button type="button" class="close" data-dismiss="modal" onclick="cerrarModalEdit()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulario para editar la CHATARRA -->
                <p>Solo puedes editar el precio en esta sección</p>
                <form id="editForm">
                    <input type="hidden" id="modalPrecioId" name="modalPrecioId" value="">
                    <input type="hidden" id="idprecio" name="idprecio">
                    <div class="mb-3">
                        <label for="modalNombre" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="modalNombre" name="modalNombre" placeholder="Nombre" readonly>
                    </div>

                    <div class="mb-3">
                        <label for="modalPrecio" class="form-label">Nuevo Precio:</label>
                        <input type="number" class="form-control" id="modalPrecio" name="modalPrecio" placeholder="Nuevo Precio">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="saveEditChatarra()">Guardar Cambios</button>
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
                    ¿Estás seguro de que deseas eliminar la chatarra?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="cerrarDelete()" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
                </div>
            </div>
        </div>
    </div>




<script src="../js/preciolocal.js"></script>
<script src="../js/config.js"></script>
<?php include("../includes/footer.php"); ?>