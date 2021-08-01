'use strict';
require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');

import tabs from './modules/tabs';
import modal from './modules/modal';
import {openModal} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

// Скрипт начнёт выполняться после полной загрузки контента
document.addEventListener('DOMContentLoaded', () => {
    
    // Устанавливаем таймаут на автоматическое открытие модального окна через 50 секунд
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active', 'tabcontent_hide');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-08-13');
    cards();
    calc();
    forms();
    slider({
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


