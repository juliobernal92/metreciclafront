$(document).ready(function () {
    cargarDatosTabla();
    // Inicializar DataTables una vez que los datos se hayan cargado
    $("#tablaEmpleados").DataTable({
        language: {
            url: "../json/Spanish.json",
        },
    });


    //----------------------------------------------------------------
    // Manejador de eventos para el botón "Editar"
    $(document).on("click", ".btn-edit", function () {
        var empleadoId = $(this).data("id");

        // Cargar datos del detalle de chatarra en el modal de edición
        loadEditData(empleadoId);

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
        $("#modalEmpleadoId").val("");
        $("#modalNombre").val("");
        $("#modalApellido").val("");
        $("#modalCedula").val("");
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

// CARGAR DATOS EN LA TABLA
function cargarDatosTabla() {
    $.ajax({
        type: "GET",
        url: apiUrl + "/controllers/empleados.php",
        dataType: "json",
        success: function (empleados) {
            var tabla = $('#tablaEmpleados').DataTable();
            tabla.clear().draw();

            for (var i = 0; i < empleados.data.resultado.length; i++) {
                var empleado = empleados.data.resultado[i];
                var row = [
                    (i + 1),
                    empleado.nombre_apellido,
                    empleado.telefono,
                    empleado.direccion,
                    empleado.cedula,

                    "<button class='btn btn-primary btn-edit' data-id='" + empleado.id_empleado + "'>Editar</button> | <button class='btn btn-danger btn-delete' data-id='" + empleado.id_empleado + "'>Eliminar</button>"
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
function loadEditData(empleadoId) {
    $.ajax({
        type: "GET",
        url: `${apiUrl}/controllers/empleados.php`,
        data: {
            id: empleadoId
        },
        dataType: "json",
        success: function (responseData) {
            if (responseData.codigo === 200) {
                var empleado = responseData.data.resultado[0];
                $("#modalEmpleadoId").val(empleado.id_empleado);
                $("#modalNombre").val(empleado.nombre_apellido);
                $("#modalCedula").val(empleado.cedula);
                $("#modalDireccion").val(empleado.direccion);
                $("#modalTelefono").val(empleado.telefono);
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
function saveEditEmpleado() {
    var empleadoId = $("#modalEmpleadoId").val();
    var nuevoNombre = $("#modalNombre").val();
    var nuevoTelefono = $("#modalTelefono").val();
    var nuevaDireccion = $("#modalDireccion").val();
    var cedula = $("#modalCedula").val();

    $.ajax({
        type: "PUT",
        url: apiUrl + "/controllers/empleados.php",
        data: JSON.stringify({
            id_empleado: empleadoId,
            nombre_apellido: nuevoNombre,
            telefono: nuevoTelefono,
            direccion: nuevaDireccion,
            activo: 1,
            ajax: 1
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
        }
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

// Función para mostrar alertas de Bootstrap
function showBootstrapAlert(message, type) {
    var alertHtml =
        '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
        '</div>';
    $("#alertContainer").html(alertHtml);

    setTimeout(function () {
        $(".alert").fadeOut();
    }, 5000);
}

//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
    var empleadoId = $(this).data("id");

    // Configura el manejador de clic para el botón "Eliminar" en el modal
    $("#confirmDeleteBtn")
        .unbind()
        .on("click", function () {
            // Llama a la función para eliminar el proveedor
            deleteEmpleado(empleadoId);

            // Cierra el modal después de hacer clic en "Eliminar"
            $("#confirmDeleteModal").modal("hide");
        });

    // Abre el modal de confirmación
    $("#confirmDeleteModal").modal("show");
});

// Función para eliminar la chatarra
function deleteEmpleado(empleadoId) {
    $.ajax({
        type: "DELETE",
        url: apiUrl + "/controllers/empleados.php",
        data: JSON.stringify({
            id_empleado: empleadoId,
            ajax: 1
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
///FECHA
function formatDateToYMD(dateString) {
    var parts = dateString.split("/");
    if (parts.length === 3) {
        return parts[2] + "-" + parts[1] + "-" + parts[0];
    }
    return dateString; // Devolver el mismo valor si no se puede formatear
}

//ADD EMPLEADO
function addEmpleado() {
    var nombre = $("#nombre").val();
    var cedula = parseInt($("#cedula").val(), 10); // Convertir a número entero
    var contraseña = $("#contraseña").val();
    var direccion = $("#direccion").val();
    var telefono = $("#telefono").val(); 
    var confirmarContraseña = $("#confirmarContraseña").val();
    var fecha = $("#fecha").val();
    var fechaContratacion = formatDateToYMD(fecha);
    var idsucursal = parseInt($("#idsucursal").val(), 10); // Convertir a número entero

    // Validaciones
    if (nombre === '' || direccion === '' || telefono === '' || cedula === '' || contraseña === '' || confirmarContraseña === '') {
        showBootstrapAlert("Por favor, ingrese todos los campos.", "warning");
        $('#nombre').focus();
        return;
    }

    // Validar nombre solo contiene letras o espacios
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        showBootstrapAlert("Por favor, ingrese solo letras o espacios en Nombre y Apellido.", "warning");
        $('#nombre').focus();
        return;
    }

    // Validar dirección solo contiene letras, espacios o números
    if (!/^[a-zA-Z0-9\s]+$/.test(direccion)) {
        showBootstrapAlert("Por favor, ingrese solo letras y números en Dirección.", "warning");
        $('#direccion').focus();
        return;
    }

    // Validar teléfono solo números
    if (!/^\d+$/.test(telefono)) {
        showBootstrapAlert("Por favor, ingrese solo números en Teléfono.", "warning");
        $('#telefono').focus();
        return;
    }

    // Validar cédula solo números
    if (!/^\d+$/.test(cedula)) {
        showBootstrapAlert("Por favor, ingrese solo números en Cédula.", "warning");
        $('#cedula').focus();
        return;
    }

    // Validar contraseña
    if (contraseña.length < 8) {
        showBootstrapAlert('La contraseña debe tener al menos 8 caracteres.', 'warning');
        $('#contraseña').focus();
        return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(contraseña)) {
        showBootstrapAlert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.', 'warning');
        $('#contraseña').focus();
        return;
    }

    // Verificar si las contraseñas coinciden
    if (contraseña !== confirmarContraseña) {
        showBootstrapAlert('Las contraseñas no coinciden.', 'warning');
        $('#confirmarContraseña').focus();
        return;
    }

    // Crear el objeto de datos JSON
    var data = {
        nombre_apellido: nombre,
        telefono: telefono,
        direccion: direccion,
        cedula: cedula,
        pass: contraseña,
        fecha_contratacion: fechaContratacion,
        id_sucursal: idsucursal,
        id_rol: 2,
        activo: 1,
        ajax: 1
    };

    // Imprimir el JSON en la consola
    console.log("Datos enviados al servidor:", JSON.stringify(data));

    // Realizar la solicitud AJAX al backend
    $.ajax({
        type: "POST",
        url: apiUrl + "/controllers/empleados.php",
        data: JSON.stringify({
            nombre_apellido: nombre,
            telefono: telefono,
            direccion: direccion,
            cedula: cedula,
            pass: contraseña,
            fecha_contratacion: fechaContratacion,
            id_sucursal: idsucursal,
            id_rol: 2,
            activo: 1,
            ajax: 1
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            showBootstrapAlert("Empleado añadido con éxito.", "success");
            setTimeout(function () {
                window.location.href = "../views/empleados.php";
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
            showBootstrapAlert("Error en la solicitud", "danger");
        },
    });
}








//----------------------------------------------------------------
$(document).ready(function () {
    // Cargar sucursales al cargar la página
    cargarSucursales();
    // Evento para manejar cambios en el selector de sucursales
    $("#idSucursalSelect").on("change", function () {
        // Obtener el ID de la sucursal seleccionada
        const selectedId = $(this).val();

        // Guardar el ID en el campo oculto
        $("#idsucursal").val(selectedId);

    });

});

function cargarSucursales() {
    $.ajax({
        type: "GET",
        url: apiUrl + "/controllers/sucursales.php",
        dataType: "json",
        success: function (response) {
            if (response.codigo === 200 && response.data.resultado.length > 0) {
                let opciones = '<option value="">Seleccione una Sucursal</option>';
                response.data.resultado.forEach(sucursal => {
                    opciones += `<option value="${sucursal.id_sucursal}">${sucursal.nombre}</option>`;
                });
                $("#idSucursalSelect").html(opciones);
            } else {
                $("#idSucursalSelect").html('<option value="">No hay sucursales disponibles</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar sucursales:", status, error);
        }
    });
}