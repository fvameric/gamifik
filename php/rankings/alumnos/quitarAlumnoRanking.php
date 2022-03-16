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
    $ids = json_decode($json);

  // query
  $query = "DELETE FROM rank_alumnos WHERE id_rank='$ids->id_rank' AND id_alumno='$ids->id_alumno'";
  $queryUpdate = "UPDATE `ranking` SET `alumnos`= (SELECT COUNT(id_rank) FROM rank_alumnos WHERE id_rank = '$ids->id_rank') WHERE id_rank='$ids->id_rank'";

  mysqli_query($con, $query);
  mysqli_query($con, $queryUpdate);

  $response->resultado = 'ok';
  $response->mensaje = 'El alumno se eliminó quitó del ranking';
  $response->params = $ids;
  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>

