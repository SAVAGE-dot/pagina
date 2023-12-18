<?php
    class EmpresasController{

        private $Emp;

        public function __construct() {
            $this->Emp = new EmpresasModel();
        }
        public function listar(){
            $this->Emp->getEmp();
        }

        public function create($datos_vista){
            $this->Emp->register($datos_vista);
        }

        public function editar($id){
            $this->Emp->editarmodel($id);
        }

        public function defuse($id){
            $this->Emp->defusemodel($id);
        }

        public function activar($id){
            $this->Emp->activarmodel($id);
        }
    }


?>