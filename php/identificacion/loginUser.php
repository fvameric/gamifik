<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');
  $user = json_decode($json);

  global $datos;

  include_once("../conexion/bd.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $bd = new claseBD();
  // REALIZA LA QUERY A LA DB
  //$registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM alumno WHERE nick='$user->nick' and pass='$user->pass'");
  $registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM alumno WHERE nick='$user->nick' and pass='$user->pass'");
  $resultado = mysqli_fetch_array($registros);

  if (is_null($resultado)) {
    $registros = mysqli_query($bd->obtenerConexion(), "SELECT * FROM profesor WHERE nick='$user->nick' and pass='$user->pass'");
    $resultado = mysqli_fetch_array($registros);
  }
  
  $json = json_encode($resultado); // GENERA EL JSON CON LOS DATOS OBTENIDOS

  header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

  echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST 
?>