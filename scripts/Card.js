export default class Card {
    _popupViewImage = document.querySelector('.popup_type_view-image');
    _viewImage = this._popupViewImage.querySelector('.popup__view-image');
    _viewDescription = this._popupViewImage.querySelector('.popup__description');
    
    constructor (data, selector) {
        this._data = data;
        this._selector = selector;

        this._buttonLikeClick = this._buttonLikeClick.bind(this);
        this._deleteCard = this._deleteCard.bind(this);
        this._handleEscPress = this._handleEscPress.bind(this);
    }

    _getElement() {
        this._element = document
          .querySelector(this._selector)
          .content
          .querySelector('.card')
          .cloneNode(true);
      }
    
    _handleEscPress(evt) {
        if (evt.key === 'Escape') {
          this._closePopup(this._popupViewImage);
        }
    };
    
    _closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener(`keydown`, this._handleEscPress);
    }
    
    _openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener(`keydown`, this._handleEscPress);
    };
    
    _openShowPhotoPopup({ name, link }) {
        this._viewImage.src = link;
        this._viewImage.alt = name;
        this._viewDescription.textContent = name;
    
        this._openPopup(this._popupViewImage);
    }
    
    // лайк карточки
    _buttonLikeClick() {
        this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
    }
    
    // удаление карточки
    _deleteCard() {
        this._element.remove();
    }
    
    // слушатели событий
    _setEventListeners() {
        const image = this._element.querySelector('.card__image');
        image.addEventListener('click', () => this._openShowPhotoPopup(this._data));
    
        const like = this._element.querySelector('.card__button-like');
        like.addEventListener('click', this._buttonLikeClick);
    
        const trash = this._element.querySelector('.card__button-delete');
        trash.addEventListener('click', this._deleteCard);
    }
    
    //создание карточки
    generate() {
        this._getElement();
        this._setEventListeners();
    
        const image = this._element.querySelector('.card__image');
        image.alt = this._data.name;
        image.src = this._data.link;
    
        this._element.querySelector('.card__name').textContent = this._data.name;
    
        return this._element;
    }
}