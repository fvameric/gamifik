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
$querySelect = "SELECT * FROM `evaluaciones` WHERE `id_alumno`='$evaluacion->id_alumno' AND `id_evaluador`='$evaluacion->id_evaluador' AND `id_profesor`='$evaluacion->id_profesor' AND `id_ranking`='$evaluacion->id_ranking' AND `id_skill`='$evaluacion->id_skill'";
$queryUpdate = "UPDATE `evaluaciones` SET `puntos`= `puntos` + $evaluacion->puntos,`fecha`='$evaluacion->fecha' WHERE `id_alumno`='$evaluacion->id_alumno' AND `id_evaluador`='$evaluacion->id_evaluador' AND `id_profesor`='$evaluacion->id_profesor' AND `id_ranking`='$evaluacion->id_ranking' AND `id_skill`='$evaluacion->id_skill'";
$queryInsert = "INSERT INTO `evaluaciones`(`id_evaluacion`, `id_alumno`, `id_evaluador`, `id_profesor`, `id_ranking`, `id_skill`, `puntos`, `fecha`)
VALUES (NULL,'$evaluacion->id_alumno','$evaluacion->id_evaluador','$evaluacion->id_profesor','$evaluacion->id_ranking','$evaluacion->id_skill','$evaluacion->puntos','$evaluacion->fecha')";
$queryUpdatePoints = "UPDATE `alumno` SET `puntos_semanales`=`puntos_semanales` - $evaluacion->puntos WHERE `id_alumno`='$evaluacion->id_evaluador'";

$resSelect = mysqli_query($con, $querySelect);
if ($resSelect) {

    mysqli_query($con, $queryUpdatePoints);

    if (mysqli_num_rows($resSelect)==0) {
        $resInsert = mysqli_query($con, $queryInsert);

        // validacion de la query
        if ($resInsert) {
            $response->resultado = 'ok';
            $response->mensaje = 'Se registró correctamente';
            echo json_encode($response);
            exit();
        } else {
            $response->resultado = 'error';
            $response->mensaje = 'Hubo un error al registrar la entrega';
            echo json_encode($response);
            exit();
        }
    } else {
        $resUpdate = mysqli_query($con, $queryUpdate);
        if ($resUpdate) {
            $response->resultado = 'ok';
            $response->mensaje = 'Se actualizó la evaluación correctamente';
            echo json_encode($response);
            exit();
        } else {
            $response->resultado = 'error';
            $response->mensaje = 'Error update';
            echo json_encode($response);
            exit();
        }
    }
}

?>