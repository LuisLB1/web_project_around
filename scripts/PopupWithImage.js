
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(elementOrSelector) {
    super(elementOrSelector);
    this._image = this._popup.querySelector('.template__imagen-emergente');
    if (!this._image) {
      throw new Error('PopupWithImage: falta .template__imagen-emergente');
    }
  }

  open({ name, link }) {
    const src = String(link ?? '').trim();
    const altName = String(name ?? '').trim();
    if (!src) return;
    this._image.src = src;
    this._image.alt = `Imagen de ${altName || 'Imagen'}`;
    super.open();
  }
}

