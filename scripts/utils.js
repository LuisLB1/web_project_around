
export function abrirOverlay(overlayEl) {
  if (!overlayEl) return;
  overlayEl.style.display = 'flex'; 
}


export function cerrarOverlay(overlayEl) {
  if (!overlayEl) return;
  overlayEl.style.display = 'none'; 
}


export function cerrarOverlayAlClickFondo(overlayEl, onClose) {
  if (!overlayEl) return;
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) {
      cerrarOverlay(overlayEl);
      if (typeof onClose === 'function') onClose();
    }
  });
}


export function habilitarCierrePorEsc(selectores) {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const overlays = document.querySelectorAll(selectores);
    overlays.forEach((ov) => {
      const visible = getComputedStyle(ov).display !== 'none';
      if (!visible) return;

      if (ov.classList.contains('popup-overlay2')) {
        ov.remove();
      } else {
        cerrarOverlay(ov);
      }
    });
  });
}


export function prepararOverlay(overlayEl, botonCerrar, onClose) {
  if (!overlayEl) return;

  if (botonCerrar) {
    botonCerrar.addEventListener('click', () => {
      cerrarOverlay(overlayEl);
      if (typeof onClose === 'function') onClose();
    });
  }

  cerrarOverlayAlClickFondo(overlayEl, onClose);
}
