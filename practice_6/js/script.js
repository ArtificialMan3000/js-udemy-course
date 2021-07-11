/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // База данных фильмов
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    // Баннеры
    const advElems = document.querySelectorAll('.promo__adv img'),
        // Главный постер
        bgElem = document.querySelector('.promo__bg'),
        // Жанр на главном постере
        genreElem = bgElem.querySelector('.promo__genre'),
        // Список фильмов
        moviesListElem = document.querySelector('.promo__interactive-list'),
        // Форма добавления фильма
        addMovieFormElem = document.querySelector('.add'),
        // Поле ввода фильма
        addMovieInputElem = addMovieFormElem.querySelector('.adding__input'),
        // Чекбокс "Сделать любимым?"
        makeFavoriteCheckbox = addMovieFormElem.querySelector('input[type=checkbox]');

    // Удаляет баннеры
    const removeAdv = () => {
        advElems.forEach(advElem => {
            advElem.remove();
        });
    };

    // Вносит изменения на страницу
    const makeChanges = () => {
        // Заменяем жанр на главном постере
        genreElem.textContent = 'драма';

        // Меняем картинку на главном постере
        bgElem.style.backgroundImage = 'url("../img/bg.jpg")';
    };

    // Обрезает строку, большую чем указанное количество символов и добавляет троеточие
    const sliceAndAddEtc = (string, charsCount) => {
        if (string.length > charsCount) {
            return string.slice(0, charsCount) + '...';
        }
        return string;
    };

    // Вешает обработчик на кнопку удаления фильмов
    const addDeleteMovieClickHandler = (deleteElem, index) => {
        deleteElem.addEventListener('click', (evt) => {
            movieDB.movies.splice(index, 1);
            renderMoviesList();
        });
    };

    // Сортирует массив по алфавиту без учёта регистра
    const sortArr = (arr) => {
        return arr.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
    };

    // Выводит список фильмов из базы данных
    const renderMoviesList = () => {
        // Обнуляем список фильмов
        moviesListElem.innerHTML = '';
        // Сортируем базу данных фильмов по алфавиту без учёта регистра
        movieDB.movies = sortArr(movieDB.movies);
        // Добавляем в список фильмы из базы
        movieDB.movies.forEach((movie, index) => {
            // Создаём пункт списка
            const movieElem = document.createElement('li');
            movieElem.classList.add('promo__interactive-item');
            // Добавляем в пункт название фильма
            movieElem.textContent = `${index + 1}. ${movie}`;

            // Создаём кнопку удаления
            const deleteElem = document.createElement('div');
            deleteElem.classList.add('delete');
            // Вешаем обработчик на кнопку удаления
            addDeleteMovieClickHandler(deleteElem, index);

            // Добавляем созданные элементы на страницу
            movieElem.append(deleteElem);
            moviesListElem.append(movieElem);
        });
    };

    // Вешаем обработчик на кнопку добавления фильма,
    // который добавляет фильм в базу и обновляет список фильмов на странице
    addMovieFormElem.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (addMovieInputElem.value) {
            if (makeFavoriteCheckbox.checked) {
                console.log('Добавляем любимый фильм');
            }
            // Обрезаем название фильма, если оно превышает 21 символ
            const movieName = sliceAndAddEtc(addMovieInputElem.value, 21);
            // Добавляем фильм в базу
            movieDB.movies.push(movieName);
            // Обновляем список фильмов на странице
            renderMoviesList();
            // Сбрасываем форму
            evt.target.reset();
        }
    });

    // Удаляем баннеры
    removeAdv();
    // Вносим изменения на страницу
    makeChanges();
    // Выводим список фильмов
    renderMoviesList();

});


