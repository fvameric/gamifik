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
class Result
{
}
$response = new Result();

// query
$query = "SELECT nom_rank FROM ranking, rank_profes WHERE ranking.id_rank=rank_profes.id_rank AND rank_profes.id_profe='$_GET[id_profe]' AND ranking.nom_rank='$_GET[nom_rank]'";
$res = mysqli_query($con, $query);

// validación de la query
if ($res) {
    $datosUsername = mysqli_fetch_assoc($res);
    if ($datosUsername == '' || $datosUsername == null) {
        $response->resultado = 'ok';
        $response->mensaje = 'Este nombre del ranking no está en uso';
        echo json_encode($response);
    } else {
        $response->resultado = 'error';
        $response->mensaje = 'Este nombre del ranking está en uso';
        echo json_encode($response);
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);
}
