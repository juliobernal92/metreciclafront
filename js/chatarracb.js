$(document).ready(function () {
    // Cargar chatarras al cargar la página
    cargarChatarras();

    // Asignar evento al combobox
    $("#idChatarraSelect").change(function () {
        cargarPrecioChatarra();
    });
});


function cargarChatarras() {
    const idSucursal = $("#idSucursal").val(); // Obtener id_sucursal del input hidden

    if (!idSucursal) {
        console.error("No se encontró el ID de la sucursal.");
        return;
    }

    $.ajax({
        type: "GET",
        url: apiUrl + "/controllers/chatarras.php",
        data: { id_sucursal: idSucursal }, // Enviar id_sucursal como parámetro
        dataType: "json",
        success: function (response) {
            if (response.codigo === 200 && response.data.resultado.length > 0) {
                let opciones = '<option value="">Seleccione una chatarra</option>';
                response.data.resultado.forEach(chatarra => {
                    opciones += `<option value="${chatarra.id_chatarra}" data-precio="${chatarra.precio}">${chatarra.nombre}</option>`;
                });
                $("#idChatarraSelect").html(opciones);
            } else {
                $("#idChatarraSelect").html('<option value="">No hay chatarras disponibles</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar chatarras:", status, error);
        }
    });
}

function cargarPrecioChatarra() {
    // Obtener el precio de la opción seleccionada
    const precio = $("#idChatarraSelect option:selected").data("precio");
    $("#precio").val(precio || ""); // Asignar el precio, vacío si no existe
}
