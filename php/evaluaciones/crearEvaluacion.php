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

// clase
class Result
{
}
$response = new Result();

// input body
$json = file_get_contents('php://input');
$evaluacion = json_decode($json);

// query
$queryInsert = "INSERT INTO `evaluaciones`(`id_evaluacion`, `id_alumno`, `id_evaluador`, `id_profesor`, `id_ranking`, `id_skill`, `puntos`, `fecha`)
VALUES (NULL,'$evaluacion->id_alumno','$evaluacion->id_evaluador','$evaluacion->id_profesor','$evaluacion->id_ranking','$evaluacion->id_skill','$evaluacion->puntos','$evaluacion->fecha')";

$resInsert = mysqli_query($con, $queryInsert);

// validacion de la query
if ($resInsert) {
    $response->resultado = 'ok';
    $response->mensaje = 'Se registró correctamente';
    echo json_encode($response);
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar la entrega';
    echo json_encode($response);
}
?>