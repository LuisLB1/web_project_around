
export default class Card {
  
  #name;             
  #link;              
  #templateSelector;  
  #onPreview;         

  #element;           
  #likeButton;        
  #deleteButton;     
  #image;             
  #title;             

  
  constructor(data, templateSelector, onPreview) {
    
    this.#name = data.name;
    this.#link = data.link;
    this.#templateSelector = templateSelector;
    this.#onPreview = onPreview;

    
    this.#element = this.#getTemplate();
    this.#likeButton = this.#element.querySelector('.corazon-img');
    this.#deleteButton = this.#element.querySelector('.main__image-trash');
   
    this.#image = this.#element.querySelector('img.place');
    this.#title = this.#element.querySelector('.main__grid-text');

   
    this.#title.textContent = this.#name;
    this.#image.src = this.#link;
    
    this.#image.alt = `Imagen de ${this.#name}`;

    
    this.#setEventListeners();
  }

 
  getView() {
    return this.#element;
  }

 
  #getTemplate() {
    const template = document.querySelector(this.#templateSelector);
    if (!template) {
      throw new Error(`No se encontró el template: ${this.#templateSelector}`);
    }
    const fragment = template.content.cloneNode(true);
    const root = fragment.querySelector('.main__grid-elements');
    if (!root) {
      throw new Error('El template no contiene .main__grid-elements como raíz');
    }
    return root;
  }

 
  #setEventListeners() {
    
    if (this.#likeButton) {
      this.#likeButton.addEventListener('click', () => this.#handleLike());
    }

    
    if (this.#deleteButton) {
      this.#deleteButton.addEventListener('click', () => this.#handleDelete());
    }

    
    if (this.#image) {
      this.#image.addEventListener('click', () => this.#handlePreview());
    }
  }

  
  #handleLike() {
    this.#likeButton.classList.toggle('activo');
  }


  #handleDelete() {
    this.#element.remove();
    
  }


  #handlePreview() {
    if (typeof this.#onPreview === 'function') {
      this.#onPreview(this.#link, this.#name);
    }
  }
}