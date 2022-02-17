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
  $query = "SELECT * FROM `alumno` WHERE id_alumno=$_GET[id]";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se selecciono el user con éxito';
    $data = mysqli_fetch_array($res);
    $response->data = $data;
    echo json_encode($response);  
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se encontró al alumno';
    echo json_encode($response);
  }
?>