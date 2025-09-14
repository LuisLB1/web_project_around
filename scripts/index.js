import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { habilitarCierrePorEsc } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnAbrirPerfil = document.querySelector('.main__profile-button');
  const overlayPerfil = document.querySelector('.popup-overlay');
  const formEditarPerfil = overlayPerfil?.querySelector('.popup__form');
  const inputNombre = overlayPerfil?.querySelector('#inputName');
  const inputAcercaDeMi = overlayPerfil?.querySelector('#acercaDemipopup');

  const contenedorTarjetas = document.querySelector('.main__grid');
  const btnAbrirNuevoLugar = document.querySelector('.main__add-button');

  const overlayImagen = document.querySelector('.template__imagen-overlay');
  const popupNuevoLugarTemplate = document.getElementById('popup-template');
  const tarjetaTemplateSelector = '#tarjetas-template';

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

  const userInfo = new UserInfo({
    nameSelector: '#nameJ',
    jobSelector: '#acercaDemi',
  });

  let imagePopup = null;
  if (overlayImagen) {
    imagePopup = new PopupWithImage(overlayImagen);
    imagePopup.setEventListeners();
  }

  function handleImagePreview(link, name) {
    if (imagePopup) {
      const safeLink = String(link ?? '').trim();
      const safeName = String(name ?? '').trim();
      if (!safeLink) return;
      imagePopup.open({ name: safeName || 'Imagen', link: safeLink });
    }
  }

  let editProfilePopup = null;
  if (overlayPerfil) {
    editProfilePopup = new PopupWithForm(overlayPerfil, (formData) => {
      const nuevoNombre = String(
        formData.name ?? formData.inputName ?? inputNombre?.value ?? ''
      ).trim();
      const nuevoTexto = String(
        formData.about ?? formData.acercaDemipopup ?? inputAcercaDeMi?.value ?? ''
      ).trim();

      userInfo.setUserInfo({
        name: nuevoNombre || 'Jacques Cousteau',
        job: nuevoTexto || 'Explorador',
      });

      editProfilePopup.close();
    });
    editProfilePopup.setEventListeners();
  }

  btnAbrirPerfil?.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    editProfilePopup?.setInputValues({
      name,
      about: job,
      inputName: name,
      acercaDemipopup: job,
    });
    perfilValidator?.resetValidation?.();
    editProfilePopup?.open();
  });

  habilitarCierrePorEsc('.popup-overlay, .popup-overlay2, .template__imagen-overlay');

  const datosIniciales = Array.from(
    contenedorTarjetas.querySelectorAll('.main__grid-elements')
  ).map((el) => {
    const img = el.querySelector('img.place');
    const title = el.querySelector('.main__grid-text');
    return {
      name: String(title?.textContent ?? '').trim(),
      link: String(img?.getAttribute('src') ?? '').trim(),
    };
  });

  contenedorTarjetas.innerHTML = '';

  function createCard(item) {
    const safe = {
      name: String(item?.name ?? '').trim(),
      link: String(item?.link ?? '').trim(),
    };
    const card = new Card(safe, tarjetaTemplateSelector, handleImagePreview);
    return card.getView();
  }

  const cardsSection = new Section(
    {
      items: datosIniciales,
      renderer: (data) => {
        const cardEl = createCard(data);
        cardsSection.addItem(cardEl);
      },
    },
    '.main__grid'
  );
  cardsSection.renderItems();

  btnAbrirNuevoLugar?.addEventListener('click', () => {
    if (!popupNuevoLugarTemplate) return;

    const clone = popupNuevoLugarTemplate.content.cloneNode(true);
    const overlayNuevo = clone.querySelector('.popup-overlay2');
    const formNuevoLugar = clone.querySelector('.popup__form');
    const inputTitulo = clone.querySelector('#title');
    const inputUrl = clone.querySelector('#url');

    if (!overlayNuevo || !formNuevoLugar || !inputTitulo || !inputUrl) return;

    document.body.appendChild(clone);

    const addCardPopup = new PopupWithForm(overlayNuevo, (formData) => {
      const titulo = String(formData.title ?? inputTitulo.value ?? '').trim();
      const url = String(formData.link ?? formData.url ?? inputUrl.value ?? '').trim();

      if (!url) return;

      const nuevaCard = new Card(
        { name: titulo, link: url },
        tarjetaTemplateSelector,
        handleImagePreview
      );
      contenedorTarjetas.prepend(nuevaCard.getView());

      addCardPopup.close();
      overlayNuevo.remove();
    });

    addCardPopup.setEventListeners();

    const nuevoLugarValidator = new FormValidator(validationConfig, formNuevoLugar);
    nuevoLugarValidator.enableValidation();
    nuevoLugarValidator.resetValidation?.();

    addCardPopup.open();
  });
});




