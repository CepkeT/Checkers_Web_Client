<?php
// Точка входа в приложение
include __DIR__ . '/init.php';

// Подключаем автозагрузку Composer
require_once __DIR__ . '/../vendor/autoload.php';


echo "Добро пожаловать в веб-клиент шашек!"; // Тестовое сообщение, впоследствии замените на реальный вывод вашего приложения
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Веб-клиент шашек</title>
    <!-- Стили, скрипты и другие ресурсы -->
</head>
<body>
<h1>Добро пожаловать в веб-клиент шашек!</h1>
<nav>
    <ul>
        <li><a href="/public">Главная страница</a></li>
        <li><a href="/public/mainpage.php">Рег/авторизация</a> </li>
        <li><a href="/public/lobby.php">Лобби</a></li>
        <li><a href="/public/game.php">Игра</a></li>
    </ul>
</nav>
</body>
</html>
