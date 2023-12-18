<?php

    class CodigosController {

        private $Cod;

        public function __construct() {
            $this->Cod = new CodigosModel();
        }
        public function listar(){
            $this->Cod->getCod();
        }
        public function create($datos_vista){
            $this->Cod->register($datos_vista);
        }
        public function editar($id){
            $this->Cod->editarmodel($id);
            
        }


    }

?>