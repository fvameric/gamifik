<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");

  // includes
  include_once("../conexion/bd.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

  // input body
  $json = file_get_contents('php://input');
  $entrega = json_decode($json);

  // query
  $queryUpdate = "UPDATE `entrega` SET `nom_entrega`='$entrega->nom_entrega',`id_rank`='$entrega->id_rank' WHERE id_entrega = $entrega->id_entrega";
  $querySelect = "SELECT * FROM `entrega` WHERE id_entrega = $entrega->id_entrega";

  $resUpdate = mysqli_query($con, $queryUpdate);

  // validacion de la query
  // si se hace bien el insert
  if ($resUpdate) {

    // si se hace bien el select devolvemos el ranking recién modificado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se modificó la entrega con éxito';
      $data = mysqli_fetch_array($resSelect);
      $response->data = $data;
      echo json_encode($response);
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al cargar la entrega insertada';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar la entrega';
    echo json_encode($response);
  }
?>