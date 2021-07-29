'use strict';

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

export {setZero, postData, getResources};
