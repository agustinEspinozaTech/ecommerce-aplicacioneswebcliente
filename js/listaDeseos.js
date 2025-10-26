export function renderListaDeseos() {
  document.querySelectorAll('main').forEach(m => m.remove())
  const template = document.createElement('template')
  template.innerHTML = `
    <main>
      <section class="listaDeseos">
        <div>
          <h2>Lista de deseos</h2>
          <p>Por el momento no has agregado un producto a la lista de deseos.</p>
        </div>
      </section>
    </main>
  `.trim()
  document.body.appendChild(template.content.firstElementChild)
}
