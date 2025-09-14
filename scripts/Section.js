
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    if (typeof renderer !== 'function') {
      throw new Error('Section: renderer debe ser una función');
    }
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    if (!this._container) {
      throw new Error(`Section: no se encontró el contenedor ${containerSelector}`);
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element, { prepend = false } = {}) {
    if (!(element instanceof Element)) return;
    prepend ? this._container.prepend(element) : this._container.append(element);
  }
}

