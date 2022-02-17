<?php
  // headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  //includes
  include_once("../tokenJWT/generarToken.php");

  if ($jwt) {
    echo json_encode($jwt);
  } else {
    $response->resultado = 'error';
    $response->mensaje = 'Hubo un problema al generar el token';
    echo json_encode($response);
  }
?>