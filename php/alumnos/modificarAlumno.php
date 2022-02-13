<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  // includes
  include_once("../conexion/bd.php");

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
  $queryUpdate = "UPDATE `alumno` SET `email`='$alumno->email',`pass`='$alumno->pass',`nombre`='$alumno->nombre',`apellidos`='$alumno->apellidos' WHERE id_alumno = $alumno->id";
  $querySelect = "SELECT * FROM `alumno` WHERE id_alumno = $alumno->id";

  $resUpdate = mysqli_query($con, $queryUpdate);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdate) {

    // si se hace bien el select devolvemos el alumno recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se modificó al alumno con éxito';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al cargar el alumno insertado';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al alumno';
    echo json_encode($response);
  }
?>