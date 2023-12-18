<?php

    class RolesModel{
        private $conexion;


        public function __construct() {
            $cn = new conexion();
            $this->conexion = $cn->getConnection();
        }

        public function register($datos_vista){
        try {
            $rol = $datos_vista["rol"];

            $sql="INSERT INTO roles (id, descripcion, estado) SELECT COALESCE(MAX(id), 0) + 1, ?, 1 FROM roles;";
            $ejecutar = $this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $ejecutar->bindParam(1,$rol,PDO::PARAM_STR);
            $ejecutar->execute();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                "success" => true,
                "message" => "Exitoso"
            ));
        } catch ( Exception $e) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                "success" => false,
                "message"=> $e
            ));
        }
        }

        public function defuseview($id){
            try {
                $sql = "UPDATE roles set estado = 0 where id = ?;";
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
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
                "message"=>"Erro al actualizar datos"
                ));  
            }
        }

        public function acitvarview($id){
            try {
                $sql = "UPDATE roles set estado = 1 where id = ?;";
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
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
                "message"=>"Erro al actualizar datos"
                ));  
            }
        }

        public function editarvista($data){
            $descripcion = $data["rol"];
            $id = $data["id"];
            try {
                $sql = 'UPDATE roles set descripcion = ? where id = ?;';
                $ejecutar = $this->conexion->prepare($sql);
                $ejecutar->bindParam(1,$descripcion,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$id,PDO::PARAM_INT);
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
                "message"=>"Error al editar roles",
                "data"=>$e
                ));   
            }
        }

        public function getRoles(){
            try{
                $sql = "SELECT R.id, R.descripcion, R.estado  
                        from roles as R";
                $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->execute();
                $array = array();
                foreach ($ejecutar as $Key) {
                    $array[]=array(
                        "id"=> $Key["id"],
                        "rol"=> $Key["descripcion"],
                        "estado"=> $Key["estado"]
                    );
                }
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($array);
            }catch (Exception $e) {
                return;
            }
            
        }
    }


?>