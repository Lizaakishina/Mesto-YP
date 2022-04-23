let profile = document.querySelector('.profile');
let editbutton = profile.querySelector('.profile__edit');

let popupopen = document.querySelector('.popup');
let closebutton = document.querySelector('.popup__close');

let popupdiv = document.querySelector('.popup-div');

let element = document.querySelector('.element');
let like = element.querySelector('.element__like');
function openpopup(){
    popupopen.setAttribute('opened', true);
    popupopen.classList.add('popup_opened');
    popupdiv.setAttribute('opened');
    popupdiv.classList.add('popup-div_opened');
}
editbutton.addEventListener('click', openpopup);

function closepopup(){
   popupopen.removeAttribute('opened');
   popupopen.classList.remove('popup_opened');
   popupdiv.removeAttribute('opened');
   popupdiv.classList.remove('popup-div_opened');
}
closebutton.addEventListener('click', closepopup);

// Находим форму в DOM
let formElement = popup.querySelector('.popup__fieldset');
// Находим поля формы в DOM
let nameInput = popup__fieldset.querySelector('.popup__fieldset__input');
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);