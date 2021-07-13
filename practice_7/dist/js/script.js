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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Скрипт начнёт выполняться после полной загрузки контента

document.addEventListener('DOMContentLoaded', () => {
  // Табы
  // Заголовоки табов
  const tabheaderItemElems = document.querySelectorAll('.tabheader__item'),
        // Содержимое табов
  tabcontentElems = document.querySelectorAll('.tabcontent'),
        // Родительский элемент заголовков табов
  tabheaderItemsParentElem = document.querySelector('.tabheader__items'); // Скрывает все табы

  const hideTabContent = () => {
    // Скрываем всё содержимое табов
    tabcontentElems.forEach(tabcontentElem => {
      tabcontentElem.classList.add('tabcontent_hide');
      tabcontentElem.classList.remove('fade');
    }); // Деактивируем все заголовки табов

    tabheaderItemElems.forEach(tabheaderItemElem => {
      tabheaderItemElem.classList.remove('tabheader__item_active');
    });
  }; // Показывает таб


  const showTabContent = (index = 0) => {
    // Показываем содержимое таба
    tabcontentElems[index].classList.remove('tabcontent_hide');
    tabcontentElems[index].classList.add('fade'); // Активируем заголовок таба

    tabheaderItemElems[index].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();
  tabheaderItemsParentElem.addEventListener('click', evt => {
    if (evt.target && evt.target.matches('.tabheader__item')) {
      tabheaderItemElems.forEach((tabheaderItemElem, index) => {
        if (tabheaderItemElem === evt.target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  }); // Таймер

  const deadline = '2021-07-13'; // Получает время оставшееся до endtime в виде объекта

  const getTimeRemaining = endtime => {
    // Время в милисекундах
    const time = Date.parse(endtime) - Date.parse(new Date()); // Количество дней

    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Количество часов

    const hours = Math.floor(time / (1000 * 60 * 60) % 24); // Количество минут

    const minutes = Math.floor(time / (1000 * 60) % 60); // Количество секунд

    const seconds = Math.floor(time / 1000 % 60);
    return {
      total: time,
      days,
      hours,
      minutes,
      seconds
    };
  }; // Добавляет ноль к числу, если оно одноциферное


  const setZero = num => {
    num = Number(num);

    if (num >= 0 && num < 10) {
      return `0${num}`;
    }

    return num;
  }; // Устанавливает время на таймере


  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds'); // Обновляет время

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

  setClock('.timer', deadline); // Модальное окно
  // Элемент модального окна

  const modalElem = document.querySelector('.modal'); // Элемент диалоговой части модального окна

  const modalDialogElem = document.querySelector('.modal__dialog'); // Кнопки закрытия модального окна

  const modalCloseElems = document.querySelectorAll('[data-close]'); // Кнопки вызова модального окна

  const modalCallElems = document.querySelectorAll('[data-modal'); // Открывает модальное окно

  const openModal = () => {
    if (modalElem) {
      modalElem.classList.add('modal_opened'); // Запрещаем странице прокручиваться по вертикали

      document.body.style.overflowY = 'hidden';
    }
  }; // Закрывает модальное окно


  const closeModal = () => {
    if (modalElem) {
      modalElem.classList.remove('modal_opened'); // Разрешаем странице прокручиваться по вертикали

      document.body.style.overflowY = '';
    }
  }; // Устанавливаем обработчики на кнопки вызова модального окна


  if (modalCallElems) {
    modalCallElems.forEach(modalCallElem => {
      modalCallElem.addEventListener('click', evt => {
        evt.preventDefault(); // Открываем окно

        openModal();
      });
    });
  } // Устанавливаем обработчики на кнопки закрытия модального окна


  if (modalCloseElems) {
    modalCloseElems.forEach(modalCloseElem => {
      modalCloseElem.addEventListener('click', evt => {
        evt.preventDefault(); // Закрываем окно

        closeModal();
      });
    });
  } // Устанавливаем обработчик на клик вне модального окна


  if (modalElem && modalDialogElem) {
    modalElem.addEventListener('click', evt => {
      // Закрываем окно, если клик был вне диалоговой части
      if (!evt.target.closest('.modal__dialog')) {
        closeModal();
      }
    });
  } // Устанавливаем обработчик на нажатие ESC


  if (modalElem) {
    document.addEventListener('keydown', evt => {
      if (evt.code === 'Escape' && modalElem.classList.contains('modal_opened')) {
        closeModal();
      }
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map