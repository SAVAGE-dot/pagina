<?php
    class UsuariosModel{
        private $conexion;

        public function __construct(){
            $cn=new conexion();
            $this->conexion=$cn->getConnection();
        }

        public function register($datos_vista){
            try {
                $nombre = $datos_vista["nombre"];
                $apellidos = $datos_vista["apellido"];
                $alias = $datos_vista["alias"];
                $contraseña = sha1($datos_vista["contraseña"]);
                $idRol = $datos_vista["idRol"];

                $sql="INSERT into usuario(nombre, apellidos, alias, contraseña, estado, idRoles) values (?, ?, ?, ?, 1, ?)";
                $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->bindParam(1,$nombre,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$apellidos,PDO::PARAM_STR);
                $ejecutar->bindParam(3,$alias,PDO::PARAM_STR);
                $ejecutar->bindParam(4,$contraseña,PDO::PARAM_STR);
                $ejecutar->bindParam(5,$idRol,PDO::PARAM_INT);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success" => true,
                    "message" => "Exitoso"
                ));
            } catch (Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success" => false,
                    "message" => $e
                ));
            }
        }

        public function defuseview($id){
            try {
                $sql = "UPDATE usuario set estado = 0 where id = ?";
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
                $ejecutar -> execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>true,
                 "message"=>"Actualizacion exitosa"
                ));
            } catch ( Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                "success"=>false,
                "message"=>"Erro al actualizar datos"
                )); 
            }
        }

        public function activarview($id){
            try {
                $sql = "UPDATE usuario set estado = 1 where id = ?";
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
                $ejecutar -> execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>true,
                 "message"=>"Actualizacion exitosa"
                ));
            } catch ( Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                "success"=>false,
                "message"=>"Error al actualizar datos"
                )); 
            }
        }



        public function editarview($data){
                $nombre = $data["nombre"];
                $apellido = $data["apellido"];
                $alias = $data["alias"];
                $contraseña = sha1($data["contraseña"]);
                $idRol = $data["idRoles"];
                $id = $data["id"];

            try {
                $sql= 'UPDATE usuario set nombre = ?, apellidos = ?, alias = ?, contraseña = ?, idRoles = ? where id = ?';
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar->bindParam(1,$nombre,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$apellido,PDO::PARAM_STR);
                $ejecutar->bindParam(3,$alias,PDO::PARAM_STR);
                $ejecutar->bindParam(4,$contraseña,PDO::PARAM_STR);
                $ejecutar->bindParam(5,$idRol,PDO::PARAM_INT);
                $ejecutar->bindParam(6,$id,PDO::PARAM_INT);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>true,
                 "message"=>"Actualizacion exitosa"
                ));
            } catch ( Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>false,
                 "message"=>"Error al editar datos",
                 "data"=>$e
                ));
            }
        }


        public function getUsu(){
            try {
                $sql= "SELECT U.id, U.nombre, U.apellidos, U.alias, U.contraseña, U.estado,U.idRoles, R.descripcion
                from usuario as U
                inner join roles as R on R.id = U.idRoles";
                $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->execute();
                $array=array();
                foreach ($ejecutar as $key) {
                    $array[]=array(
                        "id" => $key["id"],
                        "nombre"=> $key["nombre"],
                        "apellidos"=> $key["apellidos"],
                        "alias"=> $key["alias"],
                        "contraseña"=> $key["contraseña"],
                        "idRoles"=> $key["idRoles"],
                        "descripcion"=> $key["descripcion"],
                        "estado"=> $key["estado"]
                    );
                }
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($array);
            } catch ( Exception $e ) {
                return;
            }
        }
    }



?>
