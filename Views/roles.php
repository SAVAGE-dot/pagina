<?php
  session_start();
  if (isset($_SESSION["id"])) {
  } else {
    header('Location: login.php');
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roles</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</head>
<body>
    <h1 style="text-align: center; text-decoration: underline;">ROLES</h1>
    <div class="d-flex justify-content-center">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="../Routes/usuario/cerrarsesion"><b>CERRAR SESION</b></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../Views/indice.html"><b>COD DESCUENTOS</b></a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <b>Otros</b>
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="../Views/marcas.php">Marcas</a></li>
                  <li><a class="dropdown-item" href="../Views/index.php">Gift Cards</a></li>
                  <li><a class="dropdown-item" href="../Views/empresas.php">Tiendas</a></li> 
                  <li><a class="dropdown-item" href="../Views/roles.php">Roles</a></li>
                  <li><a class="dropdown-item" href="../Views/login.php">login</a></li>
                  <li><a class="dropdown-item" href="../Views/valesdeconsumo.php">Vales de Consumo</a></li>
                </ul>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="../Routes/usuario/cerrarsesion"><b>Bienvenido <?php echo $_SESSION["nombre"]; ?>!</b></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
        <form>
        <div class="row g-3">
            <div class="col-auto">
                <label for="rol"><b>Rol</b></label>
                <input type="text" class="form-control" id="rol">
            </div>    
        </div>
        <br>
        <div  class="d-flex justify-content-start gap-2">
            <button type="button" class="btn btn-outline-primary" id="registrar_rol"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
            </svg></button>
            <button type="button" class="btn btn-outline-danger edicion" id="edicion" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg></button>
        </div>
        </form>
        <br>
        <table class="table table-hover table-bordered border-dark">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Rol</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla-cuerpo">
                <tr>
                    <td>
                        <button type="button" class="btn btn-outline-warning">EDITAR</button>
                        <button type="button" class="btn btn-danger" id="eliminar" style="display: none;">ELIMINAR</button>
                        <button type="button" class="btn btn-success" id="activar" style="display: none;">ACTIVAR</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
<script src="../Js/scriptrol.js"></script>
</html>

