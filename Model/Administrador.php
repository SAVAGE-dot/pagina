<?php
class AdministradorModel{
    private $conexion;
    public function __construct() {
        $cn=new conexion();
        $this->conexion=$cn->getConnection();
    }

    public function register($datos_vista){
      try {
        $idtienda=$datos_vista["tienda_id"];
        $codigo = $datos_vista["codigo"];
        $codigocompuesto = $datos_vista["codigo_compuesto"];
        $serie = $datos_vista["serie"];
        $correlativo = $datos_vista["correlativo"];
        $estado = $datos_vista["estado"];
        $monto = $datos_vista["monto"];

         $sql='INSERT INTO optupos_gifts (tienda_id,codigo,codigo_compuesto,serie,correlativo,estado,monto) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
	        $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	        $ejecutar->bindParam(1,$idtienda,PDO::PARAM_STR);
	        $ejecutar->bindParam(2,$codigo,PDO::PARAM_STR);
          $ejecutar->bindParam(3,$codigocompuesto,PDO::PARAM_STR);
          $ejecutar->bindParam(4,$serie,PDO::PARAM_STR);
          $ejecutar->bindParam(5,$correlativo,PDO::PARAM_STR);
          $ejecutar->bindParam(6,$estado,PDO::PARAM_INT);
          $ejecutar->bindParam(7,$monto,PDO::PARAM_STR);
	        $ejecutar->execute();      	
           header('Content-Type: application/json; charset=utf-8');
           echo json_encode(array(
            "success"=>true,
            "message"=>"Exitoso"
           ));

      } catch (Exception $e) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array(
         "success"=>true,
         "message"=>$e
        ));
      }

    }

    public function getTiendas(){
      $sql = "SELECT id,StrNombre FROM tiendas";
      try {
        $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $ejecutar->execute();
        $array=array();
        foreach ($ejecutar as $key ) {
           $array[]=array(
              "id"=>$key["id"],
              "Nombre_tienda"=>$key["StrNombre"]                 
           );
        }
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($array);
      } catch (Exception $e) {
      	  return;
      }

    }

    public function deletemodel($idTienda) {
      try {
        $sql = 'UPDATE optupos_gifts SET estado = 0 WHERE Id = ?';
        $ejecutar = $this->conexion->prepare($sql);
        $ejecutar->bindParam(1, $idTienda, PDO::PARAM_INT);
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
         "message"=>"Erro al actualizar datos"
        ));
      }
    }

    public function activarmodel($idTienda) {
      try {
        $sql = 'UPDATE optupos_gifts SET estado = 1 WHERE Id = ?';
        $ejecutar = $this->conexion->prepare($sql);
        $ejecutar->bindParam(1, $idTienda, PDO::PARAM_INT);
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
         "message"=>"Erro al actualizar datos"
        ));
      }
    }
    public function editarmodel($data) {
        $idtienda=$data["tienda_id"];
        $codigo = $data["codigo"];
        $codigocompuesto = $data["codigo_compuesto"];
        $serie = $data["serie"];
        $correlativo = $data["correlativo"];
        $monto = $data["monto"];
        $estado = $data["estado"];
         $id = $data["id"];
      try {
        $sql = 'UPDATE optupos_gifts set tienda_id = ?, codigo = ?, Codigo_Compuesto = ?, serie = ?, correlativo = ?,estado = ?, monto = ? where id = ?';
        $ejecutar = $this->conexion->prepare($sql);
        $ejecutar->bindParam(1,$idtienda,PDO::PARAM_STR);
        $ejecutar->bindParam(2,$codigo,PDO::PARAM_STR);
        $ejecutar->bindParam(3,$codigocompuesto,PDO::PARAM_STR);
        $ejecutar->bindParam(4,$serie,PDO::PARAM_STR);
        $ejecutar->bindParam(5,$correlativo,PDO::PARAM_STR);
        $ejecutar->bindParam(6,$estado,PDO::PARAM_INT);
        $ejecutar->bindParam(7,$monto,PDO::PARAM_STR);
        $ejecutar->bindParam(8,$id,PDO::PARAM_INT);
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
         "message"=>"Erro al editar datos",
         "data"=>$e
        ));
      }
    }

    public function busquedaporCod($riki){
      $giftcard = $riki ["idgiftcard"]; 
      try {
      $bounty = '%' . $giftcard . '%';
      $sql = "SELECT * from optupos_gifts where codigo_compuesto like :bounty";
      $ejecutar = $this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $ejecutar ->bindParam(':bounty',$bounty,PDO::PARAM_STR);
      $ejecutar->execute();
      $array=array();
      foreach($ejecutar as $key) {
        $array[]=array(
          "id" => $key ["id"],
          "codcomp" => $key["codigo_compuesto"],
          "canales" => $this->canalesxusuario($key["id"])
        );
      }
      header('Content-Type: application/json; charset=utf-8');
      echo json_encode($array);       
      } catch (Exception $e) {
        return;
      }

    }
    public function canalesxusuario($idusuario) {
      try {
          $sql = "SELECT O.canale_id, C.nomCanal, O.CodigoPaquete, O.Id from otpupos_valeconsumo_relations as O
          inner join canales as C on O.canale_id = C.id
          where IdVale = ?";
          $ejecutar = $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
          $ejecutar->bindParam(1,$idusuario, PDO::PARAM_INT);
          $ejecutar->execute();
          $array=array();
          foreach ($ejecutar as $key ) {
             $array[]=array(
                "id"=>$key["canale_id"], 
                "name"=>$key["nomCanal"], 
                "codigo"=> $key["CodigoPaquete"],
                "idbd" => $key["Id"]

             );
          }
          return $array;

      } catch (Exception $e) {
          // Manejar el error según tus necesidades
          echo "Error: " . $e->getMessage();
          return array();
      }
    }  


	public function getAdmin(){
      try {
	    $sql="SELECT TOP 10 O.Id, O.tienda_id,T.StrNombre as Nombre_Tienda,O.codigo,O.codigo_compuesto as Codigo_Compuesto,O.serie,O.correlativo, O.monto,O.estado
            FROM optupos_gifts as O
            INNER JOIN tiendas as T ON T.Id = O.tienda_id";
        $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $ejecutar->execute();
        $array=array();
        foreach ($ejecutar as $key ) {
           $array[]=array(
              "Id"=>$key["Id"],
              "Id_tienda"=>$key["tienda_id"],
              "Nombre_tienda"=>$key["Nombre_Tienda"],
              "Codigo"=>$key["codigo"], 
              "Codigo_compuesto"=>$key["Codigo_Compuesto"],
              "Serie"=>$key["serie"],
              "Correlativo"=>$key["correlativo"],     
              "Monto"=>$key["monto"],
              "Estado" =>$key["estado"]                      
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