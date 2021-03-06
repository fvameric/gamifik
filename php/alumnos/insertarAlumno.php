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
  class Result {}
  $response = new Result();
    
  // input body
  $json = file_get_contents('php://input');
  $alumno = json_decode($json);

  // encriptar pass
  $encryptedPass = passCrypt($alumno->pass);

  // query
  $queryInsert = "INSERT INTO `alumno`(`id_alumno`, `nick`, `email`, `pass`, `nombre`, `apellidos`, `fecha_nacimiento`, `tipo`, `imagen`) VALUES
  (NULL,'$alumno->nick','$alumno->email','$encryptedPass','$alumno->nombre','$alumno->apellidos','$alumno->fecha_nacimiento','$alumno->tipo' ,'$alumno->imagen')";
  
  $querySelect = "SELECT * FROM `alumno` WHERE nick = '$alumno->nick' OR email = '$alumno->email'";

  // comprobamos que el email y el nick de usuario no se repita
  $resSelect = mysqli_query($con, $querySelect);

  if ($resSelect) {
    $dataValidacion = mysqli_fetch_array($resSelect);
    if ($alumno->nick != $dataValidacion['nick'] && $alumno->email != $dataValidacion['email']) {
      $resInsert = mysqli_query($con, $queryInsert);
  
      // validacion de la query
      if ($resInsert) {
  
        // si se hace bien el select devolvemos el profesor recién registrado
        $resSelectUltimoAlumno = mysqli_query($con, $querySelect);
        if ($resSelectUltimoAlumno) {
          $response->resultado = 'ok';
          $response->mensaje = 'Se registró correctamente';
          $data = mysqli_fetch_array($resSelectUltimoAlumno);
          $response->data = $data;
          $response->accessToken = json_encode($jwt);
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
    } else {
      if ($alumno->nick == $dataValidacion['nick']) {
        $response->resultado = 'error';
        $response->mensaje = 'Este nick ya está en uso';
        echo json_encode($response);
        exit;
      }

      if ($alumno->email == $dataValidacion['email']) {
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