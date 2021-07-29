'use strict';

// Формы
function forms () {
    // Все формы на сайте
    const forms = document.querySelectorAll('form');

    // Сообщения о статусе отправки формы
    const MESSAGES = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        error: 'Что-то пошло не так...'
    };

    // Показывает сообщение о результате отправки формы
    const showThanksModal = (message) => {
        // Элемент модального окна
        const modalElem = document.querySelector('.modal');
        // Элемент диалоговой части окна
        const prevModalDialogElem = document.querySelector('.modal__dialog');
        // Скрываем диалоговую часть
        prevModalDialogElem.classList.add('hide');
        
        // Создаём элемент для сообщения
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        // Добавляем элемент с сообщением в модальное окно
        modalElem.append(thanksModal);
        // Открываем модалку
        openModal();

        // Через 4 секунды после показа удаляем элемент с сообщением, возвращаем диалоговую часть и закрываем окно
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialogElem.classList.remove('hide');
            closeModal();
        }, 4000);
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

    // Добавляет на форму обработчик для отправки на сервер
    const bindPostData = (form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // Показываем спиннер, пока происходит отправка данных
            const statusMessage = document.createElement('img');
            statusMessage.src = MESSAGES.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // Создаём объект FormData из формы
            let formData = new FormData(form);
            // Преобразуем FormData в JSON
            const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));

            // Отправляем запрос
            postData('http://localhost:3000/requests', formDataJson)
            .then((data) => {
                console.log(data);
                // Показываем сообщение об успехе и убираем спиннер
                showThanksModal(MESSAGES.success);
                statusMessage.src = '';
            })
            .catch(() => {
                // Показываем сообщение об ошибке и убираем спиннер
                showThanksModal(MESSAGES.error);
                statusMessage.src = '';
            })
            .finally(() => {
                // Очищаем форму
                form.reset();
            });
        });
    };

    // Добавляем всем формам обработчики для отправки данных
    forms.forEach((form) => {
        bindPostData(form);
    });
}

module.exports = forms;