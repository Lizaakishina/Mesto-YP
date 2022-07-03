import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ initializeForm, handleSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._initializeForm = initializeForm;
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll('input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList
      .forEach(item => {
        inputValues[item.name] = item.value;
      });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
    // если я использую предложенный вами вариант, то при нажатии на сохранить слетает сайт
    // this._form.addEventListener('submit', () => this._handleSubmit(this._getInputValues()));
  }

  /*
  я не поняла как должен работать этот метод, у меня не заработал (
  setInputValues(data) {
    this._inputList.forEach((input) =>{
    // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
    input.value = data[input.name];
    });
  }*/

  open() {
    this._initializeForm();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
};