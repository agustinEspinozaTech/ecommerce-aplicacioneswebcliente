export function renderLogin() {
  document.querySelectorAll('main').forEach(m => m.remove());
  
  const header = document.getElementById('encabezado');
  const footer = document.getElementById('footer');
  if (header) header.style.display = 'none';
  if (footer) footer.style.display = 'none';

  const template = document.createElement('template');
  template.innerHTML = `
    <main class="login-container">
      <div class="login-card">
        <a href="#" class="login-back-link" id="btn-volver-home">← Volver</a>
        
        <div class="login-brand">Medifé</div>
        
        <form id="form-login" class="login-form">
          <div class="login-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Ingresar email" required>
          </div>
          
          <div class="login-group">
            <label for="password">Contraseña</label>
            <div class="password-wrapper">
              <input type="password" id="password" placeholder="Ingresar contraseña" required>
              <span class="toggle-password" id="toggle-pwd">👁️</span>
            </div>
          </div>
          
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
          
          <button type="submit" class="btn-login">Iniciar sesión</button>
        </form>
      </div>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  const form = document.getElementById('form-login');
  const passwordInput = document.getElementById('password');
  const togglePwd = document.getElementById('toggle-pwd');
  const btnVolver = document.getElementById('btn-volver-home');

  // Toggle password visibility
  togglePwd.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePwd.textContent = type === 'password' ? '👁️' : '🙈';
  });

  // Back to home
  btnVolver.addEventListener('click', (e) => {
    e.preventDefault();
    const homeLink = document.querySelector('.enlaceMenu[data-view="home"]');
    if (homeLink) {
        homeLink.click();
    }
  });

  // Login simulation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Navigate to welcome screen instead of inicio
    window.location.hash = 'welcome';
    const welcomeLink = document.querySelector('.enlaceMenu[data-view="welcome"]');
    if (welcomeLink) {
        welcomeLink.click();
    } else {
        const tempLink = document.createElement('a');
        tempLink.className = 'enlaceMenu';
        tempLink.dataset.view = 'welcome';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
  });
}

