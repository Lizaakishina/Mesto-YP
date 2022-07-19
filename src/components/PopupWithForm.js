import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({initializeForm = () => {}, handleSubmit = () => {}}, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__button_type_submit');
    this._buttonSubmitTextDefault = this._buttonSubmit.textContent;
    this._initializeForm = initializeForm;
    this._handleSubmit = handleSubmit;
    this._submitButton = this._form.querySelector('.popup__button_type_submit')
    this._inputList = this._form.querySelectorAll('input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(item => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setInputValues(userData) {
    this._inputList.forEach(input => {
      input.value = userData[input.name];
    });
  }

  setTextButtonSubmit(text) {
    this._buttonSubmit.textContent = text;
  }

  setHandleSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues())
    });
  }

  open() {
    this._buttonSubmit.textContent = this._buttonSubmitTextDefault;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}