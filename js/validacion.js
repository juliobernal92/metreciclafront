document.getElementById("idvendedor").addEventListener("keyup", function(event) {
    // Obtener el valor actual del campo
    var currentValue = event.target.value;

    // Filtrar los caracteres no numéricos y actualizar el valor del campo
    event.target.value = currentValue.replace(/[^0-9.]/g, '');
});

function limpiarCampoDecimal(event) {
    // Obtener el valor actual del campo
    var currentValue = event.target.value;

    // Permitir solo números y hasta un punto decimal
    var cleanedValue = currentValue.replace(/[^\d.]/g, '');

    // Eliminar puntos adicionales después del primer punto
    cleanedValue = cleanedValue.replace(/(\..*)\./g, '$1');

    // Actualizar el valor del campo
    event.target.value = cleanedValue;
}

document.getElementById("cantidad").addEventListener("input", limpiarCampoDecimal);
