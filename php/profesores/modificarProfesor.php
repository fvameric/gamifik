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
  $profesor = json_decode($json);

  // query
  $queryUpdate = "UPDATE `profesor` SET `email`='$profesor->email',`pass`='$profesor->pass',`nombre`='$profesor->nombre',`apellidos`='$profesor->apellidos', `centro`='$profesor->centro' WHERE id = $profesor->id";
  $querySelect = "SELECT * FROM `profesor` WHERE id = $profesor->id";

  $resUpdate = mysqli_query($con, $queryUpdate);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdate) {

    // si se hace bien el select devolvemos el profesor recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se modificó al profesor con éxito';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al cargar el profesor insertado';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al profesor';
    echo json_encode($response);
  }
?>