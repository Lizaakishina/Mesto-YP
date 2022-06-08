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
const profileEditButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAddButton = document.querySelector('.profile__add');
const profileJob = document.querySelector('.profile__description');

//для попапа редактирования информации
const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formProfile = popupProfile.querySelector('.popup__form');
const inputName = formProfile.querySelector('.popup__input_type_user-name');
const inputJob = formProfile.querySelector('.popup__input_type_user-job');

//для попапа добавления карточек
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__button-close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const addInputName = formAddCard.querySelector('.popup__input_type_card-name');
const addInputLink = formAddCard.querySelector('.popup__input_type_card-link');
const addButton = formAddCard.querySelector('.popup__button');

//для попапа добавления картинки
const popupViewImage = document.querySelector('.popup_type_view-image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__button-close');

//функции закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', buttonEscClosePopup);
  document.addEventListener('click', buttonOverlayClosePopup);
};

function buttonEditClick() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
};

function disableSubmitButton(addButton) {
  if (addButton) {
    addButton.classList.add('popup__button_disabled');
    addButton.disabled = true;
  }
};

function buttonAddClick() {
  formAddCard.reset();
  disableSubmitButton(addButton);
  openPopup(popupAddCard);
};

//функции закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', buttonEscClosePopup);
  document.removeEventListener('click', buttonOverlayClosePopup);
};

function buttonEscClosePopup(evt) {
  if (evt.key !== 'Escape') return;
  const openPopups = Array.from(document.querySelectorAll('.popup_opened'));

  openPopups.forEach(popup => {
    closePopup(popup);
  });
};

function buttonOverlayClosePopup(evt) {
  const overlayPopup = evt.target;
  if (!overlayPopup.classList.contains('popup_opened')) return;
  closePopup(overlayPopup);
};

const onButtonClosePopupProfile = () => closePopup(popupProfile);

const onButtonClosePopupViewImage = () => closePopup(popupViewImage);

const onButtonClosePopupAddCard = () => closePopup(popupAddCard);

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
buttonClosePopupProfile.addEventListener('click', onButtonClosePopupProfile);
buttonClosePopupAddCard.addEventListener('click', onButtonClosePopupAddCard);
buttonClosePopupViewImage.addEventListener('click', onButtonClosePopupViewImage);

//функции отправки формы
function onFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

function onFormSubmitAddCard (evt) {
  evt.preventDefault();
  addCard();
  closePopup(popupAddCard);
};

function renderCards(cards) {
  cards.reverse().forEach((card) => gallery.append(new Card(card, ".template-card").generate()))
}

function addCard() {
  const newCard = new Card({
    name: addInputName.value,
    link: addInputLink.value,
  }, ".template-card");
  gallery.prepend(newCard.generate());
}

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

renderCards(initialCards);
enableValidationForms();