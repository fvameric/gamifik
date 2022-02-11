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
  $alumno = json_decode($json);

  // query
  $query = "INSERT INTO `alumno` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `fecha_nacimiento`) VALUES
  (NULL, '$alumno->nick', '$alumno->email', '$alumno->pass', '$alumno->nombre', '$alumno->apellidos', '$alumno->fecha_nacimiento')";
  
  $reg = mysqli_query($con, $query);

  // validacion de la query
  if ($reg) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar al alumno';
    echo json_encode($response);
  }
?>