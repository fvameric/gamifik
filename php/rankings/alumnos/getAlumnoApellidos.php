<?php
  // headers
  header('Access-Control-Allow-Origin: *'); 
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

  // variable donde guardar los datos del fetch
  global $datos;
  
  // query
  //$query = "SELECT * FROM alumno INNER JOIN rank_alumnos ON alumno.id_alumno = rank_alumnos.id_alumno WHERE rank_alumnos.id_rank = '$_GET[id]' ORDER BY alumno.apellidos ASC";
  $query = "SELECT alumno.id_alumno, rank_alumnos.id_rank, rank_entregas.id_entrega, puntuacion_entrega, nick, email, pass, nombre, apellidos, fecha_nacimiento, tipo, imagen, aceptado
  FROM alumno
  INNER JOIN rank_alumnos ON alumno.id_alumno = rank_alumnos.id_alumno
  INNER JOIN rank_entregas ON alumno.id_alumno = rank_entregas.id_alumno
  WHERE rank_alumnos.id_rank = '$_GET[id]' ORDER BY alumno.apellidos ASC";
  
  $res = mysqli_query($con, $query);

  // validación de la query
  if ($res) {
    while ($registros = mysqli_fetch_array($res))
    {
      $datos[] = $registros;
    }
  
    $data = json_encode($datos);
    echo $data;
    /*
    $response->resultado = 'ok';
    $response->mensaje = 'Se seleccionó el ranking con éxito';
    $response->data = $data;
    echo json_encode($response);*/

  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);
  }
?>