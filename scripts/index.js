document.addEventListener("DOMContentLoaded", function() {
  const openPopup = document.querySelector('.main__profile-button');
  const closePopup = document.querySelector('.popup__close');
  const overlayPopup = document.querySelector('.popup-overlay');

  const inputAcercademi = document.getElementById('acercaDemipopup');
  const pAcercademi = document.getElementById('acercaDemi');

  const nameAuthor = document.getElementById('nameJ');
  const popupName = document.getElementById('inputName');

  const btnGuardar = document.getElementById('guardarBtn');

  const contenedorTarjetas = document.querySelector(".main__grid");

  const overlayImagen = document.querySelector(".template__imagen-overlay");
  const imagenEmergente = overlayImagen.querySelector(".template__imagen-emergente");
  const btnCerrarImagen = overlayImagen.querySelector("#cerrarImagen");

  //Manejo de clicks dentro de las tarjetas
  contenedorTarjetas.addEventListener("click", function(event) {
    if (event.target.classList.contains("corazon-img")) {
      event.target.classList.toggle("activo");
    }
    if (event.target.classList.contains("main__image-trash")) {
      const tarjeta = event.target.closest(".main__grid-elements");
      if (tarjeta) {
        tarjeta.remove();
      }
    }
    if (event.target.classList.contains("place")) {
      imagenEmergente.src = event.target.src;
      overlayImagen.style.display = "flex";
    }
  });

  btnCerrarImagen.addEventListener("click", function() {
    overlayImagen.style.display = "none";
    imagenEmergente.src = "";
  });

  function validarCampos() {
    const nombreLleno = popupName.value.trim() !== "";
    const textoLleno = inputAcercademi.value.trim() !== "";

    if (nombreLleno && textoLleno) {
      btnGuardar.classList.add("activo");
    } else {
      btnGuardar.classList.remove("activo");
    }
  }

  inputAcercademi.addEventListener("input", validarCampos);
  popupName.addEventListener("input", validarCampos);

  openPopup.addEventListener("click", function() {
    overlayPopup.style.display = "flex";
  });

  closePopup.addEventListener("click", function() {
    overlayPopup.style.display = "none";
  });

  btnGuardar.addEventListener("click", function() {
    const nuevoNombre = popupName.value.trim();
    const nuevoTexto = inputAcercademi.value.trim();

    nameAuthor.textContent = nuevoNombre || "Jacques Cousteau";
    pAcercademi.textContent = nuevoTexto || "Explorador";

    overlayPopup.style.display = "none";
  });

  const openButton = document.querySelector(".main__add-button");

  openButton.addEventListener("click", function() {
    const template = document.getElementById('popup-template');
    const templateClone = template.content.cloneNode(true);

    templateClone.querySelector(".popup2__close").addEventListener("click", function() {
      this.closest(".popup-overlay2").remove();
    });

    const btnCrear = templateClone.querySelector("#crear");
    const inputTitulo = templateClone.querySelector("#title");
    const inputUrl = templateClone.querySelector("#url");

    btnCrear.addEventListener("click", function() {
      const titulo = inputTitulo.value.trim();
      const imagenUrl = inputUrl.value.trim();

      if (!titulo || !imagenUrl) {
        alert("Por favor completa ambos campos.");
        return;
      }

      const tarjetaTemplate = document.getElementById('tarjetas-template');
      const tarjetaClone = tarjetaTemplate.content.cloneNode(true);

      tarjetaClone.querySelector("img").src = imagenUrl;
      tarjetaClone.querySelector(".main__grid-text").textContent = titulo;

      contenedorTarjetas.prepend(tarjetaClone);

      document.querySelector(".popup-overlay2").remove();
    });

    document.body.appendChild(templateClone);
  });
});
