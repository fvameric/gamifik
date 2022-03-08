<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/bd.php");
  

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();
  
  // query
  $query = "SELECT pass FROM `alumno` WHERE id_alumno='$_GET[id]'";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
      $datosPass = mysqli_fetch_assoc($res);
      if ($datosPass == '' || $datosPass == null) {
        $response->resultado = '0';
        $response->mensaje = 'Esta pass no está en uso';
        echo json_encode($response);
      } else {
        $response->resultado = '1';
        $response->mensaje = 'Esta pass está en uso';
        echo json_encode($response);  
      }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);  
  }
