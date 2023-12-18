<?php
    class RolesController {
    private $Rol;

    public function __construct() {
        $this->Rol = new RolesModel();
    }

    public function listar() {
        $this->Rol -> getRoles();
    }

    public function create($datos_vista) {
        $this->Rol->register($datos_vista);
    }

    public function editar($id) {
        $this->Rol->editarvista($id);
    }

    public function defuse($id){
        $this->Rol->defuseview($id);
    }

    public function activar($id){
        $this->Rol->acitvarview($id);
    }
    }

?>