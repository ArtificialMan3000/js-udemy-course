'use strict';

import {setZero} from '../services/services';

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
            days.innerHTML = setZero(time.days);
            hours.innerHTML = setZero(time.hours);
            minutes.innerHTML = setZero(time.minutes);
            seconds.innerHTML = setZero(time.seconds);

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

export default timer;