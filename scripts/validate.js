const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    inputTextErrorSelector: '.popup__input-error'
  };

//функция вывода ошибки
function showInputError(input, inputTextErrorSelector, inputErrorClass) {
    const inputError = document.querySelector(`${inputTextErrorSelector}_type_${input.id}`);
  
    input.classList.add(inputErrorClass);
    inputError.textContent = input.validationMessage;
};

//функция сокрытия ошибки
function hideInputError(input, inputTextErrorSelector, inputErrorClass) {
    const inputError = document.querySelector(`${inputTextErrorSelector}_type_${input.id}`);
  
    input.classList.remove(inputErrorClass);
    inputError.textContent = '';
};
  
function isValid(input, inputTextErrorSelector, inputErrorClass) {
    if (!input.validity.valid) {
      showInputError(input, inputTextErrorSelector, inputErrorClass);
    } else {
      hideInputError(input, inputTextErrorSelector, inputErrorClass);
    }
};
  
function hasInvalidInput(inputList) {
    return inputList.some(input => {
      return !input.validity.valid;
    });
};
  
function toggleButtonSubmitState(inputList, buttonSubmit, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
      buttonSubmit.classList.add(inactiveButtonClass);
      buttonSubmit.disabled = true;
    } else {
      buttonSubmit.classList.remove(inactiveButtonClass);
      buttonSubmit.disabled = false;
    }
};
  
const setEventListeners = (
    form,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    inputTextErrorSelector) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonSubmit = form.querySelector(submitButtonSelector);
  
    toggleButtonSubmitState(inputList, buttonSubmit, inactiveButtonClass);
  
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        isValid(input, inputTextErrorSelector, inputErrorClass);
  
        toggleButtonSubmitState(inputList, buttonSubmit, inactiveButtonClass);
      });
    });
};
  
function enableValidation(selectors) {
    const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  
    forms.forEach(form => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(
        form,
        selectors.inputSelector,
        selectors.submitButtonSelector,
        selectors.inactiveButtonClass,
        selectors.inputErrorClass,
        selectors.inputTextErrorSelector);
   });
};
  
enableValidation(selectors);