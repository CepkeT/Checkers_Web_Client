document.addEventListener('DOMContentLoaded', function () {
    console.log('Приложение загружено');


    // Инициализация переменных для таймера и индикации хода игрока
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const playerTurnElement = document.getElementById('current-player');

    // Функция обновления таймера
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft > 0) {
            timeLeft -= 1;
        } else {
            changeTurn();
        }
    }

    // Функция смены хода игрока
    function changeTurn() {
        const currentPlayer = parseInt(playerTurnElement.textContent, 10);
        playerTurnElement.textContent = currentPlayer === 1 ? '2' : '1';
        timeLeft = 60; // Сброс таймера
    }

    // Установка интервала для таймера
    setInterval(updateTimer, 1000);

    // Инициализация Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaaaaa, 1);
    // renderer.setSize(1024,1024,1)
    document.getElementById("game-area").appendChild(renderer.domElement);

// Освещение
    const light = new THREE.AmbientLight(0xffffff); // мягкий белый свет
    scene.add(light);

// Создание шахматной доски
    const boardSize = 8; // 8x8 клетки
    const tileSize = 1; // размер одной клетки

// Материалы для клеток
    const whiteMaterial = new THREE.MeshLambertMaterial({ color: 0xEEEEEE });
    const blackMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const geometry = new THREE.PlaneGeometry(tileSize, tileSize);
    geometry.rotateX(-Math.PI / 2);

// Располагаем клетки
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            // const geometry = new THREE.PlaneGeometry(tileSize, tileSize);
            // Объяекты поверхностей должны плоско лежать на полу

            const material = (row + col) % 2 === 0 ? whiteMaterial : blackMaterial;
            const square = new THREE.Mesh(geometry, material);
            square.position.x = col * tileSize;
            square.position.z = row * tileSize;
            scene.add(square);
        }
    }

// Создание шашек
    const checkerRadius = tileSize / 2 * 0.8; // радиус шашки
    const checkerHeight = 0.1; // высота шашки
    const checkerGeometry = new THREE.CylinderGeometry(checkerRadius, checkerRadius, checkerHeight, 32);

    const whiteCheckerMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const blackCheckerMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    for (let row = 0; row < 3; row++) { // Три ряда шашек для каждого игрока
        for (let col = (row + 1) % 2; col < boardSize; col += 2) { // Шашки ставятся только на черные клетки
            const whiteChecker = new THREE.Mesh(checkerGeometry, whiteCheckerMaterial);
            whiteChecker.position.x = col * tileSize;
            whiteChecker.position.z = row * tileSize;
            whiteChecker.position.y = checkerHeight / 2;
            scene.add(whiteChecker);

            const blackChecker = new THREE.Mesh(checkerGeometry, blackCheckerMaterial);
            blackChecker.position.x = col * tileSize;
            blackChecker.position.z = (boardSize - 1 - row) * tileSize;
            blackChecker.position.y = checkerHeight / 2;
            scene.add(blackChecker);
        }
    }

// Установка камеры
    // Переместить камеру над центром доски
    camera.position.set(boardSize / 2, 10, boardSize / 2);
    // Наклон камеры вперед на 45 градусов
    camera.rotateX(-Math.PI / 4);
    // Посмотреть в центр доски
    camera.lookAt(new THREE.Vector3(boardSize / 2, 0, boardSize / 2));
    // Если после этого нужно слегка повернуть камеру вокруг её оси, можно добавить следующую строку:
    camera.rotation.z = Math.PI ;
    // Обновить матрицу проекции после изменения FOV
    //camera.fov = 45; // угол 45 градусов
    camera.updateProjectionMatrix();

// Функция анимации
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();


    // Перехватываем отправку формы Авторизации
    // const loginForm = document.querySelector('.form-signin');
    // loginForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const formData = new FormData(loginForm);
    //     fetch('/api/login', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 // Обработка успешного входа, например переход в лобби
    //                 window.location.href = '/lobby';
    //             } else {
    //                 // Обработка ошибок входа
    //                 alert(data.message);
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // });
    //
    // // Перехватываем отправку формы Регистрации
    // const registerForm = document.querySelector('.form-signup');
    // registerForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const formData = new FormData(registerForm);
    //     fetch('/api/register', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 // Обработка успешной регистрации, например переход в лобби
    //                 window.location.href = '/lobby';
    //             } else {
    //                 // Обработка ошибок регистрации
    //                 alert(data.message);
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // });
    //
    // // Обработка нажатий на кнопки формы 'Sign in' и 'Sign up'
    // const signInButton = document.querySelector('.btn-signin');
    // signInButton.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     // Получаем значения полей ввода
    //     const username = document.querySelector('input[name="username"]').value;
    //     const password = document.querySelector('input[name="password"]').value;
    //
    //     // Проверяем, что поля не пусты
    //     if (username === '' || password === '') {
    //         alert('Please fill in both username and password.');
    //     } else {
    //         // Поля непустые, можно отправить форму
    //         loginForm.submit();
    //     }
    // });
    //
    // const signUpButton = document.querySelector('.btn-signup');
    // signUpButton.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     registerForm.submit();
    // });
});

