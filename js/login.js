document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cedula = document.getElementById("cedula").value;
    const pass = document.getElementById("password").value;

    fetch("http://localhost/api_metrecicla/controllers/empleados.php", {
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
          // Mostrar mensaje de error
          const errorDiv = document.getElementById("error");
          errorDiv.style.display = "block";
          errorDiv.innerText = "Login failed: " + data.message;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
