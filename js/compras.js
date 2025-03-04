function addProveedor() {
    var idvendedor = $("#idvendedor").val(); // Obtener el valor del ID Vendedor

    // Si el ID está lleno, buscar el proveedor antes de intentar añadir uno nuevo
    if (idvendedor && idvendedor.trim() !== "") {
        buscarProveedor(); // Llama a buscarProveedor y luego sale de la función
        return;
    }

    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var direccion = $("#direccion").val();

    // Validar nombre y apellido solo contienen letras o espacios
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        showBootstrapAlert(
            "Por favor, ingrese solo letras o espacios en Nombre.",
            "warning"
        );
        return;
    }

    // Validar teléfono solo contiene números
    if (!/^\d+$/.test(telefono)) {
        showBootstrapAlert(
            "Por favor, ingrese solo números en Teléfono.",
            "warning"
        );
        return;
    }

    // Validar dirección que puede contener letras, números y espacios
    if (!/^[a-zA-Z0-9\s]+$/.test(direccion)) {
        showBootstrapAlert(
            "Por favor, ingrese solo letras, números o espacios en la dirección.",
            "warning"
        );
        return;
    }

    // Llamada AJAX para añadir el proveedor
    $.ajax({
        type: "POST",
        url: apiUrl + "/controllers/proveedores.php",
        data: JSON.stringify({
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            activo: 1
        }),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            // Validar que la respuesta tenga el formato esperado y contenga un ID
            if (response.codigo === 200 && response.data.resultado.id_proveedor) {
                showBootstrapAlert("Proveedor añadido con éxito.", "success");
                $("#idvendedor").val(response.data.resultado.id_proveedor); // Asignar ID del nuevo proveedor
            } else {
                showBootstrapAlert("Error al añadir el proveedor.", "danger");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
            showBootstrapAlert("Error en la solicitud AJAX", "danger");
        },
    });
}



/// BUSCAR PROVEEDOR
// Agregar un evento al presionar Enter en el campo ID del proveedor
$(document).ready(function () {
    // Evento cuando se presiona una tecla en el campo de ID Vendedor
    $("#idvendedor").keydown(function (e) {
        // Verificar si la tecla presionada es "Enter" (código 13)
        if (e.which === 13) {
            // Evitar el comportamiento por defecto de la tecla Enter (submit de formulario)
            e.preventDefault();
            // Realizar la búsqueda en la base de datos
            buscarProveedor();
        }
    });
});


function buscarProveedor() {
    var id_proveedor = $("#idvendedor").val(); // Obtener el ID

    if (!id_proveedor || id_proveedor.trim() === "") {
        showBootstrapAlert("Por favor, ingrese un ID válido para buscar.", "warning");
        return;
    }

    $.ajax({
        type: "GET",
        url: `${apiUrl}/controllers/proveedores.php`, // La URL base
        data: { id: id_proveedor }, // Parámetro GET
        dataType: "json",
        success: function (response) {
            // Verificar si el proveedor fue encontrado
            if (response.codigo === 200 && response.data && response.data.resultado) {
                var proveedor = response.data.resultado; // Accedemos directamente al objeto

                // Completar los campos del formulario con los datos del proveedor
                $("#nombre").val(proveedor.nombre);
                $("#telefono").val(proveedor.telefono);
                $("#direccion").val(proveedor.direccion);

                showBootstrapAlert("Proveedor encontrado y datos completados.", "success");
            } else {
                // Si no hay resultado
                $("#nombre").val('');
                $("#telefono").val('');
                $("#direccion").val('');
                showBootstrapAlert("Proveedor no encontrado.", "warning");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la llamada AJAX:", status, error);
            showBootstrapAlert("Error al buscar el proveedor.", "danger");
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
    $("#alertContainer").html(alertHtml);

    // Ocultar la alerta después de 5 segundos
    setTimeout(function () {
        $(".alert").fadeOut();
    }, 3000);
}