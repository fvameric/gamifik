<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: text/html; charset=UTF-8');

  include_once("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();

  // REALIZA LA QUERY A LA DB
  mysqli_query($bd->obtenerConexion(), "DELETE FROM profesor WHERE id='$_GET[id]'");


  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL PROFESOR SE ELIMINO EXITOSAMENTE';

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>

