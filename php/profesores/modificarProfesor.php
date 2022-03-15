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
  $profesor = json_decode($json);

  // query
  $querySelect = "SELECT * FROM `profesor` WHERE id_profe = $profesor->id";

  if (isset($profesor->pass)) {
    // encriptar pass
    $encryptedPass = passCrypt($profesor->pass);
    $queryUpdate = "UPDATE `profesor` SET `email`='$profesor->email',`pass`='$encryptedPass',`nombre`='$profesor->nombre',`apellidos`='$profesor->apellidos',`imagen`='$profesor->imagen', `centro`='$profesor->centro' WHERE id_profe = $profesor->id";
    $resUpdate = mysqli_query($con, $queryUpdate);

    // validacion de la query
    // si se hace bien el insert
    if ($resUpdate) {

      // si se hace bien el select devolvemos el profesor recién registrado
      $resSelect = mysqli_query($con, $querySelect);
      if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó al profesor con éxito';
        $response->profesor = $profesor;
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al cargar el profesor insertado';
        $response->profesor = $profesor;
        echo json_encode($response);
        exit;
      }
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al registrar al profesor';
      $response->profesor = $profesor;
      echo json_encode($response);
      exit;
    }

  } else {
    $queryUpdateSinPass = "UPDATE `profesor` SET `email`='$profesor->email',`nombre`='$profesor->nombre',`apellidos`='$profesor->apellidos', `imagen`='$profesor->imagen', `centro`='$profesor->centro' WHERE id_profe = $profesor->id";
    $resUpdateSinPass = mysqli_query($con, $queryUpdateSinPass);

    // validacion de la query
    // si se hace bien el insert
    if ($resUpdateSinPass) {

      // si se hace bien el select devolvemos el profesor recién registrado
      $resSelect = mysqli_query($con, $querySelect);
      if ($resSelect) {
        $response->resultado = 'ok';
        $response->mensaje = 'Se modificó al profesor con éxito';
        $response->profesor = $profesor;
        $data = mysqli_fetch_array($resSelect);
        $response->data = $data;
        echo json_encode($response);
        exit;
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al cargar el profesor insertado';
        $response->profesor = $profesor;
        echo json_encode($response);
        exit;
      }
    } else {
      $response->resultado = 'error';
      $response->mensaje = 'Hubo un error al registrar al profesor';
      $response->profesor = $profesor;
      echo json_encode($response);
      exit;
    }
  }
  
?>