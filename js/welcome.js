export function renderWelcome() {
  const header = document.getElementById('encabezado');
  const footer = document.getElementById('footer');
  if (header) header.style.display = 'none';
  if (footer) footer.style.display = 'none';

  document.querySelectorAll('main').forEach(m => m.remove());

  const template = document.createElement('template');
  template.innerHTML = `
    <main class="welcome-container">
      <button class="welcome-back-btn" id="btn-volver-login">
        <span>←</span> Volver al Login
      </button>
      
      <div class="welcome-card">
        <div class="welcome-icon-wrapper">
          <span>👋</span>
        </div>
        
        <h1 class="welcome-title">Te damos la bienvenida al</h1>
        <h2 class="welcome-subtitle">portal de prestadores</h2>
        <p class="welcome-entity">SELF-HEALING AI Flux it</p>
      </div>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  document.getElementById('btn-volver-login').addEventListener('click', () => {
    window.location.hash = 'login';
    const loginLink = document.querySelector('.enlaceMenu[data-view="login"]');
    if (loginLink) {
        loginLink.click();
    } else {
        const tempLink = document.createElement('a');
        tempLink.className = 'enlaceMenu';
        tempLink.dataset.view = 'login';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
  });
}
