<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  // librerias de firebase para generar JWT
  require_once '../../jwt/src/BeforeValidException.php';
  require_once '../../jwt/src/ExpiredException.php';
  require_once '../../jwt/src/SignatureInvalidException.php';
  require_once '../../jwt/src/JWT.php';
  require_once '../../jwt/src/JWK.php';
  require_once '../../jwt/src/Key.php';

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  /************** TOKEN **************/

  $key = "example_key";
  $iat = time();
  $nbf = $iat + 10;
  $exp = $nbf + 10;
  $payload = array(
      "iss" => "http://example.org",
      "aud" => "http://example.com",
      "iat" => $iat,
      "nbf" => $nbf,
      "exp" => $exp
  );

  /**
   * IMPORTANT:
   * You must specify supported algorithms for your application. See
   * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
   * for a list of spec-compliant algorithms.
   */
  $jwt = JWT::encode($payload, $key, 'HS256');
  JWT::$leeway = 60; // $leeway in seconds
  $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

  

  //print_r($decoded);

  /*
  NOTE: This will now be an object instead of an associative array. To get
  an associative array, you will need to cast it as such:
  */

  $decoded_array = (array) $decoded;

  /************** TOKEN **************/

  $json = file_get_contents('php://input');
  $user = json_decode($json);

  // includes
  include_once("../conexion/bd.php");

  // clases
  $bd = new claseBD();
  $con = $bd->obtenerConexion();
  class Result
  {
  }
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