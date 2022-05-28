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

//функции валидации
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

//функции активации/деактивации кнопки добавления карточки
function disableSubmitButton(addButton) {
  if (addButton) {
    addButton.classList.add('popup__button_disabled');
    addButton.disabled = true;
  }
};

function enableSubmitButton(addButton) {
  addButton.classList.remove('popup__button_disabled');
  addButton.disabled = false;
};

//функция состояния кнопки
function toggleButtonSubmitState(inputList, addButton) {
  if(hasInvalidInput(inputList)) {
    disableSubmitButton(addButton);
  }
  else {
    enableSubmitButton(addButton);
  }
};

const setEventListeners = (
  form,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  inputTextErrorSelector) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const addButton = form.querySelector(submitButtonSelector);
  
  toggleButtonSubmitState(inputList, addButton);
  
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, inputTextErrorSelector, inputErrorClass);
  
      toggleButtonSubmitState(inputList, addButton);
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
      selectors.inputErrorClass,
      selectors.inputTextErrorSelector);
  });
};
  
enableValidation(selectors);