<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: text/html; charset=UTF-8');
  
  //global $datos;

  // TO-DO obtener datos por json desde angular
  $json = file_get_contents('php://input');
  $datosProfesor = json_decode($json);

  include_once("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();

  // REALIZA LA QUERY A LA DB
  $registros = mysqli_query($bd->obtenerConexion(),
  "INSERT INTO `profesor` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`, `avatar`) VALUES (NULL, '$datosProfesor->nick', '$datosProfesor->email', '$datosProfesor->pass', '$datosProfesor->nombre', '$datosProfesor->apellidos', '$datosProfesor->centro', '$datosProfesor->avatar');");

  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL PROFESOR SE INSERTÓ EXITOSAMENTE';

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO

?>