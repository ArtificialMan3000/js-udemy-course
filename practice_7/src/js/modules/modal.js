'use strict';

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

export default modal;
export {openModal, closeModal, modal};