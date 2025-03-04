document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cedula = document.getElementById("cedula").value;
    const pass = document.getElementById("password").value;

    fetch(`${apiUrl}/controllers/empleados.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operacion: "LOGIN",
        cedula: cedula,
        pass: pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem(
            "nombre_sucursal",
            data.nombre_sucursal || "N/A"
          );
          localStorage.setItem(
            "direccion_sucursal",
            data.direccion_sucursal || "N/A"
          );
          localStorage.setItem(
            "telefono_sucursal",
            data.telefono_sucursal || "N/A"
          );
          
          window.location.href = "index.php";
        } else {
          // Mostrar mensaje de error en caso de credenciales incorrectas
          const errorDiv = document.getElementById("error");
          errorDiv.style.display = "block";  // Mostrar el div
          errorDiv.classList.remove("d-none");  // Asegurarse de que no esté oculto
          errorDiv.classList.add("alert-danger");  // Asegurar que tenga la clase de error de Bootstrap
          errorDiv.innerText = "Datos incorrectos. Verifique su cédula y contraseña.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
