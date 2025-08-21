export default class FormValidator {
  
  #config;
  #form;
  #inputList;
  #submitButton;

  
  constructor(config, formElement) {
    this.#config = config;
    this.#form = formElement;

    
    this.#inputList = Array.from(
      this.#form.querySelectorAll(this.#config.inputSelector)
    );
    this.#submitButton = this.#form.querySelector(
      this.#config.submitButtonSelector
    );
  }

  
  enableValidation() {
    this.#setEventListeners();
    this.#toggleButtonState(); 
  }

  
  resetValidation() {
    this.#inputList.forEach((input) => {
      const errorElement = this.#form.querySelector(`#${input.id}-error`);
      this.#hideInputError(input, errorElement);
    });
    this.#toggleButtonState();
  }

  #setEventListeners() {
    this.#inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    });
  }

  
  #checkInputValidity(input) {
    const errorElement = this.#form.querySelector(`#${input.id}-error`);

    if (!input.validity.valid) {
      this.#showInputError(input, errorElement, input.validationMessage);
    } else {
      this.#hideInputError(input, errorElement);
    }
  }

  
  #showInputError(input, errorElement, message) {
    input.classList.add(this.#config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add(this.#config.errorClass);
    }
  }

  
  #hideInputError(input, errorElement) {
    input.classList.remove(this.#config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove(this.#config.errorClass);
    }
  }

 
  #hasInvalidInput() {
    return this.#inputList.some((input) => !input.validity.valid);
  }

  
  #toggleButtonState() {
    if (!this.#submitButton) return;

    if (this.#hasInvalidInput()) {
      this.#submitButton.classList.add(this.#config.inactiveButtonClass);
      this.#submitButton.disabled = true;
    } else {
      this.#submitButton.classList.remove(this.#config.inactiveButtonClass);
      this.#submitButton.disabled = false;
    }
  }
}