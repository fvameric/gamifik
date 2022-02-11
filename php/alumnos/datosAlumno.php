<?php 
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: text/html; charset=UTF-8');

  global $datos; 

  include_once("../conexion/bd.php");
  $bd = new claseBD();

  $registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM `alumno` WHERE 1");


  while ($resultado = mysqli_fetch_array($registros))
  {
    $datos[] = $resultado;
  }

  $json = json_encode($datos);

  header('Content-Type: application/json');

  echo $json;
?>