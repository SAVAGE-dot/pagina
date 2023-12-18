<?php 
    class AdminController{
        private $Admin;
        public function __construct(){
            $this->Admin = new AdministradorModel();
        }
        public function listar(){
            $this->Admin->getAdmin();
        }
        public function create($datos_vista){
            $this->Admin->register($datos_vista);
        }
        public function delete($idTienda){
            $this->Admin->deletemodel($idTienda);
            
        }
        public function activar($idTienda){
            $this->Admin->activarmodel($idTienda);

        }
        public function editar($idTienda){
            $this->Admin->editarmodel($idTienda);
        }
        public function getTiendas(){
            $this->Admin->getTiendas();
        }

        public function buscarporCod($data){
            $this->Admin->busquedaporCod($data) ;
        }
    
}

 ?>