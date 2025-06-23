document.addEventListener("DOMContentLoaded", function(){

const openPopup = document.querySelector('.main__profile-button');
const closePopup = document.querySelector('.popup-close');
const overlayPopup = document.querySelector('.popup-overlay');

openPopup.addEventListener("click", function() {
overlayPopup.style.display = "flex";
});

closePopup.addEventListener("click", function() {
overlayPopup.style.display = "none";
});

/**/ 

const inputAcercademi = document.getElementById('acercaDemipopup');
const pAcercademi = document.getElementById('acercaDemi');

inputAcercademi.addEventListener("input", function(){
const nuevoNombre = inputAcercademi.value.trim();
pAcercademi.textContent = nuevoNombre || "Explorador" ;
});

const nameAuthor = document.getElementById('nameJ');
const popupName = document.getElementById('inputName');
 
popupName.addEventListener("input", function() {
const newName = popupName.value.trim();
nameAuthor.textContent = newName || "Jacques Cousteau";
});

});