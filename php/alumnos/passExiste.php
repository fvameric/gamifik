<?php
// headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// includes
include_once("../conexion/bd.php");
include_once("../phpFunctions/passCrypt.php");

// clases
// clase conexión
$bd = new claseBD();
$con = $bd->obtenerConexion();

// clase respuesta
class Result{}
$response = new Result();

// input body
$json = file_get_contents('php://input');
$user = json_decode($json);

// encriptar pass
$encryptedPass = passCrypt($user->pass);

// query
$query = "SELECT pass FROM `alumno` WHERE id_alumno='$user->id'";
$res = mysqli_query($con, $query);

// validación de la query
if ($res) {
    $datosPass = mysqli_fetch_assoc($res);
    if ($datosPass['pass'] != $encryptedPass) {
        $response->resultado = 'error';
        $response->mensaje = 'Esta pass no está en uso';
        $response->oldpass = $datosPass['pass'];
        $response->newpass = $encryptedPass;
        echo json_encode($response);
    } else {
        $response->resultado = 'ok';
        $response->mensaje = 'Esta pass está en uso';
        $response->oldpass = $datosPass['pass'];
        $response->newpass = $encryptedPass;
        echo json_encode($response);
    }
} else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema con la base de datos';
    echo json_encode($response);
}
