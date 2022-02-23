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

  // clase
  class Result {}
  $response = new Result();
    
  // input body
  $json = file_get_contents('php://input');
  $ids = json_decode($json);

  // query
  $queryInsert = "INSERT INTO `rank_profes`(`id_rank_profes`, `id_rank`, `id_profe`) VALUES (0, $ids->id_rank, $ids->id_profe)";
  $resInsert = mysqli_query($con, $queryInsert);

  // validacion de la query
  if ($resInsert) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';
    $queryUpdateAlumnos = "UPDATE ranking SET alumnos = (SELECT COUNT(*) FROM rank_alumnos WHERE id_rank='$ids->id_rank') WHERE id_rank = '$ids->id_rank'";
    $resUpdate = mysqli_query($con, $queryUpdateAlumnos);
    if ($resUpdate) {
        echo json_encode($response);
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al actualizar rankings';
        echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar el ranking';
    echo json_encode($response);
  }
