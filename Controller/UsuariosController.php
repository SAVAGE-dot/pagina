<?php
    class UsuariosController {
        private $Usu;

        public function __construct() {
            $this->Usu = new UsuariosModel();
        }

        public function listar() {
            $this ->Usu->getUsu();
        }

        public function create($datos_vista) {
            $this ->Usu->register($datos_vista);
        }

        public function editar($id){
            $this ->Usu->editarview($id);
        }

        public function defuse($id){
            $this->Usu->defuseview($id);
        }

        public function activar($id){
            $this ->Usu->activarview($id);
        }
    }





?>