'use strict';

// Скрипт начнёт выполняться после полной загрузки контента
document.addEventListener('DOMContentLoaded', () => {

    // Табы

        // Заголовоки табов
    const tabheaderItemElems = document.querySelectorAll('.tabheader__item'),
        // Содержимое табов
        tabcontentElems = document.querySelectorAll('.tabcontent'),
        // Родительский элемент заголовков табов
        tabheaderItemsParentElem = document.querySelector('.tabheader__items');

    // Скрывает все табы
    const hideTabContent = () => {
        // Скрываем всё содержимое табов
        tabcontentElems.forEach((tabcontentElem) => {
            tabcontentElem.classList.add('tabcontent_hide');
            tabcontentElem.classList.remove('fade');
        });
        // Деактивируем все заголовки табов
        tabheaderItemElems.forEach((tabheaderItemElem) => {
            tabheaderItemElem.classList.remove('tabheader__item_active');
        });
    };

    // Показывает таб
    const showTabContent = (index = 0) => {
        // Показываем содержимое таба
        tabcontentElems[index].classList.remove('tabcontent_hide');
        tabcontentElems[index].classList.add('fade');
        // Активируем заголовок таба
        tabheaderItemElems[index].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabheaderItemsParentElem.addEventListener('click', (evt) => {
        if (evt.target && evt.target.matches('.tabheader__item')) {
            tabheaderItemElems.forEach((tabheaderItemElem, index) => {
                if (tabheaderItemElem === evt.target) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // Таймер

    const deadline = '2021-07-13';

    // Получает время оставшееся до endtime в виде объекта
    const getTimeRemaining = (endtime) => {
        // Время в милисекундах
        const time = Date.parse(endtime) - Date.parse(new Date());
        // Количество дней
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        // Количество часов
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        // Количество минут
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        // Количество секунд
        const seconds = Math.floor((time / 1000) % 60);

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds
        };
    };

    // Добавляет ноль к числу, если оно одноциферное
    const setZero = (num) => {
        num = Number(num);
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    };

    // Устанавливает время на таймере
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        // Обновляет время
        const updateClock = () => {
            const time = getTimeRemaining(endtime);

            days.innerHTML = setZero(time.days);
            hours.innerHTML = setZero(time.hours);
            minutes.innerHTML = setZero(time.minutes);
            seconds.innerHTML = setZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timerIntervalId);
            }
        };

        const timerIntervalId = setInterval(updateClock, 1000);

        updateClock();

    };

    setClock('.timer', deadline);

    // Модальное окно

    // Элемент модального окна
    const modalElem = document.querySelector('.modal');
    // Элемент диалоговой части модального окна
    const modalDialogElem = document.querySelector('.modal__dialog');
    // Кнопки вызова модального окна
    const modalCallElems = document.querySelectorAll('[data-modal');

    // Открывает модальное окно
    const openModal = () => {
        if (modalElem) {
            modalElem.classList.add('modal_opened');
            // Запрещаем странице прокручиваться по вертикали
            document.body.style.overflowY = 'hidden';
            clearInterval(modalTimerId);
        }
    };

    // Закрывает модальное окно
    const closeModal = () => {
        if (modalElem) {
            modalElem.classList.remove('modal_opened');
            // Разрешаем странице прокручиваться по вертикали
            document.body.style.overflowY = '';
        }
    };

    // Устанавливаем обработчики на кнопки вызова модального окна
    if (modalCallElems) {
        modalCallElems.forEach((modalCallElem) => {
            modalCallElem.addEventListener('click', (evt) => {
                evt.preventDefault();
                // Открываем окно
                openModal();
            });
        });
    }

    // Устанавливаем обработчик на клик вне модального окна
    if (modalElem && modalDialogElem) {
        modalElem.addEventListener('click', (evt) => {
            // Закрываем окно, если клик был вне диалоговой части
            if (!evt.target.closest('.modal__dialog') || evt.target.getAttribute('data-close') === '') {
                closeModal();
            }
        });
    }

    // Устанавливаем обработчик на нажатие ESC
    if (modalElem) {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === 'Escape' && modalElem.classList.contains('modal_opened')) {
                closeModal();
            }
        });
    }

    const modalTimerId = setTimeout(openModal, 50000);

    // Обработчик прокрутки страницы
    const windowScrollHandler = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', windowScrollHandler);
        }
    };

    // Устанавливаем обработчик на прокрутку страницы
    window.addEventListener('scroll', windowScrollHandler);

    // Используем классы для создания карточек меню
    class MenuCard {
        constructor (imgSrc, imgAlt, title, description, price, ...classes) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.defaultClassName = 'menu__item';
            // Курс гривны к доллару
            this.transfer = 27;
            // Конвертируем
            this.changeToUAH();
            // Создаём карточку
            this.createCardElem();
            // Наполняем карточку данными
            this.fillCard();
        }

        // Конвертирует доллары в гривны
        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        // Создаёт пустую карточку меню
        createCardElem () {
            const cardElem = document.createElement('div');
            if (this.classes.length === 0) {
                cardElem.classList.add(this.defaultClassName);
            } else {
                this.classes.forEach((className) => {
                    cardElem.classList.add(className);
                });
            }
            cardElem.innerHTML =
                `<img>
                <h3 class="menu__item-subtitle"></h3>
                <div class="menu__item-descr"></div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span></span> грн/день</div>
                </div>`;
            this.cardElem = cardElem;
        }

        // Наполняет карточку данными
        fillCard () {
            if (this.cardElem) {
                document.body.append(this.cardElem);
                const imgElem = this.cardElem.querySelector('img');
                const titleElem = this.cardElem.querySelector('.menu__item-subtitle');
                const descrElem = this.cardElem.querySelector('.menu__item-descr');
                const priceNumberElem = this.cardElem.querySelector('.menu__item-total > span');
                imgElem.setAttribute('src', this.imgSrc);
                imgElem.setAttribute('alt', this.imgAlt);
                titleElem.textContent = this.title;
                descrElem.textContent = this.description;
                priceNumberElem.textContent = this.price;
            } else {
                throw new Error ('Карточки меню не существует');
            }
        }

        // Вставляет карточку меню в указанный элемент
        insertCard (elem) {
            if (this.cardElem) {
                elem.append(this.cardElem);
            } else {
                throw new Error ('Карточки меню не существует');
            }
        }
    }

    // Запрашивает данные с сервера
    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    // Контейнер карточек меню
    const menuFieldContainerElem = document.querySelector('.menu__field > .container');
    const menuCardsFragment = document.createDocumentFragment();
    getResources('http://localhost:3000/menu').then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            const menuCard = new MenuCard(img, altimg, title, descr, price);
            menuCard.insertCard(menuCardsFragment);
        });
        menuFieldContainerElem.append(menuCardsFragment);
    });

    // Формы

    const forms = document.querySelectorAll('form');

    const MESSAGES = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        error: 'Что-то пошло не так...'
    };

    // Показывает сообщение о результате отправки формы
    const showThanksModal = (message) => {
        const modalElem = document.querySelector('.modal');
        const prevModalDialogElem = document.querySelector('.modal__dialog');
        prevModalDialogElem.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modalElem.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialogElem.classList.remove('hide');
            closeModal();
        }, 4000);
    };

    // Отправляет JSON-данные на сервер
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await res.json();
    };

    // Добавляет на форму обработчик для отправки на сервер
    const bindPostData = (form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = MESSAGES.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            let formData = new FormData(form);

            const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', formDataJson)
            .then((data) => {
                console.log(data);
                showThanksModal(MESSAGES.success);
                statusMessage.src = '';
            })
            .catch(() => {
                showThanksModal(MESSAGES.error);
                statusMessage.src = '';
            })
            .finally(() => {
                form.reset();
            });
        });
    };

    forms.forEach((form) => {
        bindPostData(form);
    });
});
