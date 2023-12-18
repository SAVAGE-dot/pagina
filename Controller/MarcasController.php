<?php
    class MarcasController {
        private $Mar;
        public function __construct() {
            $this->Mar = new MarcasModel();
        }

        public function listar(){
            $this->Mar->getMar();
        }

        public function create($datos_vista){
            $this->Mar->register($datos_vista);
        }
        
        public function editar($id){
            $this->Mar->editarmodel($id);
        }

        
    }
?>