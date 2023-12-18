<?php

    class CodigosModel{ 
        private $conexion;

        public function __construct() {
            $cn=new conexion();
            $this->conexion=$cn->getConnection();
        }

    public function register($datos_vista){
        try {
            $codigo = $datos_vista["codigo"];
            $nombre = $datos_vista["nombre"];
            $monto = $datos_vista["monto"];
            $paquete_id = $datos_vista["paquete_id"];

            $sql='INSERT into codigos (codigo, nombre, monto, estado, paquete_id) values (?, ?, ?,0, ?)';
            $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $ejecutar->bindParam(1,$codigo,PDO::PARAM_STR);
	        $ejecutar->bindParam(2,$nombre,PDO::PARAM_STR);
            $ejecutar->bindParam(3,$monto,PDO::PARAM_STR);
            $ejecutar->bindParam(4,$paquete_id,PDO::PARAM_STR);
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
        $codigo = $data["codigo"];
        $nombre = $data["nombre"];
        $paquete_id = $data["paquete_id"];        
        $monto = $data["monto"];
        $id = $data["id"];        
        try{
            $sql = 'UPDATE codigos set codigo = ?, nombre = ?,paquete_id = ?, monto = ?  where id = ?';
            $ejecutar = $this->conexion->prepare($sql);         
            $ejecutar->bindParam(1,$codigo,PDO::PARAM_STR);
            $ejecutar->bindParam(2,$nombre,PDO::PARAM_STR);
            $ejecutar->bindParam(3,$paquete_id,PDO::PARAM_STR);            
            $ejecutar->bindParam(4,$monto,PDO::PARAM_STR);
            $ejecutar->bindParam(5,$id,PDO::PARAM_INT);  
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


    public function getCod(){
        try {
          $sql="SELECT TOP 15 C.id, C.codigo, C.nombre, C.monto,C.estado, C.paquete_id
          FROM codigos as C
          order by id desc";
          $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
          $ejecutar->execute();
          $array=array();
          foreach ($ejecutar as $key ) {
             $array[]=array(
                "Id"=>$key["id"],
                "codigo"=>$key["codigo"],
                "nombre"=>$key["nombre"],
                "monto"=>$key["monto"], 
                "estado"=>$key["estado"] ,
                "paquete_id"=>$key["paquete_id"]                 
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