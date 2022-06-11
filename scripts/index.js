import {initialCards} from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formSelectors = {
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  submitButtonSelector: '.popup__button_type_submit',
  inputErrorClass: 'popup__input_type_error',
  inputTextErrorSelector: '.popup__input-error'
};

const gallery = document.querySelector('.cards');

//переменные профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit');
const profileAddButton = document.querySelector('.profile__add');

//для попапа редактирования информации
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_user-name');
const inputJob = formProfile.querySelector('.popup__input_type_user-job');

//для попапа добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const addInputName = formAddCard.querySelector('.popup__input_type_card-name');
const addInputLink = formAddCard.querySelector('.popup__input_type_card-link');
const nameCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-name');
const linkCardInputErrorText = formAddCard.querySelector('.popup__input-error_type_card-link');

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', buttonEscClosePopup); 
  document.addEventListener('click', buttonOverlayClosePopup); 
};

function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', buttonEscClosePopup); 
  document.removeEventListener('click', buttonOverlayClosePopup); 
}; 

//функции закрытия попапов
function buttonEscClosePopup(evt) {
  if (evt.key !== 'Escape') return;
  const openedPopup = document.querySelector('.popup_opened');

  if (!openedPopup.classList.contains('popup_opened')) return;

  closePopup(openedPopup);
};

function buttonOverlayClosePopup(evt) {
  const overlayPopup = evt.target;

  if (!overlayPopup.classList.contains('popup_opened')) return;

  closePopup(overlayPopup);
};

//функции инициализации и открытий форм
const initializeFormProfile = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  inputName.dispatchEvent(new Event('input'));
  inputJob.dispatchEvent(new Event('input'));
};

const buttonEditClick = () => {
  initializeFormProfile();
  openPopup(popupProfile);
};

const initializeFormAddCard = () => {
  formAddCard.reset();
  addInputName.dispatchEvent(new Event('input'));
  addInputLink.dispatchEvent(new Event('input'));
  nameCardInputErrorText.textContent = '';
  linkCardInputErrorText.textContent = '';
};

const buttonAddClick = () => {
  initializeFormAddCard();
  openPopup(popupAddCard);
};

const buttonClosePopup = evt => {
  const buttonClosePopup = evt.target;

  if (!buttonClosePopup.classList.contains('popup__button-close')) {
    return;
  }

  const popup = buttonClosePopup.closest('.popup');

  if (popup) {
    popup.classList.remove('popup_opened');
  }
};

function onFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

const createCard = (card) => {
  const cardElement = new Card(card, '.template-card');
  return cardElement;
}

const renderCard = (card) => {
  gallery.prepend(createCard(card).generateCard());
};

function renderCards(cards) {
  cards.forEach(card => renderCard(card));
};

const onFormSubmitAddCard = evt => {
  evt.preventDefault();
  const card = {};
  card.name = addInputName.value;
  card.link = addInputLink.value;
  renderCard(card);
  closePopup(popupAddCard);
};

const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const formValidator = new FormValidator(formSelectors, form);
    formValidator.enableValidation();
  });
};

// реакции на кнопки открытия попапов
profileEditButton.addEventListener('click', buttonEditClick);
profileAddButton.addEventListener('click', buttonAddClick);

// реакции на кнопки закрытия попапов
document.addEventListener('click', buttonClosePopup);
document.addEventListener('mousedown', buttonOverlayClosePopup);

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

renderCards(initialCards);
enableValidationForms();