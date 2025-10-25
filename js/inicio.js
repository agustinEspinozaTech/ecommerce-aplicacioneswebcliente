const mount = () => {
  const template = document.createElement('template')
  template.innerHTML = `
    <main id="contenido">
      <div class="destacados">
        <div>
          <h2>Productos destacados</h2>
          <p>¡Los productos más vistos de la semana!</p>
        </div>
        <ul class="listaProductos"></ul>
        <dialog id="detalleProducto"></dialog>
      </div>
    </main>
  `.trim()
  document.body.appendChild(template.content.firstElementChild)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
