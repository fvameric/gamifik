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
  
  // query
  $query = "SELECT nick, imagen FROM rank_alumnos, alumno WHERE id_rank = 101 AND rank_alumnos.id_alumno= alumno.id_alumno ORDER BY  puntuacion DESC LIMIT 3'";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    while ($registros = mysqli_fetch_array($res))
    {
      $datos[] = $registros;
    }
  
    $data = json_encode($datos);
    echo $data;
    /*
    $response->resultado = 'ok';
    $response->mensaje = 'Se seleccionó el ranking con éxito';
    $response->data = $data;
    echo json_encode($response);*/

  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se encontró el ranking';
    echo json_encode($response);
  }
?>