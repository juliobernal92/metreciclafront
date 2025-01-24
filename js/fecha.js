//FECHA
// Obtén la fecha actual
var fechaActual = new Date();

// Formatea la fecha como dd/mm/yyyy
var formatoFecha =
  ("0" + fechaActual.getDate()).slice(-2) +
  "/" +
  ("0" + (fechaActual.getMonth() + 1)).slice(-2) +
  "/" +
  fechaActual.getFullYear();

// Establece la fecha actual en el campo de texto
$("#fecha").val(formatoFecha);

// Inicializa el datepicker
$("#fecha").datepicker({
  format: "dd/mm/yyyy", // Ajusta el formato de fecha según tus preferencias
  autoclose: true,
  todayHighlight: true,
  container: "#fecha-container",
  language: "es", // Establece el idioma en español
  weekStart: 1, // Inicia la semana en lunes
  todayBtn: true, // Muestra un botón para seleccionar la fecha actual
  clearBtn: true, // Muestra un botón para borrar la fecha seleccionada
});

// Abre el datepicker al hacer clic en el ícono
$("#datepicker-icon").on("click", function () {
  $("#fecha").datepicker("show");
});

// Actualiza el campo de texto cuando se selecciona una fecha
$("#fecha").on("changeDate", function (e) {
  $(this).val(e.format());
});

//FIN FECHA
