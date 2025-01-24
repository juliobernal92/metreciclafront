<?php
require_once(__DIR__ . '/../vendor/autoload.php'); 
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

define('KEY', '123');
function decode($jwt) {
    try {
        $decoded = JWT::decode($jwt, new Key(KEY, 'HS256'));
        return (array) $decoded->data;
    } catch (\Firebase\JWT\ExpiredException $e) {
        throw new Exception("Token ha expirado");
    } catch (Exception $e) {
        throw new Exception("Token inválido");
    }
}
function isAuthenticated() {
    if (isset($_COOKIE['jwt'])) {
        try {
            $jwt = $_COOKIE['jwt'];
            decode($jwt);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    return false;
}



//COOKIES

function decryptCookie($cookieValue) {
    $cipher_algo = 'AES-256-CBC';
    $encryption_key = '2h,~o[y5u5Z~6zO`o?9*:JE*=iML8</A'; // Debes usar la misma clave que en el backend

    $data = base64_decode($cookieValue);
    $iv = substr($data, 0, 16); // Extraer el IV (los primeros 16 bytes)
    $encrypted_value = substr($data, 16); // Resto es el valor cifrado

    $decrypted_value = openssl_decrypt($encrypted_value, $cipher_algo, $encryption_key, 0, $iv);

    return $decrypted_value;
}