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

  $json = file_get_contents('php://input');
  $evaluacion = json_decode($json);

  // clase respuesta
  class Result {}
  $response = new Result();
  
  // query
  $query = "SELECT * FROM `evaluaciones` WHERE `id_alumno`='$evaluacion->id_alumno' AND `id_ranking`='$evaluacion->id_ranking' AND `id_skill`='$evaluacion->id_skill'";
  
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    $data = mysqli_fetch_array($res);
    if (isset($data)) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se selecciono la evaluación con éxito';
      $response->data = $data;
      echo json_encode($response);  
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'No se encontró la evaluación';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error en la selección a base de datos';
    echo json_encode($response);
  }
?>