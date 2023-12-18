<?php
  session_start();
  if (isset($_SESSION["id"])) {
  } else {
    header('Location: login.php');
  }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiendas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <h1 style="text-align: center;">Gift Cards</h1>
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
                  <li><a class="dropdown-item" href="../Views/usuarios.php">Usuarios</a></li>
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
        <form class="row g-3">
            <div class="col-md-3" style="display: none;">
                <label for="exampleInputPassword1" class="form-label"></label>
                <input type="text" class="form-control" id="codigo" placeholder="Codigo">
            </div>
            <div class="col-md-3" >
                <label for="exampleInputPassword1" class="form-label"></label>
                <input type="text" class="form-control" id="codigo_compuesto" placeholder="Codigo Compuesto">
            </div>
            <div class="col-md-3" style="display: none;">
                <label for="exampleInputPassword1" class="form-label"></label>
                <input type="text" class="form-control" id="serie" placeholder="Serie">
            </div>
            <div class="col-md-3" style="display: none;">
                <label for="exampleInputPassword1" class="form-label"></label>
                <input type="text" class="form-control" id="correlativo" placeholder="Correlativo">
            </div>
            <div class="col-md-2">
                <label for="exampleInputPassword1" class="form-label"></label>
                <input type="number" class="form-control" id="monto" placeholder="Monto">
                <br>
            </div>
        <div class="row">
            <label for="tienda_id" style="text-decoration-line: underline;"><b>Selector de Tienda</b></label>
            <div class="col-md-6">
            <select class="form-select form-select col-md-6" id="tienda_id">tienda_id</select>
            </div>
            <div>
                <br>
                <label for="estado-0" style="text-decoration-line: underline;"><b>Tipo de Estado</b></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="estado" id="estado-0" value="0" checked>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Por Vender
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="estado" id="estado-1" value="1">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Por Consumir
                    </label>
                    </div>
            </div>
        </div>
       </form>
       <div class="d-grid gap-2"></div>
       <br>
        <button type="submit" class="btn btn-outline-primary" id="registrar_boton">Submit</button>
        <button type="button" class="btn btn-outline-warning" id="enviar_edicion">Editar</button>
        </div>
        <br>
        <div class="container">
       <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tienda_ID</th>
            <th scope="col">Nombre_Tienda</th>
            <th scope="col">codigo</th>
            <th scope="col">CodigoCompuesto</th>
            <th scope="col">Serie</th>
            <th scope="col">Correlativo</th>
            <th scope="col">Monto</th>
            <th scope="col" id="estado">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody id="cuerpo-tabla">
          <tr>
            <td>
                <button type="button" class="btn btn-warning">EDITAR</button>
                <button type="button" class="btn btn-danger" id="eliminar">ELIMINAR</button>
                <button type="button" class="btn btn-success" id="activar">ACTIVAR</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</body>
<script src="../Js/script.js"></script>
</html>