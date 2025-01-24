<?php
require_once("config/sessioncheck.php");
include_once("includes/header.php");
require_once("config/auth.php");



?>

<!-- ID sucursal -->
<div>
    <input type="hidden" id="idSucursal" value="<?= htmlspecialchars($_COOKIE['id_sucursal'] ?? '') ?>">
</div>

<div class="container">
    <div class="row">
        <!-- Tabla Diaria -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Compras Diarias</h5>
                    <table class="table table-bordered" id="dailyTable">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <p id="totaldiario" class="text-end fw-bold"></p>
                </div>
            </div>
        </div>
        <!-- Tabla Semanal -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Compras Semanales</h5>
                    <table class="table table-bordered" id="weeklyTable">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <p id="totalsemana" class="text-end fw-bold"></p>
                </div>
            </div>
        </div>
        <!-- Tabla Mensual -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Compras Mensuales</h5>
                    <table class="table table-bordered" id="monthlyTable">
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <p id="totalmes" class="text-end fw-bold"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include("includes/footer.php") ?>
<script>
    $(document).ready(function() {
        const idSucursal = document.getElementById('idSucursal').value;
        
        // Cargar datos de compras diarias
        cargarTablaCompras('diarias', '#dailyTable tbody', '#totaldiario', idSucursal);

        // Cargar datos de compras semanales
        cargarTablaCompras('semanales', '#weeklyTable tbody', '#totalsemana', idSucursal);

        // Cargar datos de compras mensuales
        cargarTablaCompras('mensuales', '#monthlyTable tbody', '#totalmes', idSucursal);
    });


    function cargarTablaCompras(tipo, tablaSelector, totalSelector, idSucursal) {
        $.ajax({
            type: "GET",
            url: `http://localhost/api_metrecicla/controllers/obtenercompras.php?action=${tipo}&id_sucursal=${idSucursal}`,
            dataType: "json",
            success: function(response) {
                if (response.codigo === 200) {
                    const datos = response.data.resultado;
                    let total = 0;
                    let filas = '';

                    datos.forEach(compra => {
                        const material = compra.Material || "N/A";
                        const cantidad = parseFloat(compra.Cantidad).toFixed(2);
                        const monto = parseFloat(compra.Monto).toLocaleString();

                        filas += `
                        <tr>
                            <td>${material}</td>
                            <td>${cantidad}</td>
                            <td>${monto}</td>
                        </tr>`;
                        total += parseFloat(compra.Monto);
                    });

                    $(tablaSelector).html(filas);
                    $(totalSelector).text(`Total: ${total.toLocaleString()}`);
                } else {
                    console.error("Error al cargar los datos: ", response.descripcion);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
            }
        });
    }


</script>