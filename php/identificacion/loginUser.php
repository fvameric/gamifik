<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');
  $user = json_decode($json);
  
  include_once("../conexion/bd.php");
  $bd = new claseBD();

  // buscamos user en alumno
  $registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM alumno WHERE nick='$user->nick' and pass='$user->pass'");
  $resultado = mysqli_fetch_array($registros);

  // si no existe y obtenemos nulo, entonces buscamos en profesor
  if (is_null($resultado)) {
    $registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM profesor WHERE nick='$user->nick' and pass='$user->pass'");
    $resultado = mysqli_fetch_array($registros);
  }
  
  // devolvemos el resultado del select
  $json = json_encode($resultado);
  echo $json;
?>