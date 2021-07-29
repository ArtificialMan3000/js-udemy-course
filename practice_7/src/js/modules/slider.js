'use strict';

// Слайдер
function slider () {
    // Элемент слайдера
    const sliderElem = document.querySelector('.offer__slider');
    // Элемент счётчика слайдов
    const sliderCounterElem = sliderElem ? sliderElem.querySelector('.offer__slider-counter') : null;
    // Стрелка "назад"
    const sliderCounterPrevElem = sliderCounterElem ? sliderCounterElem.querySelector('.offer__slider-prev') : null;
    // Стрелка "вперёд"
    const sliderCounterNextElem = sliderCounterElem ? sliderCounterElem.querySelector('.offer__slider-next') : null;
    // Элемент с номером текущего слайда
    const sliderCounterCurrentElem = sliderCounterElem ? sliderCounterElem.querySelector('#current') : null;
    // Элемент с номером общего количества слайдов
    const sliderCounterTotalElem = sliderCounterElem ? sliderCounterElem.querySelector('#total') : null;
    // Контейнер слайдов
    const sliderWrapperElem = sliderElem ? sliderElem.querySelector('.offer__slider-wrapper') : null;
    // "Карусель слайдов"
    const sliderCarouselElem = sliderWrapperElem ? sliderWrapperElem.querySelector('.offer__slider-carousel') : null;
    // Элементы слайдов
    const slideElems = sliderWrapperElem ? sliderWrapperElem.querySelectorAll('.offer__slide') : null;
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
            sliderCounterCurrentElem.textContent = setZero(Number(index) + 1);
        }
    };

    // Выводит общее количество слайдов
    const showSlidesTotal = () => {
        sliderCounterTotalElem.textContent = setZero(slideElems.length);
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

module.exports = slider;