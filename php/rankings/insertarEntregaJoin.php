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
$entrega = json_decode($json);

// query
if (isset($entrega->id_alumno)) {
    $queryRelation = "INSERT INTO `rank_entregas`(`id_rank_entregas`, `id_rank`, `id_entrega`, `id_alumno`, `puntuacion_entrega`) VALUES (NULL, '$entrega->id_rank', '$entrega->id_entrega', '$entrega->id_alumno', 0)";

    $resInsertRelation = mysqli_query($con, $queryRelation);

    // validacion de la query
    if ($resInsertRelation) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se registró correctamente';
        echo json_encode($response);
        exit;
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al registrar la entrega';
        echo json_encode($response);
        exit;
    }

} else {
    $queryRelation = "INSERT INTO `rank_entregas`(`id_rank_entregas`, `id_rank`, `id_entrega`, `puntuacion_entrega`) VALUES (NULL, '$entrega->id_rank', '$entrega->id_entrega', 0)";
    $resInsertRelation = mysqli_query($con, $queryRelation);

    // validacion de la query
    if ($resInsertRelation) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se registró correctamente';
        echo json_encode($response);
        exit;
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al registrar la entrega';
        echo json_encode($response);
        exit;
    }
}


?>