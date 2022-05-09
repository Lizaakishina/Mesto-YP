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
const editButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//для попапа редактирования информации
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup-form');
const inputName = document.querySelector('.popup-form__fieldset-input_type_name');
const inputJob = document.querySelector('.popup-form__fieldset-input_type_job');

//для попапа добавления карточек
const addPopup = document.querySelector('.popupadd');
const addButton = document.querySelector('.profile__add');
const addCloseButton = document.querySelector('.popupadd__close');
const addPopupFormElement = document.querySelector('.popupadd-form');
const addInputName = document.querySelector('.popupadd-form__fieldset-input_type_name');
const addInputLink = document.querySelector('.popupadd-form__fieldset-input_type_link');

//для попапа добавления картинки
const viewPopup = document.querySelector('.popup-view');
const viewCloseButton = document.querySelector('.popup-view__close');
const viewImage = document.querySelector('.popup-view__image');
const viewDescription = document.querySelector('.popup-view__description');

//функции, относящиеся к попапу редактирования
function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

function closePopup() {
   popup.classList.remove('popup_opened');
}

function profileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', profileFormSubmitHandler);

//функции, относящиеся к попапу добавления карточки
function openPopupAdd() {
  addPopup.classList.add('popupadd_opened');
}

function closePopupAdd() {
 addPopup.classList.remove('popupadd_opened');
}

function formSubmitAddCard (evt) {
  evt.preventDefault();
  addInputName.value = '';
  addInputLink.value = '';
  const card = {};
  card.name = addInputName.value;
  card.link = addInputLink.value;
  renderCard(card);
  closePopupAdd();
};

addButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', closePopupAdd);
addPopupFormElement.addEventListener('submit', formSubmitAddCard);

//функции, относящиеся к попапу картинки
function closePopupView() {
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
function buttonLikeClick(evt) {
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

renderCards(initialCards);