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
    <title>Empresas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</head>
<body>
    <h1 style="text-align: center; text-decoration:underline;">Tiendas</h1>
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
            <div>
              <label for="empresa_id" style="text-decoration-line: underline;"><b>Selector de Empresa</b></label>
            <div class="col-md-4">
            <select class="form-select form-select col-md-4" id="empresa_id">tienda_id</select>
            </div>
            <div class="col-md-4">
              <label for="" class="form-label"></label>
              <input type="text" class="form-control" id="nombre" placeholder="Nombre" >
           </div>
            <div class="col-md-5">
                <label for="" class="form-label"></label>
                <input type="text" class="form-control" id="direccion" placeholder="Direccion">
            </div>
            <div class="col-md-4">
                <label for="" class="form-label"></label>
                <input type="text" class="form-control" id="codigo" placeholder="Codigo">
            </div>
       </form>
       <br>
       <div class="d-flex justify-content-start gap-2">
        <button type="button" class="btn btn-outline-primary" id="registrar">Enviar</button>
        <button type="button" class="btn btn-outline-danger edicion" id="edicion" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
        </svg></button>
        </div>
        <br>
        <div class="container">
       <table class="table table-bordered border-black">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">MarcaID</th>
                <th scope="col">StrNombre</th>
                <th scope="col">StrDireccion</th>
                <th scope="col">StrCodigo</th>
                <th scope="col" id="estado">Estado</th>
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
<script src="../Js/scriptem.js"></script>
</html>