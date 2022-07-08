import './index.css';
import {
  initialCards,
  formSelectors,
  userNameSelector,
  userJobSelector,
  userNameInput,
  userJobInput,
  profileEditButton,
  profileAddButton,
  cardListSection,
  cardTemplateSelector,
  popupViewImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector
} from '../utils/constants.js';

import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const formValidators = {};

const enableValidationForms = () => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const formValidator = new FormValidator(formSelectors, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidationForms();

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector
});

const popupWithImage = new PopupWithImage(popupViewImageSelector);
popupWithImage.setEventListeners();

const createCard = ({ name, link}) => {
  const card = new Card({
    name,
    link,
    handleCardClick: () => {
        popupWithImage.open({ name, link});
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
    }
  },
  cardListSection
);

cardList.renderedItems();

const popupEditProfile = new PopupWithForm({
    handleSubmit: inputValues => {
      userInfo.setUserInfo(inputValues);
      popupEditProfile.close();
    }
  },
  popupEditProfileSelector
);

popupEditProfile.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formValidators['formEditProfile'].resetValidation();
  popupEditProfile.open();
});

const popupAddCard = new PopupWithForm({
    initializeForm: () => {
      formValidators['formAddCard'].resetValidation();
    },
    handleSubmit: inputValues => {
      userInfo.setUserInfo(inputValues);
      const inputValue = popupAddCard._getInputValues();
      const cardItem = {
        name: inputValue['card-name'],
        link: inputValue['card-link']
      };

      const cardElement = createCard(cardItem);
      cardList.addItem(cardElement);
      popupAddCard.close();
    }
  },
  popupAddCardSelector,
);
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', () => {
  formValidators['formAddCard'].resetValidation();
  popupAddCard.open();
});