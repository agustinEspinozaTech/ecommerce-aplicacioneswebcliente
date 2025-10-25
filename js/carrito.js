const mount = () => {
  const template = document.createElement('template')
  template.innerHTML = `
    <main>
      <section class="listaDeseos">
        <div>
          <h2>Carrito de compras</h2>
          <p>Por el momento no has agregado un producto al carrito de compras</p>
        </div>
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
