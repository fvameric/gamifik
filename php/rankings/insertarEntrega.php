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
$queryInsert = "INSERT INTO `entrega`(`id_entrega`, `nom_entrega`, `puntuacion_entrega`, `id_rank`) VALUES (0,'$entrega->nom_entrega',0,$entrega->id_rank)";
$querySelect = "SELECT * FROM `entrega` WHERE nom_entrega = '$entrega->nom_entrega'";

$resInsert = mysqli_query($con, $queryInsert);

// validacion de la query
if ($resInsert) {

    // si se hace bien el select devolvemos la entrega recién registrado
    $resSelect = mysqli_query($con, $querySelect);
    if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se registró correctamente';
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al cargar la entrega insertada';
        echo json_encode($response);
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error al registrar la entrega';
    echo json_encode($response);
}
