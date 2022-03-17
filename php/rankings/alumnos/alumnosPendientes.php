<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: text/html; charset=UTF-8');

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
  $query = "UPDATE `rank_alumnos` SET `aceptado`='$alumno->aceptado' WHERE `id_rank`='$alumno->id_rank' AND `id_alumno`='$alumno->id_alumno'";
  $queryUpdate = "UPDATE `ranking` SET `alumnos`= (SELECT COUNT(id_rank) FROM rank_alumnos WHERE id_rank = '$alumno->id_rank') WHERE id_rank='$alumno->id_rank'";
  
  $resInsert = mysqli_query($con, $query);
  
  // validacion de la query
  if ($resInsert) {
    $resUpdate = mysqli_query($con, $queryUpdate);

    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar el ranking';
    echo json_encode($response);
  }
?>