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
  
  // query
  $query = "SELECT * FROM `evaluaciones` WHERE id_ranking=$_GET[id]";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    while ($resultado = mysqli_fetch_array($res))
    {
      $datos[] = $resultado;
    }
  
    if (isset($datos)) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se selecciono el user con éxito';
      $response->data = $datos;
      echo json_encode($response);  
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'No se encontró al alumno';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error de base de datos';
    echo json_encode($response);
  }
?>