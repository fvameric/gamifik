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

  // clase
  class Result {}
  $response = new Result();
    
  // input body
  $json = file_get_contents('php://input');
  $ranking = json_decode($json);

  // query
  $queryInsert = "INSERT INTO `ranking`(`id_rank`, `nom_rank`, `alumnos`, `cod_rank`) VALUES (NULL,'$ranking->nom_rank',$ranking->alumnos,'$ranking->cod_rank')";
  $querySelect = "SELECT * FROM `ranking` WHERE nom_rank = '$ranking->nom_rank'";

  $resInsert = mysqli_query($con, $queryInsert);

  // validacion de la query
  if ($resInsert) {

    // si se hace bien el select devolvemos el ranking recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se registró correctamente';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al cargar el ranking insertado';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar el ranking';
    echo json_encode($response);
  }
?>