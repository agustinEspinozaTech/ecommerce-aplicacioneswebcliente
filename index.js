import { getProductoPorId } from './servicios.js'

document.addEventListener('click', async (e) => {
  const btnDetalle = e.target.closest('.verDetalle')
  if (!btnDetalle) return

  e.preventDefault()
  const id = btnDetalle.dataset.id
  const dialog = document.querySelector('#detalleProducto')

  try {
    const producto = await getProductoPorId(id)
    dialog.innerHTML = `
      <article class="productoDetalle">
        <a href="#" class="cerrarX" aria-label="Cerrar">×</a>
        <header>
          <h3 id="tituloProducto">${producto.title}</h3>
        </header>
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <p class="precioProducto">$${producto.price}</p>
        <p class="stockProducto">Stock: ${producto.stock}</p>
        <p id="descripcionCorta">${producto.description}</p>
        <div class="accionesProducto">
          <button type="button" class="agregarCarrito">Agregar al carrito</button>
          <button type="button" class="comprarAhora">Comprar</button>
        </div>
      </article>
    `
    dialog.showModal()
  } catch (err) {
    console.error('Error al cargar detalle:', err)
  }
})

document.addEventListener('click', (e) => {
  const cerrar = e.target.closest('.cerrarX')
  if (cerrar) {
    e.preventDefault()
    cerrar.closest('dialog').close()
  }
})
