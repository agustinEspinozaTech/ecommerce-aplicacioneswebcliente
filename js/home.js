export function renderHome() {
  document.querySelectorAll('main').forEach(m => m.remove());
  
  const header = document.getElementById('encabezado');
  const footer = document.getElementById('footer');
  if (header) header.style.display = 'none';
  if (footer) footer.style.display = 'none';

  const template = document.createElement('template');
  template.innerHTML = `
    <main class="home-container">
      <section class="home-left">
        <div class="home-left-content">
          <h2>Convenios siempre a mano</h2>
          <p>Consultá los valores vigentes de las prestaciones cuando lo necesites.</p>
          <div class="home-left-decoration">
            <span class="active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section class="home-right">
        <a href="#" class="home-back-link" id="btn-volver-inicio" data-testid="btn-volver-inicio">
          <span>←</span> Volver al Inicio
        </a>
        <a href="#" class="home-top-link" data-testid="link-sitio-medife">
          <span>🌐</span> Ir al sitio web de Medifé
        </a>

        <div class="home-logo">
          <img src="./src/imagen/logo-nexo.png" alt="Nexo Medifé" onerror="this.style.display='none'">
          <div style="font-size: 48px; font-weight: 800; color: #8b4513; font-family: 'Work Sans';">nexo</div>
          <div style="font-size: 18px; color: #8b4513; font-weight: 600; margin-top: -10px;">Medifé</div>
        </div>

        <p class="home-welcome-text">Te damos la bienvenida al portal de prestadores</p>
        
        <button class="btn-ingresar-nexo" id="btn-ingresar-nexo" data-testid="btn-ingresar-nexo">Ingresar a Nexo</button>

        <p class="home-register-text">
          ¿Querés pertenecer a Medifé?<br>
          <a href="#" class="home-register-link" data-testid="link-registrate-prestador">Registrate como prestador</a>
        </p>

        <div class="home-contact-box">
          <span class="home-contact-icon">✉️</span>
          <div class="home-contact-text">
            Ante dudas o necesidades, contactanos a <br>
            <a href="mailto:soporte.ai@selfhealing.ai" class="home-contact-email" data-testid="email-contacto">soporte.ai@selfhealing.ai</a>
          </div>
        </div>

        <div class="home-footer">
          <div class="home-footer-links">
            <a href="#" data-testid="link-privacidad">Política de Privacidad</a> | 
            <a href="#" data-testid="link-dnpdp">DNPDP</a> | 
            <a href="#" data-testid="link-defensa-consumidor">Defensa y Protección al Consumidor</a>
          </div>
          <div class="home-footer-text">
            Superintendencia de Servicios de Salud Órgano de Control de Obras
            Sociales y Entidades de Medicina Prepaga - <span style="color: #f57c00; font-weight: 700;">0800 222-AGENT (72583)</span><br>
            <a href="http://www.sssalud.gob.ar" target="_blank" style="color: #111318; text-decoration: underline;" data-testid="link-sssalud">www.sssalud.gob.ar</a> | R.N.E.M.P: Nro. 1199/15
          </div>
          <div class="home-footer-copyright">
            2020 Medifé Cobertura Médica Nacional
          </div>
        </div>

        <a href="#" class="home-manual-link" data-testid="link-manual-uso">
          <span class="home-manual-icon">📖</span> Manual de uso
        </a>
      </section>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  document.getElementById('btn-ingresar-nexo').addEventListener('click', () => {
    window.location.hash = 'login';
    const loginLink = document.querySelector('.enlaceMenu[data-view="login"]');
    if (loginLink) {
        loginLink.click();
    } else {
        // If the link isn't in the menu, we call the router logic manually
        // But since we have la ruta registrada, can simply simulate the click or navigate
        // I will just call the function from the router by dispatching a click on a dummy element or similar
        // Actually, the most consistent way in this app is to use a link with data-view.
        // Let's add a hidden link or just handle it in the router.
        // Since the router listens to 'click' on 'a.enlaceMenu[data-view]', I can create a temporary one.
        const tempLink = document.createElement('a');
        tempLink.className = 'enlaceMenu';
        tempLink.dataset.view = 'login';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
  });

  document.getElementById('btn-volver-inicio').addEventListener('click', (e) => {
    e.preventDefault();
    const inicioLink = document.querySelector('.enlaceMenu[data-view="inicio"]');
    if (inicioLink) {
        inicioLink.click();
    }
  });
}
