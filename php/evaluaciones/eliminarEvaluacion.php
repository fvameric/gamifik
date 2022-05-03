<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: DELETE');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/bd.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

  // query
  $query = "DELETE FROM evaluaciones WHERE id_evaluacion='$_GET[id]'";
  mysqli_query($con, $query);

  $response->resultado = 'ok';
  $response->mensaje = 'La evaluación se eliminó con éxito';
  echo json_encode($response);
?>

