<?php

function passCrypt($password) {
    $password_crypt = crypt($password,'$5$rounds=5000$stringforsalt$');
    $arrPassword = explode("$", $password_crypt);
    return $arrPassword[4];
}

?>