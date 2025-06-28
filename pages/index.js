document.addEventListener("DOMContentLoaded", function(){

const openPopup = document.querySelector('.main__profile-button');
const closePopup = document.querySelector('.popup-close');
const overlayPopup = document.querySelector('.popup-overlay');


const inputAcercademi = document.getElementById('acercaDemipopup');
const pAcercademi = document.getElementById('acercaDemi');

const nameAuthor = document.getElementById('nameJ');
const popupName = document.getElementById('inputName');

const btnGuardar = document.getElementById('guardarBtn');

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


})

});