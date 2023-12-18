<?php
    class LoginController{
        private $login;

        public function __construct(){
            $this->login = new LoginModel();
        }

        public function login($datos_vista){
            $this->login->validacion($datos_vista);
        }

        public function cerrar(){
            session_start();
            session_destroy();
            header('Location: ../../Views/login.php');
            die();
        }
    }



?>