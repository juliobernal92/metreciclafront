$(document).ready(function () {
    // Cargar locales al inicio
    cargarLocales();

    // Listener al cambio en el select de locales
    $("#idlocalSelect").change(function () {
        var idLocal = $(this).val(); // Obtener el id del local seleccionado
        if (idLocal === "") {
            // Limpiar la tabla si no hay local seleccionado
            $("#tablaPreciolocal tbody").empty();
        } else {
            cargarDetallesLocal(idLocal); // Llamar a cargar detalles del local
            cargarChatarraSinPrecioVenta(idLocal); // Llamar a cargar las chatarras del local
        }
    });

    // Listener para el cambio en el select de chatarras
    $("#idChatarraSelect").change(function () {
        // Verificar si se seleccionó la opción "Seleccione una chatarra..."
        if ($(this).val() === "") {
            // Limpiar la tabla si no se ha seleccionado una chatarra
            $("#tablaPreciolocal tbody").empty();
        } else {
            console.log("Se seleccionó una chatarra.");
        }
    });
});
function cargarLocales() {
    // Realizar la llamada AJAX para obtener las opciones del select
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/localesventa.php", // Ajusta la ruta si es necesario
        dataType: "json",
        success: function (response) {
            if (response.codigo === 200 && response.data.resultado.length > 0) {
                let opciones = '<option value="">Seleccione un local...</option>';
                response.data.resultado.forEach(local => {
                    opciones += `<option value="${local.id_localventa}">${local.nombre}</option>`;
                });
                $("#idlocalSelect").html(opciones); // Llenar el select correcto
            } else {
                $("#idlocalSelect").html('<option value="">No hay locales disponibles</option>');
            }
        },
        error: function (error) {
            console.error("Error al cargar opciones de Local:", error);
        },
    });
}


function cargarChatarraSinPrecioVenta(idLocal) {
    $.ajax({
        type: "GET",
        url: `http://localhost/api_metrecicla/controllers/preciolocal.php?id_localventa=${idLocal}`,
        dataType: "json",
        success: function (response) {
            if (response.codigo === 200) {
                let opciones = '<option value="">Seleccione una chatarra...</option>';
                response.data.resultado.forEach(chatarra => {
                    opciones += `<option value="${chatarra.id_chatarra}">${chatarra.nombre}</option>`;
                });
                $("#idChatarraSelect").html(opciones);
            } else {
                $("#idChatarraSelect").html('<option value="">No hay chatarras disponibles</option>');
            }
        },
        error: function (error) {
            console.error("Error al cargar las chatarras disponibles:", error);
        },
    });
}


function cargarDetallesLocal() {

    var idLocal = $("#idlocalSelect").val();

    // Realizar la llamada AJAX para obtener los detalles de los precios del local seleccionado
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/preciolocal.php", // Ajusta la ruta según tu estructura de archivos
        data: { id_local: idLocal }, // Envía el ID del local seleccionado al servidor
        dataType: "json",
        success: function (data) {
            // Limpiar la tabla antes de agregar los nuevos datos
            $("#tablaPreciolocal tbody").empty();

            // Verifica si los datos existen antes de intentar agregarlos a la tabla
            if (data.data && data.data.resultado) {
                // Llena la tabla con los detalles de los precios obtenidos
                $.each(data.data.resultado, function (index, detalle) {
                    var row =
                        "<tr>" +
                        "<td>" +
                        (index + 1) +
                        "</td>" +
                        "<td>" +
                        detalle.nombre + // Aquí se muestra el nombre de la chatarra
                        "</td>" +
                        "<td>" +
                        detalle.precioventa + // Muestra el precio de venta
                        "</td>" +
                        "<td>" +
                        "<button class='btn btn-primary btn-edit' data-id='" +
                        detalle.id_preciolocal +
                        "'>Editar</button> | <button class='btn btn-danger btn-delete' data-id='" +
                        detalle.id_preciolocal +
                        "'>Eliminar</button>" +
                        "</td>" +
                        "</tr>";
                    $("#tablaPreciolocal tbody").append(row);
                });
            } else {
                // Si no hay datos, muestra un mensaje en la tabla
                $("#tablaPreciolocal tbody").append("<tr><td colspan='4'>No se encontraron resultados</td></tr>");
            }
        },
        error: function (error) {
            console.error("Error al cargar detalles de Local:", error);
        },
    });
}



function addPrecioLocal() {
    // Obtener el ID del local seleccionado
    var idLocal = $("#idlocalSelect").val();
    // Obtener el ID de la chatarra seleccionada
    var idChatarra = $("#idChatarraSelect").val();
    // Obtener el precio
    var precio = $("#precio").val();

    $.ajax({
        type: "POST",
        url: "http://localhost/api_metrecicla/controllers/preciolocal.php", // Ajusta la ruta según tu estructura de archivos
        data: JSON.stringify({
            id_localventa: idLocal,
            id_chatarra: idChatarra,
            precioventa: precio,
            activo: 1,
            ajax: 1,
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            // Limpiar los campos
            $("#precio").val("");
            cargarDetallesLocal();
            cargarChatarraSinPrecioVenta(idLocal); // Llama a cargarChatarraSinPrecioVenta() después de agregar un precio
            showBootstrapAlert("Chatarra Añadida correctamente", "success");
        },
        error: function (error) {
            console.error("Error al agregar precio:", error);
            showBootstrapAlert("Error al añadir chatarra", "danger");
        },
    });
}

function showBootstrapAlert(message, type) {
    // Agregar la alerta al DOM
    var alertHtml =
        '<div class="alert alert-' +
        type +
        ' alert-dismissible fade show" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        "</div>";
    $("#alertContainer").html(alertHtml); // Corregir el selector aquí

    // Ocultar la alerta después de 5 segundos
    setTimeout(function () {
        $(".alert").alert("close"); // Intenta cerrar la alerta usando el método de Bootstrap
    }, 5000);

    // Ocultar la alerta después de 5 segundos usando vanilla JavaScript como alternativa
    setTimeout(function () {
        document.querySelector(".alert").style.display = "none";
    }, 5000);
}

// Manejador de eventos para el botón "Editar"
$(document).on("click", ".btn-edit", function () {
    var precioId = $(this).data("id");
    $("#idprecio").val(precioId);

    loadEditData(precioId);

    // Abre el modal
    $("#editModal").modal("show");
});

function loadEditData(precioId) {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/preciolocal.php",
        data: {
            id: precioId,
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                var precio = responseData.data.resultado; // Aquí obtenemos el objeto de datos directamente
                console.log(responseData); // Muestra toda la respuesta para verificar

                // Asignamos los valores a los campos del modal
                $("#modalPrecioId").val(precio.id_preciolocal); // Asignar ID
                $("#modalNombre").val(precio.nombre); // Asignar nombre
                $("#modalPrecio").val(precio.precioventa); // Asignar precio

                // Verifica los valores que estás obteniendo
                console.log('id precio venta pasando: ', precio.id_preciolocal, "nombre que llega: ", precio.nombre);
            } else {
                console.error("Error al cargar datos para la edición: " + responseData.descripcion);
            }
        },

        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
        },
    });
}


// Función para guardar cambios después de la edición
function saveEditChatarra() {
    var precioId = $("#idprecio").val();
    guardaredit(precioId);

}

function guardaredit(precioId) {
    var nuevoPrecio = $("#modalPrecio").val();
    $.ajax({
        type: "PUT",
        url: "http://localhost/api_metrecicla/controllers/preciolocal.php",
        data: JSON.stringify({
            id_preciolocal: precioId,
            precioventa: nuevoPrecio
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                $("#editModal").modal("hide");
                cargarDetallesLocal();
                showBootstrapAlert("Precio editado correctamente", "success");
            } else {
                console.error("Error al guardar cambios: " + responseData.message);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
        },
    });
}



function cerrarModalEdit() {
    $("#editModal").modal("hide");
}

function cerrarDelete() {
    $("#confirmDeleteModal").modal("hide");
}



//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
    var precioId = $(this).data("id");

    // Configura el manejador de clic para el botón "Eliminar" en el modal
    $("#confirmDeleteBtn")
        .unbind()
        .on("click", function () {
            // Llama a la función para eliminar la chatarra
            deletePrecio(precioId);

            // Cierra el modal después de hacer clic en "Eliminar"
            $("#confirmDeleteModal").modal("hide");
        });

    // Abre el modal de confirmación
    $("#confirmDeleteModal").modal("show");
});




// Función para eliminar la chatarra
function deletePrecio(precioId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost/api_metrecicla/controllers/preciolocal.php?id=${precioId}`,
        data: {
            id_precioventa: precioId,
            ajax: 1,
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                cargarDetallesLocal();

                // Mostrar la alerta de Bootstrap
                showBootstrapAlert(
                    "Chatarra eliminada correctamente",
                    "success"
                );
            } else {
                console.error(
                    "Error al eliminar chatarra: " + responseData.message
                );
                // Mostrar la alerta de Bootstrap con un mensaje de error
                showBootstrapAlert(
                    "Error al eliminar chatarra: " + responseData.message,
                    "danger"
                );
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            // Mostrar la alerta de Bootstrap con un mensaje de error
            showBootstrapAlert("Error en la llamada AJAX", "danger");
        },
    });
}