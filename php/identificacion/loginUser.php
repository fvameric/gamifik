<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');
  $user = json_decode($json);

  // includes
  include_once("../conexion/bd.php");
  include_once("../tokenJWT/generarToken.php");

  // clases
  $bd = new claseBD();
  $con = $bd->obtenerConexion();
  class Result{}
  $response = new Result();

  // query
  $queryAlumno = "SELECT * FROM alumno WHERE nick='$user->nick' and pass='$user->pass'";
  $queryProfesor = "SELECT * FROM profesor WHERE nick='$user->nick' and pass='$user->pass'";

  $regAlumno = mysqli_query($con, $queryAlumno);

  // si la query ha sido correcta entramos
  if ($regAlumno) {
    $dataAlumno = mysqli_fetch_array($regAlumno);
    $response->select = 'Select a base de datos correcto';

    // si este alumno existe, devolvemos sus datos
    if (!is_null($dataAlumno)) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se encontró al alumno';
      $response->data = $dataAlumno;
      $response->accessToken = json_encode($jwt);
      echo json_encode($response);
    } else {

      // miramos que sea un profesor
      $regProfesor = mysqli_query($con, $queryProfesor);
      if ($regProfesor) {
        $dataProfesor = mysqli_fetch_array($regProfesor);
        $response->select = 'Select a base de datos correcto';

        // si este profesor existe, devolvemos sus datos
        if (!is_null($dataProfesor)) {
          $response->resultado = 'ok';
          $response->mensaje = 'Se encontró al profesor';
          $response->data = $dataProfesor;
          echo json_encode($response);
        } else {

          // en caso de que no exista ni como alumno ni como profe devolvemos error
          $response->resultado = 'error';
          $response->mensaje = 'No se encontró este usuario';
          echo json_encode($response);
        }
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'No se pudo realizar el select a base de datos';
        echo json_encode($response);
      }
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se pudo realizar el select a base de datos';
    echo json_encode($response);
  }
?>