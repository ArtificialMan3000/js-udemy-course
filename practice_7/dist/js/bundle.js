/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


// Калькулятор калорий
function calc () {
    // Элемент калькулятора
    const calculatorElem = document.querySelector('.calculating__field');
    // Элемент с выбором пола
    const genderElem = calculatorElem.querySelector('#gender');
    // Элемент с выбором конституции
    const constitutionElem = calculatorElem.querySelector('#constitution');
    // Элемент с выбором физ. активности
    const activityElem = calculatorElem.querySelector('#activity');
    // Элемент, содержащий число - результат вычислений
    const calculatingResultNumElem = calculatorElem.querySelector('.calculating__result > span');
    // Коэффициенты активности
    const ACTIVITY_COEFFICIENTS = {
        low: 1.2,
        small: 1.375,
        medium: 1.55,
        high: 1.725
    };

    // Рассчитывает калорийность
    const calcCalories = (gender, weight, height, age, activity) => {
        // Если отсутствует хотя бы один параметр, отменяем расчеты
        if (!gender || !weight || !height || !age || !ACTIVITY_COEFFICIENTS[activity]) {
            return false;
        }
        let result;
        if (gender === 'male') {
            result = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        } else if (gender === 'female') {
                result = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        }
        return Math.round(result * ACTIVITY_COEFFICIENTS[activity]);
    };

    // Получает данные из формы
    const getCalcData = () => {
        const gender = genderElem.querySelector('[data-active]').dataset.gender;
        const weight = Number(constitutionElem.querySelector('#weight').value);
        const height = Number(constitutionElem.querySelector('#height').value);
        const age = Number(constitutionElem.querySelector('#age').value);
        const activity = activityElem.querySelector('[data-active]').dataset.activity;
        return {gender, weight, height, age, activity};
    };

    // Обновляет выводимое количество калорий
    const updateCalories = () => {
        // Получаем данные
        const data = getCalcData();
        // Рассчитываем калории
        const calories = calcCalories(data.gender, data.weight, data.height, data.age, data.activity);
        // Выводим результат на страницу
        if (calories && isFinite(calories)) {
            calculatingResultNumElem.textContent = calories;
        } else {
            calculatingResultNumElem.textContent = '_____';
        }
    };

    // Деактивирует кнопку
    const deactivateButton = (button) => {
        button.classList.remove('calculating__choose-item_active');
        button.removeAttribute('data-active');
    };

    // Деактивирует группу кнопок
    const deactivateButtonsGroup = (buttonsGroupElem) => {
        const buttons = buttonsGroupElem.querySelectorAll('.calculating__choose-item');
        buttons.forEach((button) => {
            deactivateButton(button);
        });
    };

    // Активирует кнопку
    const activateButton = (button) => {
        button.classList.add('calculating__choose-item_active');
        button.setAttribute('data-active', '');
    };

    // Переключает кнопку
    const switchButton = (id) => {
        // Целевая кнопка
        const targetButton = calculatorElem.querySelector(`#${id}`);
        // Группа кнопок, в которой происходит переключение
        const targetButtonGroup = targetButton.closest('.calculating__choose');
        // Деактивируем все кнопки в группе
        deactivateButtonsGroup(targetButtonGroup);
        // Активируем целевую кнопку
        activateButton(targetButton);
        // Сохраняем данные в localStorage
        localStorage.setItem(targetButtonGroup.id, id);
    };

    // Устанавливает начальное положение кнопок
    const setStartButtons = () => {
        if (localStorage.getItem('gender')) {
            switchButton(localStorage.getItem('gender'));
        }
        if (localStorage.getItem('activity')) {
            switchButton(localStorage.getItem('activity'));
        }
    };

    // Помечает поле как ошибочное
    const setErrorField = (field) => {
        field.classList.add('calculating__choose-item_error');
    };

    // Убирает пометку поля как ошибочного
    const removeErrorField = (field) => {
        field.classList.remove('calculating__choose-item_error');
    };

    // Проверяет есть ли ошибка в введённом в поле значении и помечает его соответствующим образом
    const validateField = (field) => {
        // Если введено что-то, кроме чисел, то помечаем поле как ошибочное
        if (field.value.match(/\D/g)) {
            setErrorField(field);
        } else {
            removeErrorField(field);
        }
    };

    // Вешаем обработчики изменения значений формы
    genderElem.addEventListener('click', (evt) => {
        const targetButton = evt.target.closest('.calculating__choose-item');
        if (targetButton) {
            switchButton(targetButton.id);
            updateCalories();
        }
    });

    constitutionElem.addEventListener('input', (evt) => {
        const targetField = evt.target.closest('.calculating__choose-item');
        if (targetField) {
            validateField(targetField);
            updateCalories();
        }
    });

    activityElem.addEventListener('click', (evt) => {
        const targetButton = evt.target.closest('.calculating__choose-item');
        if (targetButton) {
            switchButton(targetButton.id);
            updateCalories();
        }
    });

    setStartButtons();
    updateCalories();
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




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

    // Контейнер карточек меню
    const menuFieldContainerElem = document.querySelector('.menu__field > .container');
    // Фрагмент с карточками
    const menuCardsFragment = document.createDocumentFragment();
    // Запрашиваем данные и создаём карточку
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResources"])('http://localhost:3000/menu').then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            const menuCard = new MenuCard(img, altimg, title, descr, price);
            // Вставляем карточку во фрагмент
            menuCard.insertCard(menuCardsFragment);
        });
        // Вставляем фрагмент на страницу
        menuFieldContainerElem.append(menuCardsFragment);
    });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");





// Формы
function forms () {
    // Все формы на сайте
    const forms = document.querySelectorAll('form');

    // Сообщения о статусе отправки формы
    const MESSAGES = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        error: 'Что-то пошло не так...'
    };

    // Показывает сообщение о результате отправки формы
    const showThanksModal = (message) => {
        // Элемент модального окна
        const modalElem = document.querySelector('.modal');
        // Элемент диалоговой части окна
        const prevModalDialogElem = document.querySelector('.modal__dialog');
        // Скрываем диалоговую часть
        prevModalDialogElem.classList.add('hide');
        
        // Создаём элемент для сообщения
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        // Добавляем элемент с сообщением в модальное окно
        modalElem.append(thanksModal);
        // Открываем модалку
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal');

        // Через 4 секунды после показа удаляем элемент с сообщением, возвращаем диалоговую часть и закрываем окно
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialogElem.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);
    };

    // Добавляет на форму обработчик для отправки на сервер
    const bindPostData = (form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // Показываем спиннер, пока происходит отправка данных
            const statusMessage = document.createElement('img');
            statusMessage.src = MESSAGES.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // Создаём объект FormData из формы
            let formData = new FormData(form);
            // Преобразуем FormData в JSON
            const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));

            // Отправляем запрос
            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', formDataJson)
            .then((data) => {
                console.log(data);
                // Показываем сообщение об успехе и убираем спиннер
                showThanksModal(MESSAGES.success);
                statusMessage.src = '';
            })
            .catch(() => {
                // Показываем сообщение об ошибке и убираем спиннер
                showThanksModal(MESSAGES.error);
                statusMessage.src = '';
            })
            .finally(() => {
                // Очищаем форму
                form.reset();
            });
        });
    };

    // Добавляем всем формам обработчики для отправки данных
    forms.forEach((form) => {
        bindPostData(form);
    });
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default, openModal, closeModal, modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modal", function() { return modal; });


// Открывает модальное окно
const openModal = (modalSelector, modalTimerId) => {
    const modalElem = document.querySelector(modalSelector);
    if (modalElem) {
        modalElem.classList.add('modal_opened');
        // Запрещаем странице прокручиваться по вертикали
        document.body.style.overflowY = 'hidden';
        if (modalTimerId) {
            // Очищаем таймер самостоятельного показа модального окна
            clearInterval(modalTimerId);
        }
    }
};

// Закрывает модальное окно
const closeModal = (modalSelector) => {
    const modalElem = document.querySelector(modalSelector);
    if (modalElem) {
        modalElem.classList.remove('modal_opened');
        // Разрешаем странице прокручиваться по вертикали
        document.body.style.overflowY = '';
    }
};

// Модальное окно
function modal (triggerSelector, modalSelector, modalTimerId) {
    // Элемент модального окна
    const modalElem = document.querySelector(modalSelector);
    // Элемент диалоговой части модального окна
    const modalDialogElem = modalElem.querySelector('.modal__dialog');
    // Кнопки вызова модального окна
    const modalCallElems = document.querySelectorAll(triggerSelector);

    // Устанавливаем обработчики на кнопки вызова модального окна
    if (modalCallElems) {
        modalCallElems.forEach((modalCallElem) => {
            modalCallElem.addEventListener('click', (evt) => {
                evt.preventDefault();
                // Открываем окно
                openModal(modalSelector, modalTimerId);
            });
        });
    }

    // Устанавливаем обработчик на клик вне модального окна
    if (modalElem && modalDialogElem) {
        modalElem.addEventListener('click', (evt) => {
            // Закрываем окно, если клик был вне диалоговой части
            if (!evt.target.closest('.modal__dialog') || evt.target.hasAttribute('data-close')) {
                closeModal(modalSelector);
            }
        });
    }

    // Устанавливаем обработчик на нажатие ESC
    if (modalElem) {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === 'Escape' && modalElem.classList.contains('modal_opened')) {
                closeModal(modalSelector);
            }
        });
    }

    // Обработчик прокрутки страницы
    const windowScrollHandler = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', windowScrollHandler);
        }
    };

    // Устанавливаем обработчик на прокрутку страницы
    window.addEventListener('scroll', windowScrollHandler);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




// Слайдер
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, carousel}) {
    // Элемент слайдера
    const sliderElem = document.querySelector(container);
    // Стрелка "назад"
    const sliderCounterPrevElem = sliderElem ? sliderElem.querySelector(prevArrow) : null;
    // Стрелка "вперёд"
    const sliderCounterNextElem = sliderElem ? sliderElem.querySelector(nextArrow) : null;
    // Элемент с номером текущего слайда
    const sliderCounterCurrentElem = sliderElem ? sliderElem.querySelector(currentCounter) : null;
    // Элемент с номером общего количества слайдов
    const sliderCounterTotalElem = sliderElem ? sliderElem.querySelector(totalCounter) : null;
    // Контейнер слайдов
    const sliderWrapperElem = sliderElem ? sliderElem.querySelector(wrapper) : null;
    // "Карусель слайдов"
    const sliderCarouselElem = sliderWrapperElem ? sliderWrapperElem.querySelector(carousel) : null;
    // Элементы слайдов
    const slideElems = sliderWrapperElem ? sliderWrapperElem.querySelectorAll(slide) : null;
    // Индекс стартового слайда
    const START_SLIDE_INDEX = 0;
    // Ширина слайдера
    const sliderWidth = window.getComputedStyle(sliderWrapperElem).width;

    // Создаёт элемент навигации
    const createNavigationElem = () => {
        // Создаём сам элемент навигации
        const navigationElem = document.createElement('ol');
        navigationElem.classList.add('offer__slider-carousel-indicators');
        // Создаём фрагмент с индикаторами слайдов
        const slideIndicatorsFrag = document.createDocumentFragment();
        // Заполняем фрагмент
        slideElems.forEach((slide, index) => {
            slideIndicatorsFrag.append(createSlideIndicator(index));
        });
        // Кладём фрагмент в элемент навигации
        navigationElem.append(slideIndicatorsFrag);
        return navigationElem;
    };

    // Создаёт индикатор слайда
    const createSlideIndicator = (index) => {
        const slideIndicator = document.createElement('li');
        slideIndicator.classList.add('offer__slider-dot');
        slideIndicator.setAttribute('data-slide', index);
        return slideIndicator;
    };

    // Добавляем на слайдер навигацию
    const sliderNavigationElem = createNavigationElem();
    sliderElem.append(sliderNavigationElem);
    
    // Устанавливает ширину "карусели"
    const setCarouselWidth = () => {
        sliderCarouselElem.style.width = 100 * slideElems.length + '%';
    };

    // Устанавливает всем слайдам одинаковую ширину
    const setSlidesWidth = () => {
        slideElems.forEach((slide) => {
            slide.style.width = sliderWidth;
        });
    };

    // Деактивирует слайд
    const deactivateSlide = (index) => {
        if (slideElems && slideElems[index]) {
            slideElems[index].removeAttribute('data-active');
        }
        // Деактивируем индикатор
        if (sliderNavigationElem) {
            const currSliderNavigationElem = sliderNavigationElem.querySelector(`[data-slide="${index}"]`);
            currSliderNavigationElem.classList.remove('offer__slider-dot_active');
        }
    };

    // Деактивирует все слайды
    const deactivateAllSlides = () => {
        if (slideElems) {
            slideElems.forEach((slide, index) => {
                deactivateSlide(index);
            });
        }
    };

    // Активирует слайд
    const activateSlide = (index) => {
        if (slideElems && slideElems[index]) {
            slideElems[index].setAttribute('data-active', true);
        }
        // Активируем индикатор
        if (sliderNavigationElem) {
            const currSliderNavigationElem = sliderNavigationElem.querySelector(`[data-slide="${index}"]`);
            currSliderNavigationElem.classList.add('offer__slider-dot_active');
        }
    };

    // Изменяет номер текущего слайда
    const changeCurrSlideNum = (index) => {
        if (sliderCounterCurrentElem) {
            sliderCounterCurrentElem.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(Number(index) + 1);
        }
    };

    // Выводит общее количество слайдов
    const showSlidesTotal = () => {
        sliderCounterTotalElem.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(slideElems.length);
    };

    // Проставляет индексы слайдов
    const setSlidesIndexes = () => {
        if (slideElems) {
            slideElems.forEach((slide, index) => {
                slide.setAttribute('data-index', index);
            });
        }
    };

    // Переключает на заданный слайд
    const switchToSlide = (index) => {
        // Прокручиваем карусель
        sliderCarouselElem.style.transform = `translateX(-${index * parseInt(sliderWidth)}px)`;
        // Меняем активный слайд
        deactivateAllSlides();
        activateSlide(index);
        // Подсвечиваем индикатор слайда

        // Изменяем номер текущего слайда
        changeCurrSlideNum(index);
    };

    // Переключает на следующий слайд
    const switchToNextSlide = (index) => {
        let nextSlideIndex = Number(index) + 1;
        if (nextSlideIndex >= slideElems.length) {
            nextSlideIndex = 0;
        }
        switchToSlide(nextSlideIndex);
    };

    // Переключает на предыдущий слайд
    const switchToPrevSlide = (index) => {
        let prevSlideIndex = Number(index) - 1;
        if (prevSlideIndex < 0) {
            prevSlideIndex = slideElems.length - 1;
        }
        switchToSlide(prevSlideIndex);
    };

    // Определяет индекс активного слайда
    const getCurrSlideIndex = () => {
        const currSlide = sliderWrapperElem.querySelector('[data-active]');
        const currSlideIndex = currSlide.dataset.index;
        return Number(currSlideIndex);
    };

    // Устанавливаем обработчик на навигацию для переключения слайдов
    sliderNavigationElem.addEventListener('click', (evt) => {
        const targetIndicator = evt.target.closest('.offer__slider-dot');
        if (targetIndicator) {
            switchToSlide(targetIndicator.dataset.slide);
        }
    });

    // Вешаем обработчик на кнопку "назад"
    sliderCounterPrevElem.addEventListener('click', () => {
        const currSlideIndex = getCurrSlideIndex();
        switchToPrevSlide(currSlideIndex);
    });

    // Вешаем обработчик на кнопку "вперёд"
    sliderCounterNextElem.addEventListener('click', () => {
        const currSlideIndex = getCurrSlideIndex();
        switchToNextSlide(currSlideIndex);
    });

    // Устанавливаем ширину "карусели"
    setCarouselWidth();
    // Устанавливаем ширину слайдов
    setSlidesWidth();
    // Проставляем слайдам индексы
    setSlidesIndexes();
    // Выводим общее количество слайдов
    showSlidesTotal();
    // Переключаемся на стартовый слайд
    switchToSlide(START_SLIDE_INDEX);
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


// Табы
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass, tabsContentHideClass) {
    // Заголовоки табов
    const tabheaderItemElems = document.querySelectorAll(tabsSelector),
        // Содержимое табов
        tabcontentElems = document.querySelectorAll(tabsContentSelector),
        // Родительский элемент заголовков табов
        tabheaderItemsParentElem = document.querySelector(tabsParentSelector);

    // Скрывает все табы
    const hideTabContent = () => {
        // Скрываем всё содержимое табов
        tabcontentElems.forEach((tabcontentElem) => {
            tabcontentElem.classList.add(tabsContentHideClass);
            tabcontentElem.classList.remove('fade');
        });
        // Деактивируем все заголовки табов
        tabheaderItemElems.forEach((tabheaderItemElem) => {
            tabheaderItemElem.classList.remove(tabsActiveClass);
        });
    };

    // Показывает таб
    const showTabContent = (index = 0) => {
        // Показываем содержимое таба
        tabcontentElems[index].classList.remove(tabsContentHideClass);
        tabcontentElems[index].classList.add('fade');
        // Активируем заголовок таба
        tabheaderItemElems[index].classList.add(tabsActiveClass);
    };

    // Скрываем табы
    hideTabContent();
    // Показываем первый таб
    showTabContent();

    // Вешаем обработчик на родительский элемент заголовков табов
    tabheaderItemsParentElem.addEventListener('click', (evt) => {
        // Если клик произошёл по заголовку таба, скрываем все табы и показываем соответствующий таб
        if (evt.target && evt.target.matches(tabsSelector)) {
            tabheaderItemElems.forEach((tabheaderItemElem, index) => {
                if (tabheaderItemElem === evt.target) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




// Таймер
function timer (timerSelector, deadline) {

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

    // Устанавливает время на таймере
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        // Обновляет время
        const updateClock = () => {
            // Получаем время, оставшееся до целевого времени
            const time = getTimeRemaining(endtime);

            // Выводим время на страницу
            days.innerHTML = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(time.days);
            hours.innerHTML = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(time.hours);
            minutes.innerHTML = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(time.minutes);
            seconds.innerHTML = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["setZero"])(time.seconds);

            // Очищаем интервал, если целевое время достигнуто
            if (time.total <= 0) {
                clearInterval(timerIntervalId);
            }
        };

        // Устанавливаем обновление времени каждую секунду
        const timerIntervalId = setInterval(updateClock, 1000);

        // Первое обновление времени
        updateClock();
    };

    // Устанавливаем таймер
    setClock(timerSelector, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");











// Скрипт начнёт выполняться после полной загрузки контента
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем таймаут на автоматическое открытие модального окна через 50 секунд
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 50000);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active', 'tabcontent_hide');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2021-08-13');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        carousel: '.offer__slider-carousel'
    });
});

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/*! exports provided: setZero, postData, getResources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setZero", function() { return setZero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResources", function() { return getResources; });


// Добавляет ноль к числу, если оно одноциферное
const setZero = (num) => {
    num = Number(num);
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num;
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




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map