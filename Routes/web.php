<?php 
 $ruta= $_SERVER['REQUEST_URI'];
 $request_uri = explode ("/", $ruta);
 $metodo=end($request_uri);
 require_once("autoload.php");

   if(strpos($ruta,"Admin")){
      if(strpos($ruta,"listar")){
         $mod_admin->listar();
      }else if(strpos($ruta,"create")){
         $mod_admin->create($_POST);
      }else if(strpos($ruta,"delete")){
         $mod_admin->delete($_POST["idProducto"]);
      }else if(strpos($ruta, "activar")){
         $mod_admin->activar($_POST["activacion"]);
      }else if(strpos($ruta,"editar")){
         $mod_admin->editar($_POST);
      }else if(strpos($ruta,"tiendas")){
         $mod_admin->getTiendas();
      }else if(strpos($ruta,"getcod")){
         $mod_admin->buscarporCod($_POST); 
      }
   }
   else if(strpos($ruta,"Cod")){
      if(strpos($ruta,"listar")){
         $mod_cod->listar();
      }else if(strpos($ruta,"create")){
         $mod_cod->create($_POST);
      }else if(strpos($ruta,"editar")){
         $mod_cod->editar($_POST);
      }
   }

 else if(strpos($ruta,"Mar")){
      if(strpos($ruta,"listar")){
         $mod_mar->listar();
      }else if(strpos($ruta,"create")){
         $mod_mar->create($_POST);
      }else if(strpos($ruta,"editar")){
         $mod_mar->editar($_POST);
      }
   }

  else if(strpos($ruta,"Emp")){
      if(strpos($ruta,"listar")){
         $mod_emp->listar();
      }else if(strpos($ruta,"create")){
         $mod_emp->create($_POST);
      }else if(strpos($ruta,"editar")){
         $mod_emp->editar($_POST);
      }else if(strpos($ruta,"defuse")){
         $mod_emp->defuse($_POST["id"]);
      }else if(strpos($ruta,"activate")){
         $mod_emp->activar($_POST["activacion"]);
      }
   }

 else  if(strpos($ruta,"usuario")){
      if(strpos($ruta,"iniciarsesion")){
         $mod_login->login($_POST);
      }else if(strpos($ruta,"cerrarsesion")){
         $mod_login->cerrar();
      }
   }

 else  if(strpos($ruta,"roles")){
      if(strpos($ruta,"listar")){
         $mod_rol->listar();
      }else if(strpos($ruta,"create")){
         $mod_rol->create($_POST);
      }else if(strpos($ruta,"editar")){
         $mod_rol->editar($_POST);
      }else if(strpos($ruta,"defuse")){
         $mod_rol->defuse($_POST["roldef"]);
      }else if(strpos($ruta,"activate")){
         $mod_rol->activar($_POST["rolact"]);
      }
   }

 else  if(strpos($ruta,"usu")){
      if(strpos($ruta,"listar")){
         $mod_usu->listar();
      }else if(strpos($ruta,"create")){
         $mod_usu->create($_POST);
      }else if(strpos($ruta,"editar")){
         $mod_usu->editar($_POST);
      }else if(strpos($ruta,"defuse")){
         $mod_usu->defuse($_POST["usudef"]);
      }else if(strpos($ruta,"activate")){
         $mod_usu->activar($_POST["usuact"]);
      }
  }

 else  if(strpos($ruta,"vc")){
      if(strpos($ruta, "listar")){
         $mod_vc->listar();
      }else if(strpos($ruta,"canal")){
         $mod_vc->getCanal();
      }else if(strpos($ruta,"update")){
         $mod_vc->editarCanales($_POST);
      }
   }
 
?>