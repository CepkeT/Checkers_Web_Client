<?php

$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($request) {
    case '/' :
        require __DIR__ . '/mainpage.php';
        break;
    case '/lobby' :
        require __DIR__ . '/lobby.php';
        break;
    case '/game' :
        require __DIR__ . '/game.php';
        break;
    // ваши другие роуты здесь...
    default:
       // http_response_code(404);
        //require __DIR__ . '/404.php'; // предоставьте страницу 404
        break;
}
