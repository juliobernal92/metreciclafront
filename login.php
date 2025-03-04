<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Met Recicla - Inicio de Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/stylelogin.css">
</head>
<body>
    <div class="container custom-container mt-4">
        <img src="img/logo.png" class="img-fluid" alt="Logo">
        <h2>Met Recicla</h2>
        <hr>
        <div id="error" class="alert alert-danger d-none"></div>
        <form id="loginForm">
            <div class="mb-3">
                <label for="cedula" class="form-label">Cédula</label>
                <input type="number" id="cedula" name="cedula" placeholder="Ingrese su número de cédula sin puntos." class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Iniciar Sesión</button>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/login.js">    
    
    </script>
    <script src="js/config.js"></script>
</body>
</html>
