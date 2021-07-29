'use strict';

// Используем классы для создания карточек меню
function cards () {
    // Класс карточки меню
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
            // Создаём элемент
            const cardElem = document.createElement('div');
            // Устанавливаем классы
            if (this.classes.length === 0) {
                cardElem.classList.add(this.defaultClassName);
            } else {
                this.classes.forEach((className) => {
                    cardElem.classList.add(className);
                });
            }
            // Записываем в элемент всю вёрстку карточки
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
                // Устанавливаем аттрибуты и содержимое тегов
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
                // Если элемент карточки не создан - ошибка
                throw new Error ('Карточки меню не существует');
            }
        }

        // Вставляет карточку меню в указанный элемент
        insertCard (elem) {
            if (this.cardElem) {
                elem.append(this.cardElem);
            } else {
                // Если элемент карточки не создан - ошибка
                throw new Error ('Карточки меню не существует');
            }
        }
    }

    // Запрашивает данные с сервера
    const getResources = async (url) => {
        // Посылаем запрос
        const res = await fetch(url);

        // Если статус ответа не успешный - ошибка
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        // Возвращаем ответ в виде JSON
        return await res.json();
    };

    // Контейнер карточек меню
    const menuFieldContainerElem = document.querySelector('.menu__field > .container');
    // Фрагмент с карточками
    const menuCardsFragment = document.createDocumentFragment();
    // Запрашиваем данные и создаём карточку
    getResources('http://localhost:3000/menu').then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            const menuCard = new MenuCard(img, altimg, title, descr, price);
            // Вставляем карточку во фрагмент
            menuCard.insertCard(menuCardsFragment);
        });
        // Вставляем фрагмент на страницу
        menuFieldContainerElem.append(menuCardsFragment);
    });
}

module.exports = cards;