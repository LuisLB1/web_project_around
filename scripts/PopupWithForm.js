
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(elementOrSelector, handleFormSubmit) {
    super(elementOrSelector);
    if (typeof handleFormSubmit !== 'function') {
      throw new Error('PopupWithForm requiere un callback handleFormSubmit');
    }
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.popup__form');
    if (!this._form) throw new Error('PopupWithForm: no se encontró .popup__form');

    this._inputList = this._form.querySelectorAll('input, textarea');
    this._submitButton = this._form.querySelector('[type="submit"]');
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      const key = input.name?.trim() || input.id?.trim();
      if (key) values[key] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data = {}) {
    this._inputList.forEach((input) => {
      const key = input.name?.trim() || input.id?.trim();
      if (key && key in data) input.value = data[key];
    });
  }

  setLoading(isLoading, loadingText = 'Guardando...') {
    if (!this._submitButton) return;
    if (!this._submitButton.dataset.defaultText) {
      this._submitButton.dataset.defaultText = this._submitButton.textContent;
    }
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._submitButton.dataset.defaultText;
  }
}


