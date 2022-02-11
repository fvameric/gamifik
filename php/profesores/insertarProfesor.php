<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/bd.php");
  
  // clases
  $bd = new claseBD();
  $con = $bd->obtenerConexion();
  class Result {}
  $response = new Result();

  // input body
  $json = file_get_contents('php://input');
  $profe = json_decode($json);

  // query
  $query = "INSERT INTO `profesor` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`) VALUES
  (NULL, '$profe->nick', '$profe->email', '$profe->pass', '$profe->nombre', '$profe->apellidos', '$profe->centro')";

  $reg = mysqli_query($con, $query);

  // validacion de la query
  if ($reg) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al profesor';
    echo json_encode($response);
  }
?>