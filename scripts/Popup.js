
import { abrirOverlay, cerrarOverlay } from './utils.js';

export default class Popup {
  constructor(elementOrSelector) {
    this._popup =
      typeof elementOrSelector === 'string'
        ? document.querySelector(elementOrSelector)
        : elementOrSelector;

    if (!this._popup) throw new Error('Popup: no se encontró el overlay');

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePointer = this._handlePointer.bind(this);
  }

  open() {
    abrirOverlay(this._popup);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    cerrarOverlay(this._popup);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _handlePointer(evt) {
    const clickedOverlay = evt.target === this._popup;
    const closeBtn = evt.target.closest('.popup__close, .popup2__close, #cerrarImagen');
    if (clickedOverlay || closeBtn) this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handlePointer);
    this._popup.addEventListener('mousedown', this._handlePointer);
  }
}



