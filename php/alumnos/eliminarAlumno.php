<?php
  // headers
  header('Access-Control-Allow-Origin: *');
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
  $query = "DELETE FROM alumno WHERE id_alumno='$_GET[id]'";
  mysqli_query($con, $query);

  $response->resultado = 'ok';
  $response->mensaje = 'El alumno se eliminó con éxito';
  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>

