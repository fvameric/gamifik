<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: PUT");
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");

  // includes
  include_once("../conexion/bd.php");
  include_once("../phpFunctions/passCrypt.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

  // input body
  $json = file_get_contents('php://input');
  $alumno = json_decode($json);

  $querySelect = "SELECT * FROM `alumno` WHERE id_alumno = $alumno->id";

  // encriptar pass
  if (isset($alumno->pass)) {
    $encryptedPass = passCrypt($alumno->pass);
    $queryUpdate = "UPDATE `alumno` SET `email`='$alumno->email',`pass`='$encryptedPass',`nombre`='$alumno->nombre',`apellidos`='$alumno->apellidos',`imagen`='$alumno->imagen' WHERE id_alumno = $alumno->id";
    $resUpdate = mysqli_query($con, $queryUpdate);

    // validacion de la query
    // si se hace bien el insert
    if ($resUpdate) {

      // si se hace bien el select devolvemos el alumno recién registrado
      $resSelect = mysqli_query($con, $querySelect);
      if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó al alumno con éxito';
        $response->alumno = $alumno;
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al cargar el alumno insertado';
        $response->alumno = $alumno;
        echo json_encode($response);
        exit;
      }
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al registrar al alumno';
      $response->alumno = $alumno;
      echo json_encode($response);
      exit;
    }
  } else {
    $queryUpdateSinPass = "UPDATE `alumno` SET `email`='$alumno->email',`nombre`='$alumno->nombre',`apellidos`='$alumno->apellidos',`imagen`='$alumno->imagen' WHERE id_alumno = $alumno->id";
    $resUpdateSinPass = mysqli_query($con, $queryUpdateSinPass);

    // validacion de la query
    // si se hace bien el insert
    if ($resUpdateSinPass) {

      // si se hace bien el select devolvemos el alumno recién registrado
      $resSelect = mysqli_query($con, $querySelect);
      if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó al alumno con éxito';
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al cargar el alumno insertado';
        echo json_encode($response);
        exit;
      }
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al registrar al alumno';
      echo json_encode($response);
      exit;
    }
  }
?>