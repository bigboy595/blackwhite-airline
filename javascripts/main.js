document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // Видео галерея с автопереключением по окончании
    // =============================================
    const videos = document.querySelectorAll('.video-item');
    const indicators = document.querySelectorAll('.indicator');
    const progressBar = document.querySelector('.video-progress');

    if (videos.length > 0 && indicators.length > 0 && progressBar) {
        let currentVideo = 0;

        // Функция воспроизведения видео
        const playVideo = (index) => {
            // Сброс всех видео
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('active');
            });

            // Запуск выбранного видео
            const video = videos[index];
            video.classList.add('active');
            video.play()
                .then(() => {
                    // Установка обработчика окончания
                    video.onended = nextVideo;
                })
                .catch(e => console.error('Ошибка воспроизведения:', e));

            // Обновление индикаторов
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');

            // Сброс и запуск отслеживания прогресса
            resetProgress();
            trackProgress(video);
        };

        // Переключение на следующее видео
        const nextVideo = () => {
            currentVideo = (currentVideo + 1) % videos.length;
            playVideo(currentVideo);
        };

        // Отслеживание прогресса
        const trackProgress = (video) => {
            video.ontimeupdate = () => {
                progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
            };
        };

        // Сброс прогресс-бара
        const resetProgress = () => {
            progressBar.style.width = '0%';
        };

        // Обработчики для индикаторов
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (index !== currentVideo) {
                    currentVideo = index;
                    playVideo(currentVideo);
                }
            });
        });

        // Начальное воспроизведение
        playVideo(0);
    }

    // =============================================
    // Форма отправки email
    // =============================================
    const submitButton = document.getElementById('submitButton');
    const emailField = document.getElementById('emailField');
    const successPopup = document.getElementById('successPopup');
    const closePopup = document.querySelector('.close-popup');

    if (submitButton && emailField && successPopup && closePopup) {
        // Валидация email
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        // Обработчик отправки
        submitButton.addEventListener('click', () => {
            const email = emailField.value.trim();

            if (validateEmail(email)) {
                successPopup.style.display = 'flex';
                setTimeout(() => {
                    successPopup.style.display = 'none';
                    emailField.value = '';
                }, 3000);
            } else {
                emailField.style.borderColor = '#ff4444';
                setTimeout(() => emailField.style.borderColor = '#ddd', 1000);
            }
        });

        // Закрытие попапа
        closePopup.addEventListener('click', () => {
            successPopup.style.display = 'none';
        });
    }

    // =============================================
    // Взаимодействие карточек товаров
    // =============================================
    const productCard1 = document.querySelector('.product-card');
    const productCard2 = document.querySelector('.product-card-2');

    if (productCard1 && productCard2) {
        // Обработчик для первой карточки
        productCard1.addEventListener('click', function () {
            const wasActive = this.classList.contains('active');

            // Закрываем обе карточки
            productCard1.classList.remove('active');
            productCard2.classList.remove('active');
            productCard2.style.top = '33vw';

            // Если карточка не была активна - открываем её
            if (!wasActive) {
                this.classList.add('active');
                productCard2.style.top = '52vw';
            }
        });

        // Обработчик для второй карточки
        productCard2.addEventListener('click', function () {
            const wasActive = this.classList.contains('active');

            // Закрываем обе карточки
            productCard1.classList.remove('active');
            productCard2.classList.remove('active');
            productCard2.style.top = '33vw';

            // Если карточка не была активна - открываем её
            if (!wasActive) {
                this.classList.add('active');
            }
        });
    }


    const formButton = document.getElementById('form');
    const formPopup = document.getElementById('formPopup');
    const closeBtn = document.querySelector('.close-btn');
    const orderForm = document.getElementById('orderForm');

    if (formButton && formPopup) {
        // Открытие формы
        formButton.addEventListener('click', function () {
            formPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });

        // Закрытие формы
        closeBtn.addEventListener('click', function () {
            formPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Закрытие при клике вне формы
        formPopup.addEventListener('click', function (e) {
            if (e.target === formPopup) {
                formPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Обработка отправки формы
        if (orderForm) {
            orderForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Получаем данные формы
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value
                };

                // Здесь можно добавить отправку данных на сервер
                console.log('Данные формы:', formData);

                // Закрываем форму после отправки
                formPopup.style.display = 'none';
                document.body.style.overflow = 'auto';

                // Оповещение пользователя
                alert('Спасибо! Ваши данные получены.');

                // Очищаем форму
                orderForm.reset();
            });
        }
    }




});