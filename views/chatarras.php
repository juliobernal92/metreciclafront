<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>

<div class="container-sm">
    <h4>Lista de Precios - Compra</h4>
    <br>
    <div id="alertContainer"></div>
    <a href="../views/crearchatarra.php" class="btn btn-secondary">Crear Chatarra</a>
    <br>
    <br>

    <table class="table dataTable" id="tablaChatarra">
        <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <!-- Filas de chatarras se insertarán aquí mediante JavaScript -->
        </tbody>
    </table>
</div>

<!-- MODALES -->

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
                <form id="editForm">
                    <input type="hidden" id="modalChatarraId" name="modalChatarraId" value="">
                    <div class="mb-3">
                        <label for="modalNombre" class="form-label">Nuevo Nombre:</label>
                        <input type="text" class="form-control" id="modalNombre" name="modalNombre" placeholder="Nuevo Nombre">
                    </div>
                    <div class="mb-3">
                        <label for="modalPrecio" class="form-label">Nuevo Precio:</label>
                        <input type="number" class="form-control" id="modalPrecio" name="modalPrecio" placeholder="Nuevo Precio">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cerrar</button>
                <button type="button" class="btn btn-primary" id="guardarCambiosBtn">Guardar Cambios</button>
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

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
<script src="../json/Spanish.json"></script>
<script src="../js/chatarras.js"></script>
<script src="../js/config.js"></script>
<script>
    $(document).ready(function() {
        // Inicializar DataTables con configuración de idioma
        $('#tablaChatarra').DataTable({
            language: {
                        url: '../json/Spanish.json'
            }
        });
    });
</script>

<?php include("../includes/footer.php"); ?>
