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
  $exp = $iat + 7200; // 2 horas

  $payload = array(
      "iss" => "http://gamifik.org",
      "aud" => "http://gamifik.com",
      "iat" => $iat,
      "nbf" => $nbf,
      "exp" => $exp
  );

  $jwt = JWT::encode($payload, $key, 'HS256');
  JWT::$leeway = 60; // $leeway in seconds
  $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
  
  //print_r($decoded);
  $decoded_array = (array) $decoded;
?>