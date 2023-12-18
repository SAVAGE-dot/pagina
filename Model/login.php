<?php
    class LoginModel{ 
        private $conexion;

        public function __construct() {
            $cn=new conexion();
            $this->conexion=$cn->getConnection();
        }

        public function validacion($datos_vista){
            try {
                $usuario = $datos_vista["alias"];
                $contraseña = sha1($datos_vista["password"]);

                $sql="SELECT * from usuario where alias = ? and contraseña = ?";
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar->bindParam(1,$usuario,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$contraseña,PDO::PARAM_STR);
                $ejecutar->execute();
                $dato=$ejecutar->fetchAll();

                if(count($dato)>0){
                session_start();
                $_SESSION['alias'] = $dato[0]["alias"];
                $_SESSION['id'] = $dato[0]["id"];
                $_SESSION["nombre"] = $dato[0]["nombre"];
                $_SESSION["apellido"] = $dato[0]["apellidos"];
                $_SESSION["contraseña"] = $dato[0]["contraseña"];
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success" => true,
                    "message" => "Credenciales Correctas"
                ));                    
                }else {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(array(
                        "success" => false,
                        "message" => "Credenciales Incorrectas"
                    ));   
                }
            } catch (Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success" => false,
                    "message" => $e
                ));
            }
        }

        public function cerrar(){

        }
        
    }
?>