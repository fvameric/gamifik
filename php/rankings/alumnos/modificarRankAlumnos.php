<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");

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
  $queryUpdate = "UPDATE `rank_alumnos` SET `puntuacion`='$alumno->puntuacion' WHERE id_alumno = '$alumno->id_alumno' AND id_rank ='$alumno->id_rank'";
  $resUpdate = mysqli_query($con, $queryUpdate);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdate) {

    $response->resultado = 'ok';
    $response->mensaje = 'Se modificó la puntuacion con éxito';
    $response->data = $alumno;
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar la entrega';
    echo json_encode($response);
  }
?>