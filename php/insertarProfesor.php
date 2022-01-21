<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Content-Type: text/html; charset=UTF-8');
  
  include_once("bd.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();

  //global $datos;

  //$jsonData = '{"id": "0", "nick": "asd", "email": "asd@gmail.com", "pass": "asd","nombre": "asd", "apellidos": "asd", "centro": "asd"}';

  // TO-DO obtener datos por json desde angular
  $json = file_get_contents('php://input');
  $datosProfesor = json_decode($json);

  // REALIZA LA QUERY A LA DB
  $registros = mysqli_query($bd->obtenerConexion(),"INSERT INTO `profesor` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`) VALUES (NULL, '$datosProfesor->nick', '$datosProfesor->email', '$datosProfesor->pass', '$datosProfesor->nombre', '$datosProfesor->apellidos', '$datosProfesor->centro');");

  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL PROFESOR SE INSERTO EXITOSAMENTE';

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO

?>