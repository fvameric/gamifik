<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../../conexion/bd.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

    // input body
    $json = file_get_contents('php://input');
    $alumno = json_decode($json);

  // query
  $query = "DELETE FROM rank_alumnos WHERE id_rank='$alumno->id_rank' AND id_alumno='$alumno->id_alumno'";

  mysqli_query($con, $query);

  $response->resultado = 'ok';
  $response->mensaje = 'El alumno se denegó del ranking';
  $response->params = $alumno;
  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>

