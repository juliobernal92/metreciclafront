$(document).ready(function () {
  // Cargar locales al cargar la página
  cargarLocales();

  // Listener para cambio en el select
  $("#idlocalSelect").change(function () {
    cargarDetallesLocal();
    cargarChatarrasCb();
  });
});
///funcion para combobox
function cargarLocales() {
  $.ajax({
    type: "GET",
    url: "http://localhost/api_metrecicla/controllers/localesventa.php",
    dataType: "json",
    success: function (response) {
      if (response.codigo === 200 && response.data.resultado.length > 0) {
        let opciones = '<option value="">Seleccione un local...</option>';
        response.data.resultado.forEach((local) => {
          opciones += `<option value="${local.id_localventa}">${local.nombre}</option>`;
        });
        $("#idlocalSelect").html(opciones);
      } else {
        $("#idlocalSelect").html(
          '<option value="">No hay locales disponibles</option>'
        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar locales:", status, error);
    },
  });
}

function cargarDetallesLocal() {
  // Obtener el ID seleccionado
  var selectedLocalId = $("#idlocalSelect").val();

  // Actualizar el campo oculto con el valor seleccionado
  $("#idlocal").val(selectedLocalId);
}
//////////////////---------------------------------------
function cargarChatarrasCb() {
  var idLocal = $("#idlocalSelect").val();
  var idSucursal = $("#idSucursal").val();

  if (!idLocal || !idSucursal) {
    console.warn("No se ha seleccionado un local o sucursal.");
    return;
  }

  $.ajax({
    type: "GET",
    url: "http://localhost/api_metrecicla/controllers/preciolocal.php",
    data: { localventa: idLocal, sucursal: idSucursal },
    dataType: "json",
    success: function (data) {
      if (data.codigo === 200 && data.data.resultado.length > 0) {
        let opciones = '<option value="">Seleccione una chatarra...</option>';
        data.data.resultado.forEach((chatarra) => {
          opciones += `<option value="${chatarra.id_chatarra}" data-idpreciolocal="${chatarra.id_preciolocal}">${chatarra.nombre}</option>`;
        });
        $("#idChatarraSelect").html(opciones);
      } else {
        $("#idChatarraSelect").html(
          '<option value="">No hay chatarras disponibles</option>'
        );
      }
    },
    error: function (error) {
      console.error("Error al cargar chatarras:", error);
    },
  });
}

$("#idChatarraSelect").change(function () {
  var selectedId = $(this).val();
  var selectedChatarraDataId = $(this)
    .find("option:selected")
    .data("idpreciolocal");

  if (selectedId === "") {
    $("#idChatarra").val("");
    $("#preciocompra").val("");
    $("#precioventa").val("");
  } else {
    $("#idChatarra").val(selectedId);
    if (selectedChatarraDataId) {
      $("#idpreciolocal").val(selectedChatarraDataId); // Asignar el id_preciolocal correcto
      getPrecioVenta(selectedChatarraDataId);
    }
    getPrecioCompra();
  }
});

function getPrecioCompra() {
  var idChatarra = $("#idChatarra").val(); // Obtener el id de chatarra almacenado

  if (!idChatarra) {
    console.warn("No se ha seleccionado una chatarra.");
    return;
  }

  // Llamada AJAX para obtener el precio de compra de la chatarra seleccionada
  $.ajax({
    type: "GET",
    url: `http://localhost/api_metrecicla/controllers/chatarras.php`,
    data: { id: idChatarra }, // Concatenamos el ID en la URL
    dataType: "json",
    success: function (response) {
      if (response.codigo === 200 && response.data.resultado) {
        // Extraer el precio de la respuesta
        var precioCompra = response.data.resultado.precio;

        // Asignar el precio al campo de entrada
        $("#preciocompra").val(precioCompra);
      } else {
        console.warn(
          "No se encontró información para la chatarra seleccionada."
        );
        $("#preciocompra").val(""); // Limpiar el campo si no hay datos
      }
    },
    error: function (error) {
      console.error("Error al obtener el precio de compra:", error);
    },
  });
}
function getPrecioVenta(idPrecioLocal) {
  if (!idPrecioLocal) {
    console.warn("No se ha seleccionado una chatarra válida.");
    return;
  }

  $.ajax({
    type: "GET",
    url: `http://localhost/api_metrecicla/controllers/preciolocal.php`,
    data: { id: idPrecioLocal }, // Usamos el id_preciolocal como parámetro
    dataType: "json",
    success: function (response) {
      if (response.codigo === 200 && response.data.resultado) {
        var precioVenta = response.data.resultado.precioventa;

        // Asignar el precio de venta al campo correspondiente
        $("#precioventa").val(precioVenta);
      } else {
        console.warn(
          "No se encontró precio de venta para la chatarra seleccionada."
        );
        $("#precioventa").val(""); // Limpiar el campo si no hay datos
      }
    },
    error: function (error) {
      console.error("Error al obtener el precio de venta:", error);
    },
  });
}

//---------------------------------

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Formato de 2 dígitos para la hora
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Formato de 2 dígitos para los minutos
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Formato de 2 dígitos para los segundos
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

function addDetalleVenta() {
  // Obtener los valores del formulario
  var idventa = $("#idticketventa").val();
  var idpreciolocal = $("#idpreciolocal").val();
  var cantidad = parseFloat($("#cantidad").val());
  var precio = $("#precioventa").val();
  var subtotal = cantidad * precio;
  console.log("idpreciolocal: ", idpreciolocal);
  var dataToSend = {
    id_venta: idventa,
    id_preciolocal: idpreciolocal,
    cantidad: cantidad,
    subtotal: subtotal,
  };

  // Si el ID de la venta está vacío, crear una nueva venta
  if (!idventa) {
    addVenta(function (newIdVenta) {
      // Asignar el nuevo ID de venta al campo oculto
      $("#idticketventa").val(newIdVenta);

      // Volver a ejecutar addDetalleVenta para agregar el detalle
      addDetalleVenta();
    });
    return; // Salir para esperar que se cree la venta
  }

  // Enviar datos del detalle al servidor
  $.ajax({
    type: "POST",
    url: "http://localhost/api_metrecicla/controllers/detallesventa.php",
    data: JSON.stringify(dataToSend),
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      if (response.codigo === 200) {
        // Actualizar la tabla de detalles
        loadDetallesVenta(idventa);

        // Limpiar los campos del formulario
        $("#cantidad").val("");
        $("#preciocompra").val("");
        $("#precioventa").val("");

        // Mostrar mensaje de éxito
        showBootstrapAlert(
          "Detalle de venta añadido correctamente.",
          "success"
        );
      } else {
        // Mostrar mensaje de error
        console.error("Error al añadir detalle de venta:", response);
        showBootstrapAlert("Error al añadir detalle de venta.", "danger");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la llamada AJAX:", status, error);
      showBootstrapAlert("Error en la llamada AJAX.", "danger");
    },
  });
}

function addVenta(callback) {
  const idempleado = $("#idempleado").val();
  const idsucursal = document.getElementById("idSucursal").value;
  const fecha = $("#fecha").val();

  const fechaFormatted = formatDateToYMDWithTime(fecha);

  // Enviar datos al servidor
  $.ajax({
    type: "POST",
    url: "http://localhost/api_metrecicla/controllers/ventas.php",
    data: JSON.stringify({
      id_sucursal: idsucursal,
      id_empleado: idempleado,
      fecha: fechaFormatted, // Fecha con hora actual incluida
      total: 0, // Inicialmente en 0, se actualizará con los detalles
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      if (response.codigo === 200 && response.data.resultado.id_venta) {
        // Asignar el nuevo ID de venta al campo oculto
        $("#idticketventa").val(response.data.resultado.id_venta);
        var idventa = response.data.resultado.id_venta;
        $("#idticketventa").val(idventa);

        // Ejecutar el callback con el ID de la venta recién creada
        callback(response.data.resultado.id_venta);
      } else {
        console.error("Error al crear la venta:", response);
        showBootstrapAlert("Error al crear la venta.", "danger");
      }
    },
    error: function (xhr, status, error) {
      console.error(
        "Error en la llamada AJAX para crear la venta:",
        status,
        error
      );
      showBootstrapAlert(
        "Error en la llamada AJAX para crear la venta.",
        "danger"
      );
    },
  });
}

///////-----------CARGAR DATOS EN LA TABLA
function loadDetallesVenta(idVenta) {
  $.ajax({
    url: "http://localhost/api_metrecicla/controllers/detallesventa.php",
    type: "GET",
    data: { id: idVenta },
    dataType: "json",
    success: function (response) {
      let tbody = $("#detallesVentaBody");
      tbody.empty(); // Limpiar contenido previo

      // Verificamos si hay datos en la respuesta
      if (response.codigo === 200 && response.data && response.data.resultado) {
        let detalles = response.data.resultado.detalles;
        //let total = response.data.resultado.total;

        if (detalles.length > 0) {
          detalles.forEach((item) => {
            let row = `<tr>
                            <td>${item.id_detalle_venta}</td>
                            <td>${item.material}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.precioventa}</td>
                            <td>${item.subtotal}</td>
                            <td>
                                <button class="btn btn-warning btn-edit" data-id="${item.id_detalle_venta}">✏️ Editar</button>
                                <button class="btn btn-danger btn-delete" data-id="${item.id_detalle_venta}">🗑️ Eliminar</button>
                            </td>
                        </tr>`;
            tbody.append(row);
          });

          // Formatear y mostrar el total

          // Actualizar el total
          var total = parseFloat(response.data.resultado.total) || 0; // Asegurarse de que sea numérico
          $("#total").val(total);
          $("#total").show();

          function formatearConSeparadores(numero) {
            return numero.toLocaleString("es-ES");
          }

          $("#totalContainer").text(
            "El total es: " + formatearConSeparadores(total)
          );
        } else {
          tbody.append(
            '<tr><td colspan="6" class="text-center">No hay detalles de venta</td></tr>'
          );
          $("#total").val(0);
          $("#totalContainer").html(`<h4>Total: 0</h4>`);
        }
      } else {
        console.error("Error en la respuesta:", response);
      }
    },
    error: function (error) {
      console.error("Error al cargar detalles:", error);
    },
  });
}

/////bootstrap
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

///-------------EDITAR!!!!
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

$(document).on("click", "#saveEditBtn", function () {
  var detalleId = $("#modalDetalleId").val();
  var nuevaCantidad = parseInt($("#modalCantidad").val());

  if (!nuevaCantidad || nuevaCantidad <= 0) {
    showBootstrapAlert("Por favor, ingrese una cantidad válida.", "warning");
    return;
  }

  $.ajax({
    type: "PUT",
    url: "http://localhost/api_metrecicla/controllers/detallesventa.php",
    data: JSON.stringify({
      id_detalle_venta: detalleId,
      cantidad: nuevaCantidad,
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      if (response.codigo === 200) {
        $("#editModal").modal("hide");
        var idticket = $("#idticketventa").val();
        loadDetallesVenta(idticket); // Recargar la tabla
        showBootstrapAlert("Cantidad actualizada con éxito.", "success");
      } else {
        console.error("Error al actualizar la cantidad:", response);
        showBootstrapAlert("Error al actualizar la cantidad.", "danger");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la llamada AJAX:", xhr.responseText);
      showBootstrapAlert(
        "Error en la llamada AJAX: " + xhr.responseText,
        "danger"
      );
    },
  });
});

////----ELIMINAR
//ELIMINAR
// Manejador de eventos para el botón "Eliminar"
$(document).on("click", ".btn-delete", function () {
  var detalleId = $(this).data("id");

  // Configura el manejador de clic para el botón "Eliminar" en el modal
  $("#confirmDeleteBtn")
    .unbind()
    .on("click", function () {
      // Llama a la función para eliminar el detalle de compra
      deleteDetalleVenta(detalleId);

      // Cierra el modal después de hacer clic en "Eliminar"
      $("#confirmDeleteModal").modal("hide");
    });

  // Abre el modal de confirmación
  $("#confirmDeleteModal").modal("show");
});

// Función para eliminar el detalle de compra
function deleteDetalleVenta(detalleId) {
  console.log("id que llega para eliminar: ", detalleId);
  $.ajax({
    type: "DELETE",
    url: `http://localhost/api_metrecicla/controllers/detallesventa.php?id=${detalleId}`,
    dataType: "json",
    success: function (response) {
      if (response.codigo === 200) {
        // Recargar la tabla
        var idticket = $("#idticketventa").val();
        loadDetallesVenta(idticket);

        // Mostrar mensaje de éxito
        showBootstrapAlert(
          "Detalle de compra eliminado correctamente.",
          "success"
        );
      } else {
        console.error("Error al eliminar el detalle:", response);
        showBootstrapAlert("Error al eliminar el detalle.", "danger");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la llamada AJAX:", status, error);
      showBootstrapAlert(
        "Error en la llamada AJAX al eliminar el detalle.",
        "danger"
      );
    },
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


$(document).ready(function () {
    // Evento cuando se presiona una tecla en el campo cantidad
    $("#cantidad").keyup(function (e) {
        // Verificar si la tecla presionada es "Enter" (código 13)
        if (e.which === 13) {
            // Realizar la insercion en la base de datos
            addDetalleVenta();
        }
    });
});



function cerrarModalEdit() {
    $("#editModal").modal("hide");
    $("#confirmDeleteModal").modal("hide");
  }