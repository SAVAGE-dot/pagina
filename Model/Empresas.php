<?php
    class EmpresasModel {
        private $conexion;

        public function __construct(){
            $cn=new conexion();
            $this->conexion=$cn->getConnection();
        }

        public function register($datos_vista){
            try {
                $marca_id = $datos_vista["empresa_id"];
                $nombre = $datos_vista["nombre"];
                $direccion = $datos_vista["direccion"];
                $codigo = $datos_vista["codigo"];

                $sql="INSERT into tiendas (id,marca_id,StrNombre, StrDireccion,Strcodigo,estado) values ((select TOP 1 'TI-' + convert (varchar, convert (int,SUBSTRING(id, 4, 5)) +1) from tiendas order by id desc),?,?,?,?, 1)";
                $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->bindParam(1,$marca_id,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$nombre,PDO::PARAM_STR);
                $ejecutar->bindParam(3,$direccion,PDO::PARAM_STR);
                $ejecutar->bindParam(4,$codigo,PDO::PARAM_STR);
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

        public function editarmodel($data){
            $marca_id = $data["empresa_id"];
            $nombre = $data["nombre"];
            $direccion = $data["direccion"];
            $codigo = $data["codigo"];
            $id = $data["id"];
            try {
                $sql = 'UPDATE tiendas set marca_id = ?, StrNombre = ?, StrDireccion = ?, Strcodigo = ? where id =?';
                $ejecutar = $this ->conexion->prepare($sql);
                $ejecutar->bindParam(1,$marca_id,PDO::PARAM_STR);
                $ejecutar->bindParam(2,$nombre,PDO::PARAM_STR);
                $ejecutar->bindParam(3,$direccion,PDO::PARAM_STR);
                $ejecutar->bindParam(4,$codigo,PDO::PARAM_STR);
                $ejecutar->bindParam(5,$id,PDO::PARAM_STR);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                "success"=>true,
                "message"=>"Actualizacion exitosa"
                ));
            } catch (Exception $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success" => false,
                    "message" => $e
                ));
            }
        }

        public function defusemodel($id){
            try {
                $sql = "UPDATE tiendas SET estado = 0 WHERE id = ?;";
                $ejecutar = $this -> conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>true,
                 "message"=>"Actualizacion exitosa"
                ));
            } catch (PDOException $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                "success"=>false,
                "message"=>"Erro al actualizar datos"
                ));    
            }
        }

        public function activarmodel($id){
            try {
                $sql = "UPDATE tiendas SET estado = 1 WHERE id = ?;";
                $ejecutar = $this -> conexion->prepare($sql);
                $ejecutar -> bindParam(1, $id,PDO::PARAM_STR);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                 "success"=>true,
                 "message"=>"Actualizacion exitosa"
                ));
            } catch (PDOException $e) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                "success"=>false,
                "message"=>"Erro al actualizar datos"
                ));    
            }
        }

        public function getEmp(){
            try {
                $sql= "SELECT T.id, T.marca_id as marca, T.StrNombre as nombre, T.StrDireccion as direccion, T.Strcodigo as codigo, T.estado
                from tiendas as T";
                $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->execute();
                $array = array();
                foreach ($ejecutar as $key) {
                    $array[]=array(
                        "id"=> $key["id"],
                        "marca"=> $key["marca"],
                        "nombre"=> $key["nombre"],
                        "direccion"=> $key["direccion"],
                        "codigo"=> $key["codigo"],
                        "estado"=> $key["estado"]
                    );
                }
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($array);
                } catch (Exception $e) {
                  return;
                }
        }
    }

?>