<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: text/html; charset=UTF-8');

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

  // query
  $query = "SELECT * FROM `entrega` WHERE 1";
  $registros = mysqli_query($con, $query);
  
  // si la query ha sido correcta hacemos fetch
  if ($registros) {
    while ($resultado = mysqli_fetch_array($registros))
    {
      $datos[] = $resultado;
    }
  
    $json = json_encode($datos);
    header('Content-Type: application/json');
    echo $json;
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
  }
?>