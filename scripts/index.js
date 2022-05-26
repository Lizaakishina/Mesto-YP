const templateCard = document.querySelector('.template-card').content;
const card = document.querySelector('.cards');

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
const viewImage = popupViewImage.querySelector('.popup__view-image');
const viewDescription = popupViewImage.querySelector('.popup__description');

//функции закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  disableSaveButton();
  document.addEventListener('keydown', buttonEscClosePopup);
  document.addEventListener('click', buttonOverlayClosePopup);
};

function viewImagePopup(newCard) {
  viewImage.src = newCard.link;
  viewImage.alt = newCard.name;
  viewDescription.textContent = newCard.name;
  openPopup(popupViewImage);
};

function buttonEditClick() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
};

function buttonAddClick() {
  formAddCard.reset();
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
  const newCard = {};
  newCard.name = addInputName.value;
  newCard.link = addInputLink.value;
  renderCard(newCard);
  closePopup(popupAddCard);
};

//функция лайка
function buttonLikeClick(evt) {
  evt.target.classList.toggle('card__button-like_active');
};

//функция дизейбла кнопки
function disableSaveButton() {
  addButton.classList.add('popup__button_disabled');
  addButton.setAttribute('disabled', 'disabled');
};

//функции карт
function createCard(newCard) {
    //переменные для создания карточек, нужные только в этой функции
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__name');
    const cardButtonDelete = cardElement.querySelector('.card__button-delete');
    const cardButtonLike = cardElement.querySelector('.card__button-like');
  
    cardImage.src = newCard.link;
    cardImage.alt = newCard.name;
    cardImage.addEventListener('click', () => viewImagePopup(newCard));
    cardName.textContent = newCard.name;
    cardButtonDelete.addEventListener('click', deleteCard);
    cardButtonLike.addEventListener('click', buttonLikeClick);
    return cardElement;
};

function deleteCard(evt) {
  const newCard = evt.target.closest('.card');
  newCard.remove();
};

//функции отображения
function renderCard(newCard) {
  card.prepend(createCard(newCard));
};

function renderCards(card) {
  card.forEach(newCard => renderCard(newCard));
};

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

renderCards(initialCards);