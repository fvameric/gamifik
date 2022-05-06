<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/bd.php");
  include_once("../tokenJWT/generarToken.php");
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
  $queryAlumno = "SELECT * FROM alumno WHERE nick='$user->nick' and pass='$encryptedPass'";

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
      // en caso de que no exista devolvemos error
      $response->resultado = 'error';
      $response->mensaje = 'No se encontró este alumno';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se pudo realizar el select a base de datos';
    echo json_encode($response);
  }
?>