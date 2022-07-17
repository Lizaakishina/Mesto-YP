export default class Card {
    constructor({ name, link, likes = [], _id, owner = false, handleCardClick, removeCard}, cardSelector) {
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._id = _id;
      this._owner = owner;
      this._handleCardClick = handleCardClick;
      this._removeCard = removeCard.bind(this);
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }
  
    _handleButtonLike = evt => {
      evt.target.classList.toggle('card__button-like_active');
    }
  
    _handleButtonRemoveCard = () => {
      this._removeCard(this._id);
      const card = evt.target.closest('.card');
      card.remove();
    }
  
    _setEventListeners() {
      this._cardElement.querySelector('.card__button-like').addEventListener('click', (evt) => this._handleButtonLike(evt));
  
      this._cardElement.querySelector('.card__button-delete').addEventListener('click', (evt) => this._handleButtonRemoveCard(evt));
  
      this._cardImage.addEventListener('click', () => this._handleCardClick());
    }
  
    generateCard() {
      this._cardElement = this._getTemplate();
      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardName = this._cardElement.querySelector('.card__name');
      this._cardLikes = this._cardElement.querySelector('.card__count-like');
      this._cardButtonRemove = this._cardElement.querySelector('.card__button-delete');
      this._setEventListeners();
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardName.textContent = this._name;
      this._cardLikes.textContent = this._likes.length;
  
      if(!this._owner) {
        cardButtonRemove.remove();
      }

      return this._cardElement;
    }
  }