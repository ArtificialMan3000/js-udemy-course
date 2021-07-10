/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const advElems = document.querySelectorAll('.promo__adv img'),
    bgElem = document.querySelector('.promo__bg'),
    genreElem = bgElem.querySelector('.promo__genre'),
    moviesListElem = document.querySelector('.promo__interactive-list');

advElems.forEach(advElem => {
    advElem.remove();
});

genreElem.textContent = 'драма';

bgElem.style.backgroundImage = 'url("../img/bg.jpg")';

moviesListElem.innerHTML = '';
movieDB.movies.sort().forEach((movie, index) => {
    const movieElem = document.createElement('li');
    movieElem.classList.add('promo__interactive-item');
    movieElem.innerHTML = `${index + 1}. ${movie} <div class="delete"></div>`;
    moviesListElem.append(movieElem);
});

