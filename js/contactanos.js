const mount = () => {
  const template = document.createElement('template')
  template.innerHTML = `
    <main>
      <section class="contacto">
        <div>
          <h2>¡Contactanos!</h2>
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <form id="FormularioContactanos">
          <div class="grupo">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre" required>
          </div>
          <div class="grupo">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Ingresa tu email" required>
          </div>
          <div class="grupo">
            <label for="motivo">Motivo</label>
            <select id="motivo" name="motivo" required>
              <option value="" selected disabled>Selecciona una opción</option>
              <option value="dudas">Dudas</option>
              <option value="compras">Compras</option>
              <option value="reclamos">Reclamos</option>
            </select>
          </div>
          <div class="grupo">
            <label for="mensaje">Mensaje</label>
            <textarea name="mensaje" id="mensaje"></textarea>
          </div>
          <div id="botonContactanos">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </section>
    </main>
  `.trim()
  document.body.appendChild(template.content.firstElementChild)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
