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

//для попапа редактирования информации
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup-form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup-form__fieldset-input_type_name');
let inputJob = document.querySelector('.popup-form__fieldset-input_type_job');

//для попапа добавления карточек
let addPopup = document.querySelector('.popupadd');
let addButton = document.querySelector('.profile__add');
let addCloseButton = document.querySelector('.popupadd__close');
let addFormElement = document.querySelector('.popupadd-form');
let addInputName = document.querySelector('.popupadd-form__fieldset-input_type_name');
let addInputLink = document.querySelector('.popupadd-form__fieldset-input_type_link');

//для попапа добавления картинки
let viewPopup = document.querySelector('.popup-view');
let viewCloseButton = document.querySelector('.popup-view__close');
let viewImage = document.querySelector('.popup-view__image');
let viewDescription = document.querySelector('.popup-view__description');

//функции, относящиеся к попапу редактирования
function openPopup(){
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function closePopup(){
   popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

//функции, относящиеся к попапу добавления карточки
function openPopupAdd(){
  addPopup.classList.add('popupadd_opened');
}

function closePopupAdd(){
 addPopup.classList.remove('popupadd_opened');
}

function formSubmitAddCard (evt) {
  evt.preventDefault();
  const card = {};
  card.name = addInputName.value;
  card.link = addInputLink.value;
  renderCard(card);
  closePopupAdd();
};

addButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', closePopupAdd);
addFormElement.addEventListener('submit', formSubmitAddCard);

//функции, относящиеся к попапу картинки
function closePopupView(){
  viewPopup.classList.remove('popup-view_opened');
}

function viewImagePopup(card) {
  viewImage.src = card.link;
  viewImage.alt = card.name;
  viewDescription.textContent = card.name;
  viewPopup.classList.add('popup-view_opened');
};

viewImage.addEventListener('click', viewImagePopup);
viewCloseButton.addEventListener('click', closePopupView);

//прочие функции
function buttonLike(evt) {
  evt.target.classList.toggle('card__button-like_active');
};

//функции, связанные с добавлением, удалением карточек
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
    cardButtonLike.addEventListener('click', buttonLike);
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

renderCards(initialCards);