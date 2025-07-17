document.addEventListener("DOMContentLoaded", function(){

const openPopup = document.querySelector('.main__profile-button');
const closePopup = document.querySelector('.popup__close');
const overlayPopup = document.querySelector('.popup-overlay');


const inputAcercademi = document.getElementById('acercaDemipopup');
const pAcercademi = document.getElementById('acercaDemi');

const nameAuthor = document.getElementById('nameJ');
const popupName = document.getElementById('inputName');

const btnGuardar = document.getElementById('guardarBtn');

const botonesCorazon = document.querySelectorAll('.corazon-img');


botonesCorazon.forEach(boton => {
boton.addEventListener('click', function () {
  boton.classList.toggle('activo');
  });
});
 

function validarCampos() {
    const nombreLleno = popupName.value.trim() !== "";
    const textoLleno = inputAcercademi.value.trim() !== "";

    if (nombreLleno && textoLleno){
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


btnGuardar.addEventListener("click", function(){
    const nuevoNombre = popupName.value.trim();
    const nuevoTexto = inputAcercademi.value.trim();

    nameAuthor.textContent = nuevoNombre || "Jacques Cousteau";
    pAcercademi.textContent = nuevoTexto || "Explorador";

    overlayPopup.style.display = "none";
});



/**/
const openButton = document.querySelector(".main__add-button");

openButton.addEventListener("click", function(){
const template = document.getElementById('popup-template');
const templateClone = template.content.cloneNode(true);

templateClone.querySelector(".popup2__close").addEventListener("click", function(){
this.closest(".popup-overlay2").remove();
});
document.body.appendChild(templateClone);
});


});