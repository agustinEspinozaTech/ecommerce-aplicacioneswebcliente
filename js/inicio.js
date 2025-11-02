import { getProductos } from "../servicios.js"

export async function renderInicio() {
  document.querySelectorAll('main').forEach(m => m.remove())
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

  try {
    const productos = await getProductos(10)
    const contenedor = document.querySelector('.listaProductos')
    contenedor.innerHTML = productos.map(p => `
      <li>
        <article class="producto">
          <figure><img src="${p.thumbnail}" alt="${p.title}"></figure>
          <div>
            <h3>${p.title}</h3>
            <p class="precio">$${p.price}</p>
             <p class="precio">Talle disponible: ${p.talle}</p>
            <div class="acciones">
              <a href="#detalleProducto" class="verDetalle" data-id="${p.id}">Ver detalle</a>
              <button>Comprar</button>
            </div>
          </div>
        </article>
      </li>
    `).join('')
  } catch (err) {
    console.error(err)
    document.querySelector('.listaProductos').innerHTML =
      '<p>Error al cargar los productos.</p>'
  }
}
