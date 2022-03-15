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
  $queryProfesor = "SELECT * FROM profesor WHERE nick='$user->nick' and pass='$encryptedPass'";
  
  $regProfesor = mysqli_query($con, $queryProfesor);

  // si la query ha sido correcta entramos
  if ($regProfesor) {
    $dataProfesor = mysqli_fetch_array($regProfesor);
    $response->select = 'Select a base de datos correcto';

    // si este profesor existe, devolvemos sus datos
    if (!is_null($dataProfesor)) {
      $response->resultado = 'ok';
      $response->mensaje = 'Se encontró al profesor';
      $response->data = $dataProfesor;
      $response->accessToken = json_encode($jwt);
      echo json_encode($response);
    } else {
      // en caso de que no exista devolvemos error
      $response->resultado = 'error';
      $response->mensaje = 'No se encontró este profesor';
      echo json_encode($response);
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'No se pudo realizar el select a base de datos';
    echo json_encode($response);
  }
?>