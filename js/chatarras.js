// Función para cargar los datos iniciales en la tabla
function cargarDatosTabla() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_metrecicla/controllers/chatarras.php",
        dataType: "json",
        success: function (chatarras) {
            var tabla = $('#tablaChatarra').DataTable();
            tabla.clear().draw();

            for (var i = 0; i < chatarras.data.resultado.length; i++) {
                var chatarra = chatarras.data.resultado[i];
                var row = [
                    (i + 1),
                    chatarra.nombre,
                    chatarra.precio,
                    "<button class='btn btn-primary btn-edit' data-id='" + chatarra.id_chatarra + "'>Editar</button> | <button class='btn btn-danger btn-delete' data-id='" + chatarra.id_chatarra + "'>Eliminar</button>"
                ];
                tabla.row.add(row).draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
        }
    });
}

// Manejador de eventos cuando el documento está listo
$(document).ready(function () {
    cargarDatosTabla();

    // Manejador de eventos para el botón "Editar"
    $(document).on("click", ".btn-edit", function () {
        var chatarraId = $(this).data("id");

        // Cargar datos del detalle de chatarra en el modal de edición
        loadEditData(chatarraId);

        // Mostrar el modal de edición
        $("#editModal").modal("show");
    });

    // Manejador de eventos para el botón "Guardar Cambios"
    $("#guardarCambiosBtn").click(function () {
        saveEditChatarra();
    });

    // Manejador de eventos para el botón "Cerrar" del modal de edición
    $("#editModal").on("hidden.bs.modal", function () {
        // Limpiar los campos del modal al cerrarlo
        $("#modalChatarraId").val("");
        $("#modalNombre").val("");
        $("#modalPrecio").val("");
    });

    // Función para cerrar el modal de edición
    function cerrarModalEdit() {
        $("#editModal").modal("hide");
    }

    // Función para cerrar el modal de confirmación de eliminación
    function cerrarDelete() {
        $("#confirmDeleteModal").modal("hide");
    }
});

// Función para cargar los datos de una chatarra específica en el modal de edición
function loadEditData(chatarraId) {
    $.ajax({
        type: "GET",
        url: 'http://localhost/api_metrecicla/controllers/chatarras.php',
        data: {
            id: chatarraId
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                var chatarra = responseData.data.resultado;
                $("#modalChatarraId").val(chatarra.id_chatarra);
                $("#modalNombre").val(chatarra.nombre);
                $("#modalPrecio").val(chatarra.precio);
                // Actualizar otros campos del formulario según sea necesario
            } else {
                console.error("Error al cargar datos para la edición: " + responseData.descripcion);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
        }
    });
}

// Función para guardar los cambios realizados en el modal de edición
function saveEditChatarra() {
    var chatarraId = $("#modalChatarraId").val();
    var nuevoNombre = $("#modalNombre").val();
    var nuevoPrecio = $("#modalPrecio").val();

    $.ajax({
        type: "PUT",
        url: "http://localhost/api_metrecicla/controllers/chatarras.php",
        data: JSON.stringify({
            id_chatarra: chatarraId,
            nombre: nuevoNombre,
            precio: nuevoPrecio,
            ajax: 1,
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                $("#editModal").modal("hide");
                showBootstrapAlert("¡Los cambios se han guardado exitosamente!", "success");

                cargarDatosTabla();
            } else {
                console.error("Error al guardar cambios: " + responseData.descripcion);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            console.log(xhr.responseText);
        },
    });

}



// Función para cerrar el modal de edición
function cerrarModalEdit() {
    $("#editModal").modal("hide");
}

// Función para cerrar el modal de confirmación de eliminación
function cerrarDelete() {
    $("#confirmDeleteModal").modal("hide");
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
    $("#alertContainer").html(alertHtml);

    // Ocultar la alerta después de 5 segundos
    setTimeout(function () {
        $(".alert").fadeOut();
    }, 5000);
}


//ADD CHATARRA
function addChatarraForm() {
    var nombre = $("#nombre").val();
    var precio = $("#precio").val();

    // Validar nombre y apellido solo contienen letras o espacios
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        showBootstrapAlert(
            "Por favor, ingrese solo letras o espacios en Nombre.",
            "warning"
        );
        return;
    }

    // Validar PRECIO solo contiene números
    if (!/^\d+$/.test(precio)) {
        showBootstrapAlert(
            "Por favor, ingrese solo números en Teléfono.",
            "warning"
        );
        return;
    }

    // Realizar la solicitud AJAX al backend
    $.ajax({
        type: "POST",
        url: "http://localhost/api_metrecicla/controllers/chatarras.php",
        data: JSON.stringify({
            nombre: nombre,
            precio: precio
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            showBootstrapAlert("Chatarra añadida con éxito.", "success");
            setTimeout(function () {
                window.location.href = "../views/chatarras.php";
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
            showBootstrapAlert("Error en la solicitud AJAX", "danger");
        },
    });
}


//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
    var chatarraId = $(this).data("id");

    // Configura el manejador de clic para el botón "Eliminar" en el modal
    $("#confirmDeleteBtn")
        .unbind()
        .on("click", function () {
            // Llama a la función para eliminar la chatarra
            deleteChatarra(chatarraId);

            // Cierra el modal después de hacer clic en "Eliminar"
            $("#confirmDeleteModal").modal("hide");
        });

    // Abre el modal de confirmación
    $("#confirmDeleteModal").modal("show");
});


// Función para eliminar la chatarra
function deleteChatarra(chatarraId) {
    var id_chatarra = chatarraId;
    $.ajax({
        type: "DELETE",
        url: "http://localhost/api_metrecicla/controllers/chatarras.php",
        data: JSON.stringify({
            id_chatarra: id_chatarra,
            ajax: 1,
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                $("#confirmDeleteModal").modal("hide");
                showBootstrapAlert("¡Eliminado exitosamente!", "success");

                cargarDatosTabla();
            } else {
                console.error("Error al eliminar: " + responseData.descripcion);
            }
        }

    });
}
