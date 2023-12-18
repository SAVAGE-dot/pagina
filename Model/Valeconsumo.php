<?php

    class ValeconsumoModel {

        private $conexion;

        public function __construct() {
            $cn=new conexion();
            $this->conexion=$cn->getConnection();           
        }

        public function getCanales() {
            try {
                $sql = "SELECT id, nomCanal from canales";
                $ejecutar= $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->execute();
                $array=array();
                foreach ($ejecutar as $key) {
                    $array[]=array(
                        "id"=>$key["id"],
                        "name"=>$key["nomCanal"]

                    );
                } 
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($array);
            } catch ( Exception $e) {
                return;
            }
        }

        public function editCanal($data){
            $datos = json_decode($data["name"]);

            for ($i=0; $i < COUNT($datos); $i++) { 
                var_dump($datos[$i]->name);
            }
            exit;
            try {
                $sql="UPDATE otpupos_valeconsumo_relations set CodigoPaquete = ? where CodigoPaquete = ? and IdVale = ? and canale_id = ?";
                $ejecutar= $this->conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar -> bindParam(1, $id, PDO::PARAM_STR);
                $ejecutar -> bindParam(2, $codPaq, PDO::PARAM_STR);
                $ejecutar -> bindParam(3, $canale, PDO::PARAM_STR);
                $ejecutar->execute();
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "success"=>true,
                    "message"=>"Actualizacion exitosa"
                ));
            } catch ( Exception $e ) {
                header('Conten-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    "error"=>false,
                    "message"=>"Error al editar canales",
                    "data"=>$e
                ));
            }
        }

        public function getvc () {
            try {
                $sql="SELECT O.Id, O.IdVale, O.CodigoPaquete, C.nomCanal,G.codigo_compuesto, O.Precio, O.Estado
                from otpupos_valeconsumo_relations as O
                inner join optupos_gifts as G on G.id = O.IdVale
				inner join canales as C on C.id = o.canale_id";
                $ejecutar=$this->conexion->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $ejecutar->execute();
                $array=array();
                foreach ($ejecutar as $key) {
                    $array[]=array(
                        "id"=>$key["Id"],
                        "idvale"=>$key["IdVale"],
                        "codpaquete" =>$key["CodigoPaquete"],
                        "idcanal"=>$key["nomCanal"],
                        "codigocompuesto"=>$key["codigo_compuesto"],
                        "precio"=>$key["Precio"],
                        "estado"=>$key["Estado"]
                    );
                }
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($array);
            } catch ( Exception $e) {
                return;
            }
        }
    }
?>