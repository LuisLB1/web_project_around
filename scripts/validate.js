
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function enableValidation(config){
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) =>{
        setEventListeners(form, config);
    })
};


function setEventListeners(formElement, config){
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputElement)=>{
    inputElement.addEventListener("input",()=>{
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

function checkInputValidity(formElement, inputElement, config){
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, errorElement, config);
  }
}

function showInputError (formElement, inputElement, errorElement, errorMessage, config){
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputList, buttonElement, config){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
}