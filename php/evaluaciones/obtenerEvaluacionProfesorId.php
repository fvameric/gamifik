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

  $json = file_get_contents('php://input');
  $evaluacion = json_decode($json);

  // clase respuesta
  class Result {}
  $response = new Result();
  
  // query
  $query = "SELECT * FROM `evaluaciones` INNER JOIN `alumno` ON evaluaciones.id_alumno = alumno.id_alumno WHERE `id_ranking`='$evaluacion->id_ranking' AND `id_profesor`='$evaluacion->id_profesor'";
  $queryEvaluador = "SELECT *, a.nombre AS 'nom1', a2.nombre AS 'nom2', a.apellidos AS 'apellidos1', a2.apellidos AS 'apellidos2' FROM evaluaciones AS e INNER JOIN alumno AS a ON a.id_alumno = e.id_evaluador INNER JOIN alumno AS a2 ON a2.id_alumno = e.id_alumno WHERE `id_ranking`='$evaluacion->id_ranking' AND `id_profesor`='$evaluacion->id_profesor'";
  $res = mysqli_query($con, $queryEvaluador);

  // validación de la query
  if ($res) {
    while ($resultado = mysqli_fetch_array($res))
    {
      $datos[] = $resultado;
    }
    $response->resultado = 'ok';
    $response->mensaje = 'Se selecciono las evaluaciones con éxito';
    $response->data = $datos;
    echo json_encode($response);  
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Error de base de datos';
    echo json_encode($response);
  }
?>