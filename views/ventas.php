<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>


<div class="container-sm">
    <h4>Ventas</h4>
    <br>
    <div id="alertContainer"></div>


    <div class="row align-items-center">
        <!-- SELECT LOCAL -->
        <div class="col-md-8 mb-3">
            <label for="idlocal" class="form-label">Seleccione un local:</label>
            <select class="form-select" id="idlocalSelect">
                <!-- Opciones cargadas dinámicamente -->
            </select>
            <!-- Campo oculto para almacenar el ID seleccionado -->
            <input type="hidden" id="idlocal" name="idlocal">
            <input type="hidden" id="nombrelocal" name="nombrelocal">
        </div>
        <!-- Fecha -->
        <div class="col-md-4 mb-3 position-relative" id="fecha-container">
            <label for="fecha" class="form-label">Fecha:</label>
            <div class="input-group">
                <input type="text" class="form-control" id="fecha" placeholder="Fecha">
                <span class="input-group-text" id="datepicker-icon"><i class="fas fa-calendar-alt"></i></span>
            </div>
            <span class="text-danger"></span>
        </div>

    </div>
    <div class="row align-items-center">
        <p>Ingrese la chatarra</p>
        <!-- Chatarra (combobox) -->
        <div class="col-md mb-3">
            <label for="idChatarra" class="form-label">Chatarra:</label>
            <select class="form-select" id="idChatarraSelect">
                <!-- Opciones cargadas dinámicamente -->
            </select>
            <!-- Campos ocultos para almacenar ID y precio seleccionados -->
            <input type="hidden" id="idChatarra" name="idChatarra">
        </div>
        <!-- Cantidad -->
        <div class="col-md mb-3">
            <label for="cantidad" class="form-label">Cantidad:</label>
            <input type="text" class="form-control" name="cantidad" id="cantidad" placeholder="Cantidad">
        </div>
        <!-- Precio Compra-->
        <div class="col-md mb-3">
            <label for="preciocompra" class="form-label">Precio Compra:</label>
            <input type="number" class="form-control" name="preciocompra" id="preciocompra" placeholder="Precio Compra">
        </div>
        <!-- Precio Venta-->
        <div class="col-md mb-3">
            <label for="precioventa" class="form-label">Precio Venta:</label>
            <input type="number" class="form-control" name="precioventa" id="precioventa" placeholder="Precio Venta" readonly>
        </div>
        <div>
            <input type="hidden" name="idticketventa" id="idticketventa">
            <input type="hidden" name="idpreciolocal" id="idpreciolocal">
        </div>
        <!-- Botones de acción -->
        <div class="col-md mb-3">
            <button type="button" class="btn btn-success" id="btnaddch" onclick="addDetalleVenta()">Añadir</button>
        </div>
        <div>
            <input type="hidden" name="idprecioventa" id="idprecioventa">
        </div>

    </div>


    <!--Tabla-->
    <div id="tablaDetallesVentaContainer">
        <table class="table" id="tablaChatarraVenta">
            <thead class="table-dark">
                <tr class="detalleVentaRow">
                    <th>ID</th>
                    <th>Material</th>
                    <th>Cantidad</th>
                    <th>Precio Venta</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="detallesVentaBody">
            </tbody>
        </table>
    </div>
    <div>
        <div class="col-md mb-3">
            <label for="total" class="form-label" style="display: none;">El Total es: </label>
            <input type="hidden" class="form-control" name="total" id="total" placeholder="Total" readonly style="display: none;">
        </div>


        <div id="totalContainer"></div>
        <br />

        <!--BOTON IMPRIMIR-->
        <div>
            <button type="button" class="btn btn-success " id="btnimprimir" onclick="addTotalVenta()">Imprimir</button>
        </div>
    </div>
    <div class="col-md-auto mb-3">
        <input type="hidden" class="form-control" name="idempleado" id="idempleado" style="width: 80px;" placeholder="Id" value="<?php echo $id_empleado; ?>" readonly>
    </div>




    <!-- Modal para la Edición -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Editar Detalle Venta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="cerrarModalEdit()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Formulario para editar la cantidad -->
                    <form id="editForm">
                        <input type="hidden" id="modalDetalleId" name="modalDetalleId" value="">
                        <div class="mb-3">
                            <label for="modalCantidad" class="form-label">Nueva Cantidad:</label>
                            <input type="number" class="form-control" id="modalCantidad" name="modalCantidad" placeholder="Nueva Cantidad">
                        </div>
                        <!-- Otros campos para editar si es necesario -->
                        <!-- ... -->
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Guardar</button>

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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="cerrarModalEdit()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas eliminar este detalle de compra?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalEdit()">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Eliminar</button>
                </div>
            </div>
        </div>
    </div>


</div>
<script src="../js/ventas.js"></script>
<script src="../js/fecha.js"></script>

<?php include("../includes/footer.php"); ?>