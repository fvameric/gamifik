<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
  $json = file_get_contents('php://input');
  $datosAlumno = json_decode($json);

  include_once("../conexion/bd.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();

  // REALIZA LA QUERY A LA DB
  mysqli_query($bd->obtenerConexion(),"INSERT INTO `alumno` (`id`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `fecha_nacimiento`) VALUES (NULL, '$datosAlumno->nick', '$datosAlumno->email', '$datosAlumno->pass', '$datosAlumno->nombre', '$datosAlumno->apellidos', '$datosAlumno->fecha_nacimiento');");

  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL ALUMNO SE INSERTO EXITOSAMENTE';

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO

?>