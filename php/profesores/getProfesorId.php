<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  include_once("../conexion/bd.php");
  $bd = new claseBD();
  
  $reg = mysqli_query($bd->obtenerConexion(),"SELECT * FROM `profesor` WHERE id_profe=$_GET[id]");
  $data = mysqli_fetch_array($reg);

  class Result {}
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'se selecciono el user';
  $response->data = $data;

  header('Content-Type: application/json');
  echo json_encode($response);  
?>