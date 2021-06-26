/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFilms;

function start () {
    numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};


function rememberMyFilms () {
    for (let i = 0; i < 2; i++) {
        let lastViewedFilm = '';
        do {
            lastViewedFilm = prompt('Один из последних просмотренных фильмов?', '');
        } while (!lastViewedFilm || lastViewedFilm.length > 50);
        let lastViewedFilmScore = '';
        do {
            lastViewedFilmScore = prompt('На сколько оцените его?', '');
        } while (!lastViewedFilmScore || lastViewedFilmScore.length > 50);
        personalMovieDB.movies[lastViewedFilm] = lastViewedFilmScore;
    }
}

// rememberMyFilms();

function detectPersonalLevel () {
    if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
        console.log('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count >= 30) {
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}

detectPersonalLevel();

function writeYourGenres () {
    for (let i = 0; i < 3; i++) {
        let genre = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
        personalMovieDB.genres[i] = genre;
    }
}

writeYourGenres();

function showMyDB () {
    if (!personalMovieDB.privat) {
        console.log(personalMovieDB);
    }
}

showMyDB();