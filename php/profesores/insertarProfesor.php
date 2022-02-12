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
  $queryInsert = "INSERT INTO `profesor` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`, `tipo`, `imagen`) VALUES
  (NULL, '$profe->nick', '$profe->email', '$profe->pass', '$profe->nombre', '$profe->apellidos', '$profe->centro', '$profe->tipo', '$profe->imagen')";

  $querySelect = "SELECT * FROM `profesor` WHERE nick = '$profe->nick' AND email = '$profe->email'";

  $insertResult = mysqli_query($con, $queryInsert);

  // validacion de la query
  if ($insertResult) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';

    // devolvemos el user que se acaba de registrar
    $selectResult = mysqli_query($con, $querySelect);
    $data = mysqli_fetch_array($selectResult);
    
    $response->data = $data;
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al profesor';
    echo json_encode($response);
  }
?>