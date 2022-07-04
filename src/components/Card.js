export default class Card {
    constructor({ name, link, handleCardClick}, cardSelector) {
      this._name = name;
      this._link = link;
      this._handleCardClick = handleCardClick;
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
      this._cardElement.remove();
      this._cardElement = null;
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
      this._setEventListeners();
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardName.textContent = this._name;
  
      return this._cardElement;
    }
  }