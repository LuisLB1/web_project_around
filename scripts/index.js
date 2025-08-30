

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  abrirOverlay,
  cerrarOverlay,
  cerrarOverlayAlClickFondo,
  habilitarCierrePorEsc,
  prepararOverlay,
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
 
  const btnAbrirPerfil = document.querySelector('.main__profile-button');
  const overlayPerfil = document.querySelector('.popup-overlay');
  const btnCerrarPerfil = overlayPerfil?.querySelector('.popup__close');

  const formEditarPerfil = overlayPerfil?.querySelector('.popup__form');
  const inputNombre = overlayPerfil?.querySelector('#inputName');
  const inputAcercaDeMi = overlayPerfil?.querySelector('#acercaDemipopup');

  const nameAuthor = document.getElementById('nameJ');
  const pAcercaDeMi = document.getElementById('acercaDemi');

  const contenedorTarjetas = document.querySelector('.main__grid');
  const btnAbrirNuevoLugar = document.querySelector('.main__add-button');

  
  const overlayImagen = document.querySelector('.template__imagen-overlay');
  const imagenEmergente = overlayImagen?.querySelector('.template__imagen-emergente');
  const btnCerrarImagen = overlayImagen?.querySelector('#cerrarImagen');

  
  const popupNuevoLugarTemplate = document.getElementById('popup-template');
  
  const tarjetaTemplateSelector = '#tarjetas-template';

  
  function handleImagePreview(link ) {
    if (!overlayImagen || !imagenEmergente) return;
    imagenEmergente.src = link;
    abrirOverlay(overlayImagen);
  }

  
  prepararOverlay(overlayImagen, btnCerrarImagen, () => {
    if (imagenEmergente) imagenEmergente.src = '';
  });

 
  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

  
  let perfilValidator = null;
  if (formEditarPerfil) {
    perfilValidator = new FormValidator(validationConfig, formEditarPerfil);
    perfilValidator.enableValidation();
  }

 
  btnAbrirPerfil?.addEventListener('click', () => {
    
    if (inputNombre) inputNombre.value = nameAuthor?.textContent?.trim() || '';
    if (inputAcercaDeMi) inputAcercaDeMi.value = pAcercaDeMi?.textContent?.trim() || '';
    
    perfilValidator?.resetValidation?.();
    abrirOverlay(overlayPerfil);
  });

  prepararOverlay(overlayPerfil, btnCerrarPerfil);

  formEditarPerfil?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoNombre = inputNombre?.value?.trim();
    const nuevoTexto = inputAcercaDeMi?.value?.trim();

    if (nameAuthor) nameAuthor.textContent = nuevoNombre || 'Jacques Cousteau';
    if (pAcercaDeMi) pAcercaDeMi.textContent = nuevoTexto || 'Explorador';

    cerrarOverlay(overlayPerfil);
  });

  habilitarCierrePorEsc('.popup-overlay, .popup-overlay2, .template__imagen-overlay');

 
  const datosIniciales = Array.from(
    contenedorTarjetas.querySelectorAll('.main__grid-elements')
  ).map((el) => {
    const img = el.querySelector('img.place');
    const title = el.querySelector('.main__grid-text');
    return {
      name: title?.textContent?.trim() || '',
      link: img?.getAttribute('src') || '',
    };
  });

  
  contenedorTarjetas.innerHTML = '';

 
  datosIniciales.forEach((data) => {
    const card = new Card(data, tarjetaTemplateSelector, handleImagePreview);
    contenedorTarjetas.appendChild(card.getView());
  });


  btnAbrirNuevoLugar?.addEventListener('click', () => {
    if (!popupNuevoLugarTemplate) return;

    
    const clone = popupNuevoLugarTemplate.content.cloneNode(true);
    const overlayNuevo = clone.querySelector('.popup-overlay2');
    const btnCerrarNuevo = clone.querySelector('.popup2__close');
    const formNuevoLugar = clone.querySelector('.popup__form');
    const inputTitulo = clone.querySelector('#title');
    const inputUrl = clone.querySelector('#url');

    if (!overlayNuevo || !formNuevoLugar || !inputTitulo || !inputUrl) return;

    
    prepararOverlay(overlayNuevo, btnCerrarNuevo, () => overlayNuevo.remove());

    
    const nuevoLugarValidator = new FormValidator(validationConfig, formNuevoLugar);
    nuevoLugarValidator.enableValidation();
    nuevoLugarValidator.resetValidation?.();

    
    formNuevoLugar.addEventListener('submit', (e) => {
      e.preventDefault();
      const titulo = inputTitulo.value.trim();
      const url = inputUrl.value.trim();

      
      const nuevaCard = new Card(
        { name: titulo, link: url },
        tarjetaTemplateSelector,
        handleImagePreview
      );
      contenedorTarjetas.prepend(nuevaCard.getView());

      overlayNuevo.remove();
    });

    
    document.body.appendChild(clone);
  });
});

