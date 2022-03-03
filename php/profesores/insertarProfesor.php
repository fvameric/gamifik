<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // includes
  include_once("../conexion/bd.php");
  include_once("../tokenJWT/generarToken.php");

  // clases
  // clase conexión
  $bd = new claseBD();
  $con = $bd->obtenerConexion();

  // clase respuesta
  class Result {}
  $response = new Result();

  // input body
  $json = file_get_contents('php://input');
  $profe = json_decode($json);

  // query
  $queryInsert = "INSERT INTO `profesor` (`id_profe`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `centro`, `tipo`, `imagen`) VALUES
  (NULL, '$profe->nick', '$profe->email', '$profe->pass', '$profe->nombre', '$profe->apellidos', '$profe->centro', '$profe->tipo', '$profe->imagen')";

  $querySelect = "SELECT * FROM `profesor` WHERE nick = '$profe->nick' OR email = '$profe->email'";

  // comprobamos que el email y el nick de usuario no se repita
  $resSelect = mysqli_query($con, $querySelect);

  if ($resSelect) {
    $dataValidacion = mysqli_fetch_array($resSelect);
    if ($profe->nick != $dataValidacion['nick'] && $profe->email != $dataValidacion['email']) {
      $resInsert = mysqli_query($con, $queryInsert);

      // validacion de la query
      if ($resInsert) {

        $resSelectUltimoProfe = mysqli_query($con, $querySelect);
        if ($resSelectUltimoProfe) {
          $response->resultado = 'ok';
          $response->mensaje = 'Se registró correctamente';
          $data = mysqli_fetch_array($resSelectUltimoProfe);
          $response->data = $data;
          $response->accessToken = json_encode($jwt);
          echo json_encode($response);
          exit;
        } else {
          $response->resultado = 'error';
          $response->mensaje = 'Hubo un error al cargar el profesor insertado';
          echo json_encode($response);
          exit;
        }
      } else {
        $response->resultado = 'error';
        $response->mensaje = 'Hubo un error al registrar al profesor';
        echo json_encode($response);
        exit;
      }
    } else {
      if ($profe->nick == $dataValidacion['nick']) {
        $response->resultado = 'error';
        $response->mensaje = 'Este nick ya está en uso';
        echo json_encode($response);
        exit;
      }

      if ($profe->email == $dataValidacion['email']) {
        $response->resultado = 'error';
        $response->mensaje = 'Este email ya está en uso';
        echo json_encode($response);
        exit;
      }
    }
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un error con la base de datos';
    echo json_encode($response);
    exit;
  }
?>