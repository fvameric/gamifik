<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../../conexion/bd.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

    // input body
    $json = file_get_contents('php://input');
    $alumno = json_decode($json);

  // query
  $query = "SELECT aceptado FROM `rank_alumnos` WHERE id_rank='$alumno->id_rank' AND id_alumno='$alumno->id_alumno'";
  $resQuery = mysqli_query($con, $query);
  
  // si la query ha sido correcta hacemos fetch
  if ($resQuery) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se seleccionó correctamente';
    $data = mysqli_fetch_array($resQuery);
    $response->data = $data;
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
  }
?>