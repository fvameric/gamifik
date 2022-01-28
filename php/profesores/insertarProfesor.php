<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
  $json = file_get_contents('php://input');
  $datosProfesor = json_decode($json);

  include_once("../conexion/bd.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();

  // REALIZA LA QUERY A LA DB
  mysqli_query($bd->obtenerConexion(),"INSERT INTO `profesor` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`) VALUES (NULL, '$datosProfesor->nick', '$datosProfesor->email', '$datosProfesor->pass', '$datosProfesor->nombre', '$datosProfesor->apellidos', '$datosProfesor->centro');");

  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL PROFESOR SE INSERTO EXITOSAMENTE';

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO

?>