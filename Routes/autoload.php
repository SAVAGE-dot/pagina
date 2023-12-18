<?php 

    include  __DIR__ .'/../Sql/conexion.php';

    include __DIR__ .'/../Model/Administrador.php';
    include __DIR__ .'/../Controller/AdminController.php';

    include __DIR__ .'/../Controller/CodigosController.php';
    include __DIR__ .'/../Model/Codigos.php';

    include __DIR__ .'/../Model/Marcas.php';
    include __DIR__ .'/../Controller/MarcasController.php';

    include __DIR__ .'/../Controller/EmpresasController.php';
    include __DIR__ .'/../Model/Empresas.php';

    include __DIR__ .'/../Controller/loginController.php';
    include __DIR__ .'/../Model/login.php';

    include __DIR__ .'/../Controller/RolesController.php';
    include __DIR__ .'/../Model/Roles.php';

    include __DIR__ .'/../Controller/UsuariosController.php';
    include __DIR__ .'/../Model/Usuarios.php';

    include __DIR__ .'/../Controller/ValeconsumoController.php';
    include __DIR__ .'/../Model/Valeconsumo.php';

    $mod_vc = new ValeconsumoController();
    $mod_usu = new UsuariosController();    
    $mod_rol = new RolesController();
    $mod_login = new LoginController(); 
    $mod_emp = new EmpresasController();
    $mod_cod = new CodigosController();
    $mod_mar = new MarcasController();
    $mod_admin=new AdminController();

 ?>
