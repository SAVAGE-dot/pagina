<?php
  session_start();
  if (isset($_SESSION["id"])) {
  } else {
    header('Location: login.php');
  }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codigos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</head>
<body>
    <h1 style="text-align: center;">CODIGOS DE DESCUENTOS</h1>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
      <div class="container">
        <form class="row g-3">
            <div class="col-md-4">
                <label for="" class="form-label"></label>
                <input type="text" class="form-control" id="codigo" placeholder="Codigo" >
            </div>
            <div class="col-md-4">
                <label for="" class="form-label"></label>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre de la Campaña">
            </div>
            <div class="col-md-4">
                <label for="" class="form-label"></label>
                <input type="text" class="form-control" id="paquete_id" placeholder="ID del Paquete">
            </div>
            <div class="col-md-3">
                <label for="" class="form-label"></label>
                <input type="number" class="form-control" id="monto" placeholder="Monto">
            </div>
       </form>
       <div class="d-flex justify-content-start gap-2">
        <button type="submit" class="btn btn-outline-primary" id="registrar">Enviar</button>
        <button type="button" class="btn btn-outline-warning edicion" id="edicion" style="display: none;">Actualizar</button>
        </div>
        <br>
        <div class="container">
       <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Codigo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Monto</th>
                <th scope="col" id="estado">Estado</th>
                <th scope="col">Paquete ID</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody id="tabla-cuerpo">
          <tr>
            <td>
                <button type="button" class="btn btn-outline-warning">EDITAR</button>
                <button type="button" class="btn btn-danger" id="eliminar">ELIMINAR</button>
                <button type="button" class="btn btn-success" id="activar">ACTIVAR</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</body>
<script src="../Js/scriptd_cod.js"></script>
</html>