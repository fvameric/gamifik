<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: DELETE");
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
    $entrega = json_decode($json);

  // query
  $query = "DELETE FROM entrega WHERE id_entrega='$entrega->id_entrega'";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    $response->resultado = 'ok';
    $response->mensaje = 'La entrega se eliminó con éxito';
    echo json_encode($response);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos.';
    echo json_encode($response);
  }
?>

