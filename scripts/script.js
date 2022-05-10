const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];  

const templateCard = document.querySelector('.template-card').content;
const cards = document.querySelector('.cards');

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

//для попапа добавления картинки
const popupViewImage = document.querySelector('.popup_type_view-image');
const buttonClosePopupViewImage = popupViewImage.querySelector('.popup__button-close');
const viewImage = popupViewImage.querySelector('.popup__view-image');
const viewDescription = popupViewImage.querySelector('.popup__description');

//функции открытия и закрытия всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function viewImagePopup(card) {
  viewImage.src = card.link;
  viewImage.alt = card.name;
  viewDescription.textContent = card.name;
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
  const card = {};
  card.name = addInputName.value;
  card.link = addInputLink.value;
  renderCard(card);
  closePopup(popupAddCard);
};

//прочие функции
function buttonLikeClick(evt) {
  evt.target.classList.toggle('card__button-like_active');
};

//функции карт
function createCard(card) {
    //переменные для создания карточек, нужные только в этой функции
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__name');
    const cardButtonDelete = cardElement.querySelector('.card__button-delete');
    const cardButtonLike = cardElement.querySelector('.card__button-like');
  
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => viewImagePopup(card));
    cardName.textContent = card.name;
    cardButtonDelete.addEventListener('click', deleteCard);
    cardButtonLike.addEventListener('click', buttonLikeClick);
    return cardElement;
};

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

//функции отображения
function renderCard(card) {
  cards.prepend(createCard(card));
};

function renderCards(cards) {
  cards.forEach(card => renderCard(card));
};

// отправка формы
formProfile.addEventListener('submit', onFormSubmitProfile);
formAddCard.addEventListener('submit', onFormSubmitAddCard);

renderCards(initialCards);