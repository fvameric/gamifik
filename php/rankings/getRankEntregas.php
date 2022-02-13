<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
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

  // query
  $query = "SELECT * FROM `rank_entregas` WHERE 1";
  $registros = mysqli_query($con, $query);
  
  // si la query ha sido correcta hacemos fetch
  if ($registros) {
    while ($resultado = mysqli_fetch_array($registros))
    {
      $datos[] = $resultado;
    }
  
    $json = json_encode($datos);
    echo $json;
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
  }
?>