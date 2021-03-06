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
  /* test */
  // comprobamos que la cantidad de alumnos se ajuste al de las tablas
  //$queryUpdateAlumnos = "UPDATE ranking SET alumnos = (SELECT COUNT(*) FROM rank_alumnos WHERE id_rank=$_GET[id]) WHERE id_rank = $_GET[id]";
  //mysqli_query($con, $queryUpdateAlumnos);
  /* test */
  $query = "SELECT * FROM `ranking` WHERE id_rank=$_GET[id]";
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se seleccionó el ranking con éxito';
    $data = mysqli_fetch_array($res);
    $response->data = $data;
    echo json_encode($response);  
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se encontró el ranking';
    echo json_encode($response);
  }
?>