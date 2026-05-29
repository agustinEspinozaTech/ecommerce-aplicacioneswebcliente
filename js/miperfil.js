import { showToast } from './toast.js';

export function renderMiPerfil() {
  document.querySelectorAll('main').forEach(m => m.remove());

  const template = document.createElement('template');
  template.innerHTML = `
    <main id="contenido">
      <div class="perfil-container">
        <h2 class="perfil-title">Datos de perfil</h2>
        
        <div class="perfil-card">
          <div class="perfil-header">
            <div class="perfil-user-info">
              <div class="perfil-avatar" data-testid="perfil-avatar">F</div>
              <div class="perfil-details" data-testid="perfil-details">
                <h3>FLUXIT AUTOMATION AGENT</h3>
                <p>20-IA-SELFHEALING-01</p>
                <p>agent.bot@selfhealing.ai</p>
              </div>
            </div>
            <div class="perfil-badge" data-testid="perfil-badge">Usuario administrador</div>
          </div>

          <div class="perfil-divider"></div>

          <h3 class="perfil-section-title">Editá tus datos de contacto</h3>
          
          <div class="perfil-grid">
            <div class="perfil-group">
              <label for="perfil-tel">Teléfono</label>
              <input type="text" id="perfil-tel" placeholder="+00 000-AGENT-000" data-testid="perfil-tel-input">
            </div>
            <div class="perfil-group">
              <label for="perfil-email">Correo electrónico</label>
              <input type="email" id="perfil-email" placeholder="bot.ia@selfhealing.ai" data-testid="perfil-email-input">
            </div>
          </div>

          <div class="perfil-actions">
            <button class="btn-perfil-cancelar" id="btn-perfil-cancelar" data-testid="btn-perfil-cancelar">Cancelar</button>
            <button class="btn-perfil-guardar" id="btn-perfil-guardar" data-testid="btn-perfil-guardar">Guardar cambios</button>
          </div>
        </div>
      </div>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  const btnGuardar = document.getElementById('btn-perfil-guardar');
  const inputTel = document.getElementById('perfil-tel');
  const inputEmail = document.getElementById('perfil-email');

  function validate() {
    const isFilled = inputTel.value.trim() !== '' && inputEmail.value.trim() !== '';
    btnGuardar.classList.toggle('enabled', isFilled);
  }

  [inputTel, inputEmail].forEach(input => {
    input.addEventListener('input', validate);
  });

  btnGuardar.addEventListener('click', () => {
    if (btnGuardar.classList.contains('enabled')) {
      showToast('Cambios guardados exitosamente', 'success');
    } else {
      showToast('Por favor, completa todos los campos', 'error');
    }
  });

  document.getElementById('btn-perfil-cancelar').addEventListener('click', () => {
    const inicioLink = document.querySelector('.enlaceMenu[data-view="inicio"]');
    if (inicioLink) {
        inicioLink.click();
    }
  });
}
