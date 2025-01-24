<?php
require_once("../config/sessioncheck.php");
include("../includes/header.php");
?>
<div class="container-sm">


    <!--AÑADIR PROVEEDOR-->
    <div class="row align-items-center">
        <form action="" method="post">
            <div class="text-danger"></div>
            <div class="row align-items-center">
                <!-- ID Vendedor -->
                <div class="col-md-auto mb-3">
                    <label class="form-label">ID Vendedor:</label>
                    <input value="" type="number" name="idvendedor" class="form-control" id="idvendedor" style="width: 100px;" placeholder="Id">
                </div>

                <!-- Nombre -->
                <div class="col-md-2 mb-3">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input type="text" value="" name="nombre" class="form-control" id="nombre" placeholder="Nombre">
                    <span class="text-danger"></span>
                </div>

                <!-- Teléfono -->
                <div class="col-md-2 mb-3">
                    <label for="telefono" class="form-label">Teléfono:</label>
                    <input type="text" value="" name="telefono" class="form-control" id="telefono" placeholder="Telefono">
                    <span class="text-danger"></span>
                </div>

                <!-- Dirección -->
                <div class="col-md-2 mb-3">
                    <label for="direccion" class="form-label">Dirección:</label>
                    <input type="text" value="" name="direccion" class="form-control" id="direccion" placeholder="Dirección">
                    <span class="text-danger"></span>
                </div>

                <!-- Fecha -->
                <div class="col-md mb-3 position-relative" id="fecha-container">
                    <label asp-for="Fecha" for="fecha" class="form-label">Fecha:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="fecha" placeholder="Fecha">
                        <span class="input-group-text" id="datepicker-icon"><i class="fas fa-calendar-alt"></i></span>
                    </div>
                    <span class="text-danger"></span>
                </div>

                <!-- Botón de añadir -->
                <div class="col-md-2 mb-3 d-grid">
                    <label for="btnadd" class="form-label"><br /></label>
                    <button type="button" class="btn btn-success" id="btnadd" onclick="addProveedor()">Añadir</button>
                </div>
            </div>
        </form>
    </div>


    <!-- NUEVA LINEA -->
    <!-- Nueva fila con idticket, idchatarra, chatarra, precio, cantidad y botones -->
    <div class="row align-items-center">
        <!-- ID Ticket -->
        <div>
            <!--<label for="idTicket" class="form-label">ID Ticket:</label>-->
            <input type="hidden" class="form-control" name="idticket" value="" id="idticket" style="width: 70px;" placeholder="Id" readonly>
        </div>

        <!-- ID Chatarra -->
        <div>
            <!--<label for="idChatarra" class="form-label">ID Chatarra:</label>-->
            <input type="hidden" class="form-control" id="idChatarra" style="width: 80px;" placeholder="Id" readonly>
        </div>


        <!-- Chatarra (combobox) -->
        <div class="col-md mb-3">
            <label for="idChatarra" class="form-label">Chatarra:</label>
            <select class="form-select" id="idChatarraSelect">
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


        <!-- Cantidad -->
        <div class="col-md mb-3">
            <label for="cantidad" class="form-label">Cantidad:</label>
            <input type="text" class="form-control" name="cantidad" id="cantidad" placeholder="Cantidad">
        </div>

        <!-- Botones de acción -->
        <div class="col-auto">
            <p></p>
            <label for="btnaddch" class="form-label"><br /></label>
            <button type="button" class="btn btn-success" id="btnaddch" onclick="addDetalleCompra()">Añadir</button>

            <label for="btncleanch" class="form-label"></label>
            <button type="button" class="btn btn-secondary" id="btnclearch">Limpiar</button>
        </div>
    </div>


    <br />
    <div id="alertContainer"></div>
    <!-- TABLA -->

    <div id="tablaDetallesCompraContainer">
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr class="detalleCompraRow">
                    <th>ID</th>
                    <th>Detalles</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="detallesCompraBody">

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
            <button type="button" class="btn btn-success " id="btnimprimir" onclick="addTotal()">Imprimir</button>
        </div>
    </div>
    <div class="col-md-auto mb-3">
        <input type="hidden" class="form-control" name="idempleado" id="idempleado" style="width: 80px;" placeholder="Id" value="<?php echo $id_empleado; ?>" readonly>
    </div>

    <br />



    <!-- Modal para la Edición -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Editar Cantidad</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="modalDetalleId">
                    <div class="mb-3">
                        <label for="modalCantidad" class="form-label">Nueva Cantidad</label>
                        <input type="number" class="form-control" id="modalCantidad" placeholder="Ingrese la nueva cantidad">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="saveEditBtn">Guardar Cambios</button>
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
    <script src="../js/addtotal.js"> </script>
    <script src="../js/validacion.js"></script>
    <script src="<?php echo BASE_URL; ?>/js/fecha.js"></script>
    <script src="<?php echo BASE_URL; ?>/js/compras.js"></script>
    <script src="../js/chatarracb.js"></script>
    <script src="../js/detallecompra.js"></script>

    <?php include("../includes/footer.php"); ?>