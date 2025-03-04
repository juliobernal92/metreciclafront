function addTotal() {
  var id_compra = $("#idticket").val();
  var total = $("#total").val();

  $.ajax({
    type: "PUT",
    url: apiUrl + "/controllers/compras.php",
    data: JSON.stringify({
      id_compra: id_compra,
      total: total,
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (responseData) {
      generarTicket();
      reloadPag();
    },
    error: function (xhr, status, error) {
      console.error("Error en la llamada AJAX:", status, error);
    },
  });
}

function reloadPag() {
  location.reload();
}

function generarTicket() {
  /*
    const fecha = obtenerFechaHoraActual();
    const pdf = new window.jspdf.jsPDF({
        unit: "mm",
        format: "a4",
    });
    const proveedor = $("#nombre").val();
    const empleado = $("#bienvenidaContainer").text().replace("Bienvenido ", "");

    const nombreSucursal = $("#nombreSucursal").val() || 'N/A';
    const direccionSucursal = $("#direccionSucursal").val() || 'N/A';
    const telefonoSucursal = $("#telefonoSucursal").val() || 'N/A';

    const logo = new Image();
    logo.src = "../img/logo.png";

    const logoWidth = 30;
    const logoX = (pdf.internal.pageSize.getWidth() - logoWidth) / 2;

    pdf.addImage(logo, "PNG", logoX, 10, logoWidth, 20);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");

    pdf.text("MET RECICLA", pdf.internal.pageSize.getWidth() / 2, 40, null, "center");
    pdf.text("----------COMPRA------------", pdf.internal.pageSize.getWidth() / 2, 45, null, "center");

    pdf.text(`Sucursal: ${nombreSucursal}`, 10, 50);
    pdf.text(`Dirección: ${direccionSucursal}`, 10, 55);
    pdf.text(`Teléfono: ${telefonoSucursal}`, 10, 60);
    pdf.text(`Fecha: ${fecha}`, 10, 65);
    pdf.text(`Encargado: ${empleado}`, 10, 75);

    pdf.setFillColor(0, 0, 0);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");

    pdf.rect(10, 80, pdf.internal.pageSize.getWidth() - 20, 10, "F");

    pdf.setFontSize(8);

    pdf.text("Descripción", 15, 85);
    pdf.text("Cantidad", 60, 85);
    pdf.text("Precio", 105, 85);
    pdf.text("Subtotal", 150, 85);

    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "normal");

    let y = 95;

    $("#tablaDetallesCompraContainer table tbody tr").each(function () {
        const cantidad = $(this).find("td:eq(2)").text();
        const descripcion = $(this).find("td:eq(1)").text();
        const precioUnitario = parseFloat($(this).find("td:eq(3)").text().replace(/,/g, ""));
        const subtotal = parseFloat($(this).find("td:eq(4)").text().replace(/,/g, ""));

        pdf.text(`${descripcion}`, 15, y);
        pdf.text(`${cantidad}`, 60, y);
        pdf.text(`${precioUnitario.toLocaleString()}`, 105, y);
        pdf.text(`${subtotal.toLocaleString()}`, 150, y);

        y += 8;
    });

    pdf.setFontSize(10);

    const total = parseFloat($("#total").val().replace(/,/g, ""));
    pdf.text("TOTAL:", 85, y + 10);
    pdf.text(`${total.toLocaleString()}`, 135, y + 10);
    const idticket = $("#idticket").val();

    const nombreArchivo = `ticket_${proveedor}_${idticket}.pdf`;

    pdf.save(nombreArchivo);
    

    //imprimirTicket(); // Envía el contenido TXT al servidor para impresión
    //descargarTicketTXT();
    */
  generarTicketPDF();
}

function obtenerFechaActual() {
  const now = new Date();
  const dia = now.getDate().toString().padStart(2, "0");
  const mes = (now.getMonth() + 1).toString().padStart(2, "0");
  const año = now.getFullYear();
  return `${dia}-${mes}-${año}`;
}

function obtenerFechaHoraActual() {
  const ahora = new Date();
  const dia = ahora.getDate().toString().padStart(2, "0");
  const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
  const año = ahora.getFullYear();
  const horas = ahora.getHours().toString().padStart(2, "0");
  const minutos = ahora.getMinutes().toString().padStart(2, "0");
  const segundos = ahora.getSeconds().toString().padStart(2, "0");

  return `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;
}

function cerrarModalEdit() {
  $("#editModal").modal("hide");
}

function obtenerCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
  return null;
}

function generarTicketTXT() {
  const nombreSucursal = localStorage.getItem("nombre_sucursal") || "N/A";
  const direccionSucursal = localStorage.getItem("direccion_sucursal") || "N/A";
  const telefonoSucursal = localStorage.getItem("telefono_sucursal") || "N/A";
  const proveedor = document.getElementById("nombre").value || "N/A";
  const empleado =
    document
      .getElementById("bienvenidaContainer")
      .textContent.replace("Bienvenido ", "") || "N/A";
  const fecha = obtenerFechaHoraActual();

  let contenido = "";
  contenido += "----MET RECICLA----\n";
  contenido += "COMPRA\n";
  contenido += `Sucursal: ${nombreSucursal}\n`;
  contenido += `Dirección: ${direccionSucursal}\n`;
  contenido += `Teléfono: ${telefonoSucursal}\n`;
  contenido += `Fecha: ${fecha}\n`;
  contenido += `Proveedor: ${proveedor}\n`;
  contenido += `Encargado: ${empleado}\n`;
  contenido += "-".repeat(32) + "\n";
  contenido += "CANT DESC       PRECIO    SUBT\n";
  contenido += "-".repeat(32) + "\n";

  const filas = document.querySelectorAll(
    "#tablaDetallesCompraContainer table tbody tr"
  );
  filas.forEach((fila) => {
    const descripcion = fila
      .querySelector("td:nth-child(2)")
      .textContent.trim()
      .slice(0, 10); // Limitar a 10 caracteres
    const cantidad = fila.querySelector("td:nth-child(3)").textContent.trim();
    const precio = fila.querySelector("td:nth-child(4)").textContent.trim();
    const subtotal = fila.querySelector("td:nth-child(5)").textContent.trim();

    contenido += `${cantidad.padEnd(5)}${descripcion.padEnd(
      10
    )}${precio.padStart(8)}${subtotal.padStart(8)}\n`;
  });

  contenido += "-".repeat(32) + "\n";
  const total = document.getElementById("total").value || "0";
  contenido += `TOTAL: ${total.padStart(25)}\n`;

  return contenido;
}

function generarTicketPDF() {
  const filas = document.querySelectorAll(
    "#tablaDetallesCompraContainer table tbody tr"
  );
  const alturaBase = 80; // Altura base mínima
  const alturaPorFila = 5; // Cada fila ocupa aproximadamente 5 mm
  const alturaTotal = alturaBase + filas.length * alturaPorFila;

  const pdf = new window.jspdf.jsPDF({
    unit: "mm",
    format: [80, alturaTotal], // Ajustar tamaño dinámicamente
  });

  const nombreSucursal = localStorage.getItem("nombre_sucursal") || "N/A";
  const direccionSucursal = localStorage.getItem("direccion_sucursal") || "N/A";
  const telefonoSucursal = localStorage.getItem("telefono_sucursal") || "N/A";
  const proveedor = document.getElementById("nombre").value || "N/A";
  const empleado =
    document
      .getElementById("bienvenidaContainer")
      .textContent.replace("Bienvenido ", "") || "N/A";
  const fecha = obtenerFechaHoraActual();

  // Configurar fuente monoespaciada
  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);

  const margenIzquierdo = 1; // Reducir margen izquierdo

  // Encabezado
  pdf.text("---- MET RECICLA ----", 20, 10, { align: "center" });
  pdf.setFontSize(6);
  pdf.text("COMPRA", 20, 13, { align: "center" });

  // Detalles del encabezado
  pdf.setFontSize(6);
  pdf.text(`Sucursal: ${nombreSucursal}`, margenIzquierdo, 18);
  pdf.text(`Dirección: ${direccionSucursal}`, margenIzquierdo, 23);
  pdf.text(`Teléfono: ${telefonoSucursal}`, margenIzquierdo, 28);
  pdf.text(`Fecha: ${fecha}`, margenIzquierdo, 33);
  pdf.text(`Proveedor: ${proveedor}`, margenIzquierdo, 38);

  // Encabezados de la tabla
  let y = 43;
  pdf.text("CANT  DESC     PRECIO     SUBT", margenIzquierdo, y); // Reducido el espacio entre DESC y PRECIO
  pdf.text("-----------------------------------", margenIzquierdo, y + 3); // Línea separadora
  y += 8;

  filas.forEach((fila) => {
    const descripcion = fila
      .querySelector("td:nth-child(2)")
      .textContent.trim()
      .slice(0, 12)
      .padEnd(8); // Limitar a 12 caracteres
    const cantidad = fila
      .querySelector("td:nth-child(3)")
      .textContent.trim()
      .padEnd(5); // 5 espacios
    const precio = parseFloat(
      fila.querySelector("td:nth-child(4)").textContent.trim().replace(/,/g, "")
    )
      .toLocaleString()
      .padStart(8); // Reservar espacio para montos grandes
    const subtotal = parseFloat(
      fila.querySelector("td:nth-child(5)").textContent.trim().replace(/,/g, "")
    )
      .toLocaleString()
      .padStart(10); // Reservar espacio para montos grandes

    const linea = `${cantidad}${descripcion}${precio}${subtotal}`;
    pdf.text(linea, margenIzquierdo, y);
    y += 5;
  });

  // Línea de total
  pdf.text("-----------------------------------", margenIzquierdo, y); // Línea separadora final
  y += 5;
  const total = parseFloat(
    document.getElementById("total").value || "0"
  ).toLocaleString(); // Formatear con separadores de miles
  pdf.setFontSize(8);
  pdf.text(`TOTAL: ${total.padStart(15)}`, margenIzquierdo, y);

  // Descargar el PDF
  const idCompra = document.getElementById("idticket").value || "sin_id";
  const nombreArchivo = `ticket_${idCompra}.pdf`;
  pdf.save(nombreArchivo);
}

function descargarTicketTXT() {
  // Obtener el ID de la compra desde el elemento HTML
  var id_compra = $("#idticket").val();

  // Generar el contenido del ticket en formato TXT
  const contenido = generarTicketTXT();

  // Crear un archivo blob a partir del contenido
  const blob = new Blob([contenido], { type: "text/plain" });

  // Crear una URL para el archivo blob
  const url = URL.createObjectURL(blob);

  // Crear un enlace temporal para descargar el archivo
  const a = document.createElement("a");
  a.href = url;

  // Establecer el nombre del archivo con el ID de compra
  a.download = `ticket_${id_compra}.txt`; // Nombre dinámico del archivo
  document.body.appendChild(a);

  // Simular un clic en el enlace para iniciar la descarga
  a.click();

  // Eliminar el enlace temporal
  document.body.removeChild(a);

  // Liberar la URL del archivo blob
  URL.revokeObjectURL(url);
}
