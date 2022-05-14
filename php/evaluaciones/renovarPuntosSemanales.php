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
  
  // variable donde guardar los datos del fetch
  global $datos;

    // input body
    $json = file_get_contents('php://input');
    $puntos = json_decode($json);

  // query
  $query = "UPDATE `alumno` SET `puntos_semanales` = 100  WHERE `id_alumno`=$puntos->id_alumno";
  $registros = mysqli_query($con, $query);

  // si la query ha sido correcta hacemos fetch
  if ($registros) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se renovaron los puntos semanales';
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
  }
?>