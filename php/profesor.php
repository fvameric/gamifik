<?php
    class Profesor {
        private $id;
        private $nick;
        private $email;
        private $pass;
        private $nombre;
        private $apellidos;
        private $centro;

        function __construct(){}

        // get set id
        public function getId(){ return $this->id; }
        public function setId($id){ $this->id = $id; }

        // get set nick
        public function getNick(){ return $this->nick; }

        public function setNick($nick){ $this->nick = $nick; }

        // get set email
        public function getEmail(){ return $this->email; }
        public function setEmail($email){ $this->email = $email; }

        // get set pass
        public function getPass(){ return $this->pass; }
        public function setPass($pass){ $this->pass = $pass; }

        // get set nombre
        public function getNombre(){ return $this->nombre; }
        public function setNombre($nombre){ $this->nombre = $nombre; }

        // get set apellidos
        public function getApellidos(){ return $this->apellidos; }
        public function setApellidos($apellidos){ $this->apellidos = $apellidos; }

        // get set centro
        public function getCentro(){ return $this->centro; }
        public function setCentro($centro){ $this->centro = $centro; }
    }
?>