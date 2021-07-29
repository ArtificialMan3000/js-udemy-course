'use strict';

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

export default tabs;