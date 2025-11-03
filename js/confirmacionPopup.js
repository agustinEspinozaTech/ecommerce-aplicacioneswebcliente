export function mostrarConfirmacion(mensaje, onConfirm, onCancel) {
  let popup = document.getElementById('popupConfirmGlobal');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popupConfirmGlobal';
    popup.className = 'popup oculto';
    popup.innerHTML = `
      <div class="popup-contenido">
        <p id="mensajeConfirmacion"></p>
        <div class="botones">
          <button id="confirmarAccion">Sí</button>
          <button id="cancelarAccion">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(popup);
  }

  const mensajeEl = popup.querySelector('#mensajeConfirmacion');
  const btnConfirmar = popup.querySelector('#confirmarAccion');
  const btnCancelar = popup.querySelector('#cancelarAccion');

  mensajeEl.textContent = mensaje;
  popup.classList.remove('oculto');

  const limpiar = () => {
    popup.classList.add('oculto');
    btnConfirmar.removeEventListener('click', confirmar);
    btnCancelar.removeEventListener('click', cancelar);
  };

  const confirmar = () => {
    limpiar();
    if (typeof onConfirm === 'function') onConfirm();
  };

  const cancelar = () => {
    limpiar();
    if (typeof onCancel === 'function') onCancel();
  };

  btnConfirmar.addEventListener('click', confirmar);
  btnCancelar.addEventListener('click', cancelar);
}
