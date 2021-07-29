'use strict';

// Калькулятор калорий
function calc () {
    // Элемент калькулятора
    const calculatorElem = document.querySelector('.calculating__field');
    // Элемент с выбором пола
    const genderElem = calculatorElem.querySelector('#gender');
    // Элемент с выбором конституции
    const constitutionElem = calculatorElem.querySelector('#constitution');
    // Элемент с выбором физ. активности
    const activityElem = calculatorElem.querySelector('#activity');
    // Элемент, содержащий число - результат вычислений
    const calculatingResultNumElem = calculatorElem.querySelector('.calculating__result > span');
    // Коэффициенты активности
    const ACTIVITY_COEFFICIENTS = {
        low: 1.2,
        small: 1.375,
        medium: 1.55,
        high: 1.725
    };

    // Рассчитывает калорийность
    const calcCalories = (gender, weight, height, age, activity) => {
        // Если отсутствует хотя бы один параметр, отменяем расчеты
        if (!gender || !weight || !height || !age || !ACTIVITY_COEFFICIENTS[activity]) {
            return false;
        }
        let result;
        if (gender === 'male') {
            result = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        } else if (gender === 'female') {
                result = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        }
        return Math.round(result * ACTIVITY_COEFFICIENTS[activity]);
    };

    // Получает данные из формы
    const getCalcData = () => {
        const gender = genderElem.querySelector('[data-active]').dataset.gender;
        const weight = Number(constitutionElem.querySelector('#weight').value);
        const height = Number(constitutionElem.querySelector('#height').value);
        const age = Number(constitutionElem.querySelector('#age').value);
        const activity = activityElem.querySelector('[data-active]').dataset.activity;
        return {gender, weight, height, age, activity};
    };

    // Обновляет выводимое количество калорий
    const updateCalories = () => {
        // Получаем данные
        const data = getCalcData();
        // Рассчитываем калории
        const calories = calcCalories(data.gender, data.weight, data.height, data.age, data.activity);
        // Выводим результат на страницу
        if (calories && isFinite(calories)) {
            calculatingResultNumElem.textContent = calories;
        } else {
            calculatingResultNumElem.textContent = '_____';
        }
    };

    // Деактивирует кнопку
    const deactivateButton = (button) => {
        button.classList.remove('calculating__choose-item_active');
        button.removeAttribute('data-active');
    };

    // Деактивирует группу кнопок
    const deactivateButtonsGroup = (buttonsGroupElem) => {
        const buttons = buttonsGroupElem.querySelectorAll('.calculating__choose-item');
        buttons.forEach((button) => {
            deactivateButton(button);
        });
    };

    // Активирует кнопку
    const activateButton = (button) => {
        button.classList.add('calculating__choose-item_active');
        button.setAttribute('data-active', '');
    };

    // Переключает кнопку
    const switchButton = (id) => {
        // Целевая кнопка
        const targetButton = calculatorElem.querySelector(`#${id}`);
        // Группа кнопок, в которой происходит переключение
        const targetButtonGroup = targetButton.closest('.calculating__choose');
        // Деактивируем все кнопки в группе
        deactivateButtonsGroup(targetButtonGroup);
        // Активируем целевую кнопку
        activateButton(targetButton);
        // Сохраняем данные в localStorage
        localStorage.setItem(targetButtonGroup.id, id);
    };

    // Устанавливает начальное положение кнопок
    const setStartButtons = () => {
        if (localStorage.getItem('gender')) {
            switchButton(localStorage.getItem('gender'));
        }
        if (localStorage.getItem('activity')) {
            switchButton(localStorage.getItem('activity'));
        }
    };

    // Помечает поле как ошибочное
    const setErrorField = (field) => {
        field.classList.add('calculating__choose-item_error');
    };

    // Убирает пометку поля как ошибочного
    const removeErrorField = (field) => {
        field.classList.remove('calculating__choose-item_error');
    };

    // Проверяет есть ли ошибка в введённом в поле значении и помечает его соответствующим образом
    const validateField = (field) => {
        // Если введено что-то, кроме чисел, то помечаем поле как ошибочное
        if (field.value.match(/\D/g)) {
            setErrorField(field);
        } else {
            removeErrorField(field);
        }
    };

    // Вешаем обработчики изменения значений формы
    genderElem.addEventListener('click', (evt) => {
        const targetButton = evt.target.closest('.calculating__choose-item');
        if (targetButton) {
            switchButton(targetButton.id);
            updateCalories();
        }
    });

    constitutionElem.addEventListener('input', (evt) => {
        const targetField = evt.target.closest('.calculating__choose-item');
        if (targetField) {
            validateField(targetField);
            updateCalories();
        }
    });

    activityElem.addEventListener('click', (evt) => {
        const targetButton = evt.target.closest('.calculating__choose-item');
        if (targetButton) {
            switchButton(targetButton.id);
            updateCalories();
        }
    });

    setStartButtons();
    updateCalories();
}

module.exports = calc;