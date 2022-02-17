<?php

  // librerias de firebase para generar JWT
  require_once '../../jwt/src/BeforeValidException.php';
  require_once '../../jwt/src/ExpiredException.php';
  require_once '../../jwt/src/SignatureInvalidException.php';
  require_once '../../jwt/src/JWT.php';
  require_once '../../jwt/src/JWK.php';
  require_once '../../jwt/src/Key.php';

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  $key = "example_key";
  $iat = time();
  $nbf = $iat + 10;
  //$exp = $iat + 7200; // 2 horas
  $exp = $iat + 500;
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
?>