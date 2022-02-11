<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  include_once("../conexion/bd.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  // input body
  $json = file_get_contents('php://input');
  $alumno = json_decode($json);

  $bd = new claseBD(); // CREA LA CONEXION
  $con = $bd->obtenerConexion();
  class Result {}
  $response = new Result();

  $queryUpdate = "UPDATE `alumno` SET `email`='$alumno->email',`pass`='$alumno->pass',`nombre`='$alumno->nombre',`apellidos`='$alumno->apellidos' WHERE id = $alumno->id";
  $resultadoUpdate = mysqli_query($con, $queryUpdate);

  $querySelect = "SELECT * FROM `alumno` WHERE id= $alumno->id";
  $resultadoSelect = mysqli_query($con, $querySelect);
  $data = mysqli_fetch_array($resultadoSelect);

  $response->resultado = 'OK';
  $response->mensaje = 'EL USUARIO SE MODIFICO EXITOSAMENTE';
  $response->data = $data;
  
  echo json_encode($response);
?>