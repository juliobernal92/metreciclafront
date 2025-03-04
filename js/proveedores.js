$(document).ready(function () {
    cargarDatosTabla();
    // Inicializar DataTables una vez que los datos se hayan cargado
    $("#tablaProveedores").DataTable({
        language: {
            url: "../json/Spanish.json",
        },
    });


    //----------------------------------------------------------------
    // Manejador de eventos para el botón "Editar"
    $(document).on("click", ".btn-edit", function () {
        var proveedorID = $(this).data("id");

        // Cargar datos del detalle de chatarra en el modal de edición
        loadEditData(proveedorID);

        // Mostrar el modal de edición
        $("#editModal").modal("show");
    });

    // Manejador de eventos para el botón "Guardar Cambios"
    $("#guardarCambiosBtn").click(function () {
        saveEditProveedor();
    });

    // Manejador de eventos para el botón "Cerrar" del modal de edición
    $("#editModal").on("hidden.bs.modal", function () {
        // Limpiar los campos del modal al cerrarlo
        $("#modalProveedorId").val("");
        $("#modalNombre").val("");
        $("#modalDireccion").val("");
        $("#modalTelefono").val("");
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
//CARGAR DATOS EN LA TABLA
function cargarDatosTabla() {
    const idSucursal = $("#idSucursal").val();
    $.ajax({
        type: "GET",
        url: apiUrl+"/controllers/proveedores.php",
        dataType: "json",
        data: { id_sucursal: idSucursal },
        success: function (proveedores) {
            var tabla = $('#tablaProveedores').DataTable();
            tabla.clear().draw();

            for (var i = 0; i < proveedores.data.resultado.length; i++) {
                var proveedor = proveedores.data.resultado[i];
                var row = [
                    (i + 1),
                    proveedor.nombre,
                    proveedor.direccion,
                    proveedor.telefono,

                    "<button class='btn btn-primary btn-edit' data-id='" + proveedor.id_proveedor + "'>Editar</button> | <button class='btn btn-danger btn-delete' data-id='" + proveedor.id_proveedor + "'>Eliminar</button>"
                ];
                tabla.row.add(row).draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
        },
    });
}

// Función para cargar los datos de un proveedor específico en el modal de edición
function loadEditData(proveedorID) {
    $.ajax({
        type: "GET",
        url: `${apiUrl}/controllers/proveedores.php`,
        data: {
            id: proveedorID
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                var proveedor = responseData.data.resultado;
                $("#modalProveedorId").val(proveedor.id_proveedor);
                $("#modalNombre").val(proveedor.nombre);
                $("#modalDireccion").val(proveedor.direccion);
                $("#modalTelefono").val(proveedor.telefono);
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
function saveEditProveedor() {
    var proveedorId = $("#modalProveedorId").val();
    var nuevoNombre = $("#modalNombre").val();
    var nuevaDireccion = $("#modalDireccion").val();
    var nuevoTelefono = $("#modalTelefono").val();

    $.ajax({
        type: "PUT",
        url: apiUrl+"/controllers/proveedores.php",
        data: JSON.stringify({
            id_proveedor: proveedorId,
            nombre: nuevoNombre,
            direccion: nuevaDireccion,
            telefono: nuevoTelefono,
            activo: 1,
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


//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
    var proveedorId = $(this).data("id");

    // Configura el manejador de clic para el botón "Eliminar" en el modal
    $("#confirmDeleteBtn")
        .unbind()
        .on("click", function () {
            // Llama a la función para eliminar el proveedor
            deleteProveedor(proveedorId);

            // Cierra el modal después de hacer clic en "Eliminar"
            $("#confirmDeleteModal").modal("hide");
        });

    // Abre el modal de confirmación
    $("#confirmDeleteModal").modal("show");
});


// Función para eliminar la chatarra
function deleteProveedor(proveedorId) {
    $.ajax({
        type: "DELETE",
        url: `${apiUrl}/controllers/proveedores.php?id=${proveedorId}`,
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                $("#confirmDeleteModal").modal("hide");
                showBootstrapAlert("¡Eliminado exitosamente!", "success");
                cargarDatosTabla();
            } else {
                console.error("Error al eliminar: " + responseData.descripcion);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
        },
    });
}


//ADD PROVEEDOR
function addProveedorForm() {
    var nombre = $("#nombre").val();
    var direccion = $("#direccion").val();
    var telefono = $("#telefono").val();

    if (nombre === '' || direccion === '' || telefono === '') {
        showBootstrapAlert(
            "Por favor, Ingrese todos los campos.",
            "warning"
        );
        $('#nombre').focus();
        return;
    }

    // Validar nombre y apellido solo contienen letras o espacios
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        showBootstrapAlert(
            "Por favor, ingrese solo letras o espacios en Nombre.",
            "warning"
        );
        $('#nombre').focus();
        return;
    }

    // Validar direccion solo contienen letras, espacios o numeros
    if (!/^[a-zA-Z0-9\s]+$/.test(direccion)) {
        showBootstrapAlert(
            "Por favor, ingrese solo letras y numeros en Direccion.",
            "warning"
        );
        $('#direccion').focus();
        return;
    }

    // Validar telefono solo numeros
    if (!/^\d+$/.test(telefono)) {
        showBootstrapAlert(
            "Por favor, ingrese solo números en Telefono.",
            "warning"
        );
        $('#telefono').focus();
        return;
    }



    // Realizar la solicitud AJAX al backend
    $.ajax({
        type: "POST",
        url: apiUrl+"/controllers/proveedores.php",
        data: JSON.stringify({
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            activo: 1,
            ajax: 1,
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            showBootstrapAlert("Proveedor añadido con éxito.", "success");
            setTimeout(function () {
                window.location.href = "../views/proveedores.php";
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
            showBootstrapAlert("Error en la solicitud AJAX", "danger");
        },
    });
}
