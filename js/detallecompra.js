function addDetalleCompra() {
    // Obtener los valores del formulario
    var idticket = $("#idticket").val();
    var idchatarra = $("#idChatarraSelect").val();
    var cantidad = parseFloat($("#cantidad").val());
    var precio = parseFloat($("#precio").val());
    var subtotal = cantidad * precio;
    var idproveedor = $("#idvendedor").val();

    // Validar que los campos necesarios estén completos
    if (!idchatarra || !cantidad || !precio) {
        showBootstrapAlert("Por favor, complete todos los campos.", "warning");
        return;
    }

    if(!idproveedor){
        const idnuevo=1;
        $("#idvendedor").val(idnuevo);
    }
    // Si el ID de la compra está vacío, crear una nueva compra
    if (!idticket) {
        addCompra(function (newIdCompra) {
            // Asignar el nuevo ID de compra al campo oculto
            $("#idticket").val(newIdCompra);

            // Volver a ejecutar addDetalleCompra para agregar el detalle
            addDetalleCompra();
        });
        return; // Salir para esperar que se cree la compra
    }

    // Enviar datos del detalle al servidor
    $.ajax({
        type: "POST",
        url: apiUrl + "/controllers/detallescompra.php",
        data: JSON.stringify({
            id_compra: idticket,
            id_chatarra: idchatarra,
            cantidad: cantidad,
            preciopagado: precio,
            subtotal: subtotal
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            if (response.codigo === 200) {
                // Actualizar la tabla de detalles
                loadDetallesCompra(idticket);

                // Limpiar los campos del formulario
                $("#cantidad").val("");
                $("#precio").val("");
                $("#idChatarraSelect").val("").trigger("change"); // Restablecer a la opciÃ³n por defecto
                $("#idChatarraSelect").focus();

                // Mostrar mensaje de éxito
                showBootstrapAlert("Detalle de compra añadido correctamente.", "success");
            } else {
                // Mostrar mensaje de error
                console.error("Error al añadir detalle de compra:", response);
                showBootstrapAlert("Error al añadir detalle de compra.", "danger");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            showBootstrapAlert("Error en la llamada AJAX.", "danger");
        }
    });
}


$(document).ready(function () {
    // Evento cuando se presiona una tecla en el campo cantidad
    $("#cantidad").keyup(function (e) {
        // Verificar si la tecla presionada es "Enter" (código 13)
        if (e.which === 13) {
            // Realizar la insercion en la base de datos
            addDetalleCompra();
        }
    });
});

let idticket = $("#idticket").val();
// Función para cargar detalles de compra por ID de ticket
function loadDetallesCompra(idticket) {

    $.ajax({
        type: "GET",
        url: `${apiUrl}/controllers/detallescompra.php?id=${idticket}`,
        dataType: "json",
        success: function (response) {

            // Acceder correctamente a los datos
            if (response.codigo === 200 && response.data.resultado.detalles.length > 0) {
                // Limpiar la tabla
                $("#detallesCompraBody").empty();

                // Construir las filas de la tabla
                response.data.resultado.detalles.forEach(detalle => {

                    var newRow = `
                        <tr>
                            <td>${detalle.id_detalle_compra}</td>
                            <td>${detalle.nombre_chatarra}</td>
                            <td>${detalle.cantidad}</td>
                            <td>${detalle.preciopagado}</td>
                            <td>${detalle.subtotal}</td>
                            <td>
                                <button class="btn btn-warning btn-edit" data-id="${detalle.id_detalle_compra}">Editar</button>
                                <button class="btn btn-danger btn-delete" data-id="${detalle.id_detalle_compra}">Eliminar</button>
                            </td>
                        </tr>`;
                    $("#detallesCompraBody").append(newRow);
                });

                // Actualizar el total
                var total = parseFloat(response.data.resultado.total) || 0; // Asegurarse de que sea numérico
                $("#total").val(total);
                $("#total").show();

                // Formatear y mostrar el total
                function formatearConSeparadores(numero) {
                    return numero.toLocaleString("es-ES");
                }

                $("#totalContainer").text(
                    "El total es: " + formatearConSeparadores(total)
                );
            } else {
                console.log("No se encontraron detalles para el ID:", idticket);
                $("#detallesCompraBody").html("<tr><td colspan='6'>No se encontraron detalles de compra.</td></tr>");
                $("#totalContainer").text("El total es: 0");
                $("#total").val(0).hide();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los detalles de compra:", status, error);
            showBootstrapAlert("Error al cargar los detalles de compra.", "danger");
        }
    });
}



$(document).on("click", ".btn-edit", function () {
    // Obtener los datos del detalle desde la fila
    var detalleId = $(this).data("id");
    var cantidadActual = $(this).closest("tr").find("td:nth-child(3)").text(); // Suponiendo que la cantidad está en la tercera columna

    // Asignar los valores al modal
    $("#modalDetalleId").val(detalleId);
    $("#modalCantidad").val(cantidadActual.trim());

    // Mostrar el modal
    $("#editModal").modal("show");
});


$("#saveEditBtn").on("click", function () {
    var detalleId = $("#modalDetalleId").val();
    var nuevaCantidad = parseInt($("#modalCantidad").val());

    if (!nuevaCantidad || nuevaCantidad <= 0) {
        showBootstrapAlert("Por favor, ingrese una cantidad válida.", "warning");
        return;
    }

    $.ajax({
        type: "PUT",
        url: apiUrl+"/controllers/detallescompra.php",
        data: JSON.stringify({
            id_detalle_compra: detalleId,
            cantidad: nuevaCantidad
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            if (response.codigo === 200) {
                $("#editModal").modal("hide");

                // Recargar la tabla
                var idticket = $("#idticket").val();
                loadDetallesCompra(idticket);

                showBootstrapAlert("Cantidad actualizada con éxito.", "success");
            } else {
                console.error("Error al actualizar la cantidad:", response);
                showBootstrapAlert("Error al actualizar la cantidad.", "danger");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            showBootstrapAlert("Error en la llamada AJAX.", "danger");
        }
    });
});



//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
    var detalleId = $(this).data("id");

    // Configura el manejador de clic para el botón "Eliminar" en el modal
    $("#confirmDeleteBtn")
        .unbind()
        .on("click", function () {
            // Llama a la función para eliminar el detalle de compra
            deleteDetalleCompra(detalleId);

            // Cierra el modal después de hacer clic en "Eliminar"
            $("#confirmDeleteModal").modal("hide");
        });

    // Abre el modal de confirmación
    $("#confirmDeleteModal").modal("show");
});

// Función para eliminar el detalle de compra
function deleteDetalleCompra(detalleId) {
    $.ajax({
        type: "DELETE",
        url: `${apiUrl}/controllers/detallescompra.php?id=${detalleId}`,
        success: function (response) {
            if (response.codigo === 200) {
                // Recargar la tabla
                var idticket = $("#idticket").val();
                loadDetallesCompra(idticket);

                // Mostrar mensaje de éxito
                showBootstrapAlert("Detalle de compra eliminado correctamente.", "success");
            } else {
                console.error("Error al eliminar el detalle:", response);
                showBootstrapAlert("Error al eliminar el detalle.", "danger");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            showBootstrapAlert("Error en la llamada AJAX al eliminar el detalle.", "danger");
        }
    });
}


$(document).ready(function () {
    function limpiarCampoDecimal(event) {
        var currentValue = event.target.value;
        var dotCount = currentValue.split(".").length - 1;

        // Permitir solo números y hasta un punto decimal
        if (dotCount <= 1) {
            var cleanedValue = currentValue.replace(/[^\d.]/g, "");

            // Eliminar puntos adicionales después del primer punto
            cleanedValue = cleanedValue.replace(/\.(?=[^.]*\.)/g, "");

            // Actualizar el valor del campo
            event.target.value = cleanedValue;
        } else {
            // Si hay más de un punto, eliminar el último
            event.target.value = currentValue.slice(0, -1);
        }
    }

    // Agregar un evento de escucha para el cambio en el campo de cantidad
    $("#cantidad").on("input", limpiarCampoDecimal);

    // Agregar un evento de escucha para el caso en que se pega texto en el campo
    $("#cantidad").on("paste", function (event) {
        // Esperar un breve momento antes de procesar el contenido pegado
        setTimeout(function () {
            limpiarCampoDecimal(event);
        }, 0);
    });
});

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // Formato de 2 dígitos para la hora
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Formato de 2 dígitos para los minutos
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Formato de 2 dígitos para los segundos
    return `${hours}:${minutes}:${seconds}`;
}

function formatDateToYMDWithTime(dateString) {
    const parts = dateString.split("/");
    const currentTime = getCurrentTime(); // Obtener la hora actual
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]} ${currentTime}`;
    }
    return `${dateString} ${currentTime}`; // Devolver el mismo valor si no se puede formatear
}

function addCompra(callback) {
    // Obtener los valores del formulario necesarios para crear la compra
    const idvendedor = $("#idvendedor").val();
    const fecha = $("#fecha").val(); // Campo de fecha (en formato DD/MM/YYYY)
    const idempleado = $("#idempleado").val();
    const idsucursal = document.getElementById('idSucursal').value;

    // Validar que id_sucursal no sea nulo o vacío
    if (!idsucursal) {
        console.error("ID de sucursal no encontrado.");
        showBootstrapAlert("ID de sucursal no definido.", "danger");
        return;
    }

    // Formatear la fecha al formato esperado (Y-m-d H:i:s)
    const fechaFormatted = formatDateToYMDWithTime(fecha);

    // Enviar datos al servidor
    $.ajax({
        type: "POST",
        url: apiUrl + "/controllers/compras.php",
        data: JSON.stringify({
            id_sucursal: idsucursal,
            fecha: fechaFormatted, // Fecha con hora actual incluida
            id_proveedor: idvendedor,
            id_empleado: idempleado,
            total: 0 // Inicialmente en 0, se actualizará con los detalles
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            if (response.codigo === 200 && response.data.resultado.id_compra) {
                // Ejecutar el callback con el ID de la compra recién creada
                callback(response.data.resultado.id_compra);
            } else {
                console.error("Error al crear la compra:", response);
                showBootstrapAlert("Error al crear la compra.", "danger");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX para crear la compra:", status, error);
            showBootstrapAlert("Error en la llamada AJAX para crear la compra.", "danger");
        }
    });
}
