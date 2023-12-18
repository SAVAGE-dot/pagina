<?php
    class MarcasModel{
        private $conexion;

        public function __construct(){
            $cn = new conexion();
            $this->conexion = $cn->getConnection();
        }


    public function register($datos_vista){
        try{
            $nombre = $datos_vista["nombre"];
            $direccion = $datos_vista["direccion"];
            $ruc = $datos_vista["ruc"];

            $sql="INSERT into marcas (id,StrNombre,StrDireccion,StrRUC, estado) values ((select TOP 1 'MAR-' + convert (varchar, convert (int,SUBSTRING(id, 5, 3)) +1) from marcas order by id desc), ?, ?, ?, 1)";
            $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $ejecutar->bindParam(1,$nombre,PDO::PARAM_STR);
            $ejecutar->bindParam(2,$direccion,PDO::PARAM_STR);
            $ejecutar->bindParam(3,$ruc,PDO::PARAM_STR);
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
        $nombre = $data["nombre"];
        $direccion = $data["direccion"];
        $ruc = $data["ruc"];
        $id = $data["id"];
        try{
            $sql = 'UPDATE marcas set StrNombre = ?, StrDireccion = ?, StrRUC = ? where id = ?';
            $ejecutar = $this->conexion->prepare($sql);         
            $ejecutar->bindParam(1,$nombre,PDO::PARAM_STR);
            $ejecutar->bindParam(2,$direccion,PDO::PARAM_STR);
            $ejecutar->bindParam(3,$ruc,PDO::PARAM_STR);            
            $ejecutar->bindParam(4,$id,PDO::PARAM_STR);
            $ejecutar->execute();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
            "success"=>true,
            "message"=>"Actualizacion exitosa"
            ));
        } catch(PDOException $e) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
            "success"=>false,
            "message"=>"Error al editar datos",
            "data"=>$e
            ));
        } 

    }

    public function getMar(){
        try{
            $sql="SELECT M.id, M.StrNombre as nombre, M.StrDireccion as direccion, M.StrRUC as ruc, M.estado
                  from marcas as M";
            $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $ejecutar ->execute();
            $array=array();
            foreach ($ejecutar as $key) {
                $array[]=array(
                    "Id"=> $key["id"],
                    "nombre"=> $key["nombre"],
                    "direccion"=> $key["direccion"],
                    "ruc"=> $key["ruc"],
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