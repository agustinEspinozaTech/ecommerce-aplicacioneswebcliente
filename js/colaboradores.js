import { showToast } from './toast.js';
import { mostrarConfirmacion } from './confirmacionPopup.js';

export function renderColaboradores() {
  const header = document.getElementById('encabezado');
  const footer = document.getElementById('footer');
  if (header) header.style.display = 'block';
  if (footer) footer.style.display = 'block';

  document.querySelectorAll('main').forEach(m => m.remove());

  const template = document.createElement('template');
  template.innerHTML = `
    <main id="contenido">
      <div class="colaboradores-container">
        <div class="colaboradores-header">
          <a href="#inicio">←</a> Agregar colaborador
        </div>

        <section class="colaboradores-section">
          <h3>1. CUIT</h3>
          <p>Ingresa el CUIT del colaborador para que comencemos a asociar sus datos.</p>
            <div class="colaboradores-group">
              <label for="cuit-search">CUIT</label>
              <div class="cuit-input-group">
                <input type="text" id="cuit-search" placeholder="Ingresar" maxlength="11" data-testid="cuit-search-input">
                <button class="btn-ingresar" id="btn-cuit-ingresar" data-testid="cuit-search-button">Ingresar</button>
              </div>
              <div id="error-cuit-search" class="error-message" data-testid="cuit-search-error"></div>
            </div>
        </section>

        <section class="colaboradores-section" id="section-datos">
          <h3>2. Datos del colaborador <span>ⓘ</span></h3>
          <p>Completá los datos del colaborador para finalizar la gestión de accesos.</p>
          
          <div class="colaboradores-grid">
            <div class="colaboradores-group">
              <label for="cuit-display">CUIT</label>
              <input type="text" id="cuit-display" placeholder="Ingresar" maxlength="11" data-testid="cuit-display-input">
              <div id="error-cuit-display" class="error-message" data-testid="cuit-display-error"></div>
            </div>
            <div class="colaboradores-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Ingresar" data-testid="nombre-input">
              <div id="error-nombre" class="error-message" data-testid="nombre-error"></div>
            </div>
            <div class="colaboradores-group">
              <label for="apellido">Apellido</label>
              <input type="text" id="apellido" placeholder="Ingresar" data-testid="apellido-input">
              <div id="error-apellido" class="error-message" data-testid="apellido-error"></div>
            </div>
            <div class="colaboradores-group">
              <label for="telefono">Teléfono</label>
              <input type="text" id="telefono" placeholder="Ingresar" data-testid="telefono-input">
              <div id="error-telefono" class="error-message" data-testid="telefono-error"></div>
            </div>
            <div class="colaboradores-group">
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" placeholder="Ingresar" data-testid="email-input">
              <div id="error-email" class="error-message" data-testid="email-error"></div>
            </div>
            <div class="colaboradores-group"></div> <!-- Spacer -->
            <div class="colaboradores-group">
              <label for="cargo">Cargo (Opcional)</label>
              <input type="text" id="cargo" placeholder="Ingresar" data-testid="cargo-input">
              <div id="error-cargo" class="error-message" data-testid="cargo-error"></div>
            </div>
            <div class="colaboradores-group">
              <label for="funcion">Función (Opcional)</label>
              <input type="text" id="funcion" placeholder="Ingresar" data-testid="funcion-input">
              <div id="error-funcion" class="error-message" data-testid="funcion-error"></div>
            </div>
          </div>

          <div class="colaboradores-actions">
            <button class="btn-cancelar" id="btn-cancelar" data-testid="btn-cancelar">Cancelar</button>
            <button class="btn-confirmar" id="btn-confirmar" data-testid="btn-confirmar">Confirmar</button>
          </div>
        </section>
      </div>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  // Elements
  const cuitSearch = document.getElementById('cuit-search');
  const btnCuitIngresar = document.getElementById('btn-cuit-ingresar');
  const cuitDisplay = document.getElementById('cuit-display');
  const btnConfirmar = document.getElementById('btn-confirmar');
  const btnCancelar = document.getElementById('btn-cancelar');

  const fields = {
    'cuit-search': { required: true, type: 'cuit' },
    'cuit-display': { required: true, type: 'cuit' },
    'nombre': { required: true, type: 'text' },
    'apellido': { required: true, type: 'text' },
    'telefono': { required: true, type: 'phone' },
    'email': { required: true, type: 'email' },
    'cargo': { required: false, type: 'text' },
    'funcion': { required: false, type: 'text' },
  };

  function validateField(id, showRequiredError = false) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById('error-' + id);
    const config = fields[id];
    const value = input.value.trim();
    let error = '';

    if (config.required && !value && showRequiredError) {
      error = 'dato obligatorio';
    } else if (value) {
      if (config.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'formato invalido';
      } else if (config.type === 'cuit' && !/^\d{1,11}$/.test(value)) {
        error = 'formato invalido';
      }
    }

    errorDiv.textContent = error;
    return error === '';
  }

  function validateAll(showRequiredError = false) {
    let allValid = true;
    Object.keys(fields).forEach(id => {
      if (!validateField(id, showRequiredError)) {
        allValid = false;
      }
    });
    btnConfirmar.classList.toggle('enabled', allValid);
    return allValid;
  }

  btnCuitIngresar.addEventListener('click', () => {
    if (validateField('cuit-search', true)) {
      // Simulate CUIT lookup
      cuitDisplay.value = cuitSearch.value.trim();
      validateField('cuit-display', true);
      validateAll(false);
      showToast('CUIT ingresado correctamente', 'success');
    }
  });

  btnConfirmar.addEventListener('click', () => {
    if (validateAll(true)) {
      showToast('Colaborador creado con éxito (Simulado)', 'success');
      // Simulate redirect or reset
      setTimeout(() => {
        window.location.hash = 'inicio';
        // In a real app we'd call the router, here we just simulate a reload or event
        document.querySelector('.enlaceMenu[data-view="inicio"]').click();
      }, 2000);
    } else {
      showToast('Por favor, completa todos los campos obligatorios', 'error');
    }
  });

  btnCancelar.addEventListener('click', () => {
    document.querySelector('.enlaceMenu[data-view="inicio"]').click();
  });

  // Add input listeners for real-time validation
  Object.keys(fields).forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        validateField(id);
        validateAll();
      });
      input.addEventListener('blur', () => validateField(id));
    }
  });

  validateAll();
}
