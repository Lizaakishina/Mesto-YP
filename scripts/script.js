let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup-form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup-form__fieldset-input_type_name');
let inputJob = document.querySelector('.popup-form__fieldset-input_type_job');

function openpopup(){
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function closepopup(){
   popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closepopup();
}

editButton.addEventListener('click', openpopup);
closeButton.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler);