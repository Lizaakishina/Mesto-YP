let popup = document.querySelector('.popup');
let editbutton = document.querySelector('.profile__edit');
let closebutton = document.querySelector('.popup__close');
function openpopup(){
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}
function closepopup(){
   popup.classList.remove('popup_opened');
}
let formElement = document.querySelector('.popup-form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup-fieldset__input_name');
let inputJob = document.querySelector('.popup-fieldset__input_job');
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closepopup();
}
editbutton.addEventListener('click', openpopup);
closebutton.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler);