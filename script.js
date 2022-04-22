let page = document.querySelector('.page');
let profile = document.querySelector('.profile');
let editbutton = profile.querySelector('.profile__edit');
let popupopen = document.querySelector('.popup');
let closebutton = document.querySelector('.popup__close');

function openpopup(){
    popupopen.setAttribute('opened', true);
    popupopen.classList.add('popup_opened');
}
editbutton = addEventListener('click', openpopup);

function closepopup(){
    popupopen.removeAttribute('opened');
    popupopen.classList.remove('popup_opened');
}
//closebutton = addEventListener('click', closepopup);