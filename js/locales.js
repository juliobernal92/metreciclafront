$(document).ready(function () {
    cargarDatosTabla();

    // Inicializar DataTables una vez que los datos se hayan cargado
    $("#tablaLocales").DataTable({
        language: {
            url: "../json/Spanish.json",
        },
    });

    // Manejador de eventos para el botón "Editar"
    $(document).on("click", ".btn-edit", function () {
        var localId = $(this).data("id");
        // Cargar datos del local en el modal
        loadEditData(localId);
        // Abre el modal
        $("#editModal").modal("show");
    });

    // Manejador de eventos para el botón "Guardar Cambios"
    $("#guardarCambiosBtn").click(function () {
        saveEditLocal();
    });
    // Manejador de eventos para el botón "Eliminar"
    $(document).on("click", ".btn-delete", function () {
        var localId = $(this).data("id");

        // Configura el manejador de clic para el botón "Eliminar" en el modal
        $("#confirmDeleteBtn")
            .unbind()
            .on("click", function () {
                // Llama a la función para eliminar la chatarra
                deleteLocal(localId);

                // Cierra el modal después de hacer clic en "Eliminar"
                $("#confirmDeleteModal").modal("hide");
            });

        // Abre el modal de confirmación
        $("#confirmDeleteModal").modal("show");
    });

});


function showBootstrapAlert(message, type) {
    // Agregar la alerta al DOM
    var alertHtml =
        '<div class="alert alert-' +
        type +
        ' alert-dismissible fade show" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        "</div>";
    $("#alertContainer").html(alertHtml);

    // Ocultar la alerta después de 5 segundos
    setTimeout(function () {
        $(".alert").fadeOut();
    }, 5000);
}


function cargarDatosTabla() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/localesventa.php",
        dataType: "json",
        success: function (locales) {
            // Limpiar la tabla antes de agregar nuevos datos
            $("#tablaLocales").dataTable().fnClearTable();

            // Construir las filas de la tabla con los datos obtenidos
            for (var i = 0; i < locales.data.resultado.length; i++) {
                var local = locales.data.resultado[i];
                var row = [
                    i + 1,
                    local.nombre,
                    local.direccion,
                    local.telefono,
                    "<button class='btn btn-primary btn-edit' data-id='" + local.id_localventa + "'>Editar</button> | <button class='btn btn-danger btn-delete' data-id='" + local.id_localventa + "'>Eliminar</button>",
                ];
                $("#tablaLocales").dataTable().fnAddData(row);
            }
        },
    });
}


function loadEditData(localId) {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/localesventa.php",
        data: {
            id: localId
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                var locales = responseData.data.resultado;
                $("#modalLocalId").val(locales.id_localventa);
                $("#modalNombre").val(locales.nombre);
                $("#modalDireccion").val(locales.direccion);
                $("#modalTelefono").val(locales.telefono);
            } else {
                console.error(
                    "Error al cargar datos para la edición: " + responseData.message
                );
            }
        },

        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
        },
    });
}


// Función para guardar cambios después de la edición
function saveEditLocal() {
    // Obtener datos editados desde el modal
    var localId = $("#modalLocalId").val();
    var nuevoNombre = $("#modalNombre").val();
    var nuevaDireccion = $("#modalDireccion").val();
    var nuevoTelefono = $("#modalTelefono").val();
    // Puedes hacer una solicitud AJAX para enviar los datos editados al servidor
    $.ajax({
        type: "PUT",
        url: "http://localhost/api_metrecicla/controllers/localesventa.php",
        data: JSON.stringify({
            id_localventa: localId,
            nombre: nuevoNombre,
            direccion: nuevaDireccion,
            telefono: nuevoTelefono,
            activo: 1,
            ajax: 1
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                $("#editModal").modal("hide");
                cargarDatosTabla();
                showBootstrapAlert("Local editado correctamente", "success");
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




function deleteLocal(localId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost/api_metrecicla/controllers/localesventa.php?id=${localId}`,
        data: {
            id_localventa: localId
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                cargarDatosTabla();

                // Mostrar la alerta de Bootstrap
                showBootstrapAlert(
                    "Local eliminado correctamente",
                    "success"
                );
            } else {
                console.error(
                    "Error al eliminar local: " + responseData.message
                );
                // Mostrar la alerta de Bootstrap con un mensaje de error
                showBootstrapAlert(
                    "Error al eliminar local: " + responseData.message,
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
