<?php
    class ValeconsumoController {
        private $vc;

        public function __construct() {
            $this->vc = new ValeconsumoModel();
        }

        public function listar() {
            $this ->vc -> getvc();
        }

        public function getCanal() {
            $this->vc->getCanales();
        }

        public function editarCanales($id) {
            $this->vc->editCanal($id);
        }

        
    }


?>