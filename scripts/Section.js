export default class Section {

    constructor({ items, renderer }, containerSelector){
  this._items = items;
  this._renderer = renderer;
  this._containerSelector = document.querySelector(containerSelector);
    }
    
    rendererItems(){
   this._items.forEach( item => {
    const element = this._renderer(item);
   this.addItem(element);
   });
    }

    addItem(){
   this._containerSelector.append(element)
    }
}