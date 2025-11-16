const CARRITO_KEY = 'carrito'

function getCarrito() {
  try {
    const data = localStorage.getItem(CARRITO_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('Error leyendo carrito:', err)
    return []
  }

}
function saveCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito))
}

export function addProductoAlCarrito(producto) {
  const carrito = getCarrito()
  const index = carrito.findIndex(p => p.id === String(producto.id))

  if (index === -1) {
    carrito.push({
      id: String(producto.id),
      title: producto.title,
      price: producto.price,
      thumbnail: producto.thumbnail,
      stock: producto.stock,
      cantidad: 1
    })
  } else {
    const item = carrito[index]
    if (item.cantidad < item.stock) {
      item.cantidad += 1
    }
  }

  saveCarrito(carrito)
}

function actualizarCantidad(id, delta) {
  const carrito = getCarrito()
  const index = carrito.findIndex(p => p.id === String(id))
  if (index === -1) return

  const item = carrito[index]
  const nuevaCantidad = item.cantidad + delta

  if (nuevaCantidad <= 0) {
    carrito.splice(index, 1)
  } else if (nuevaCantidad <= item.stock) {
    item.cantidad = nuevaCantidad
  }

  saveCarrito(carrito)
}

function eliminarProducto(id) {
  const carrito = getCarrito().filter(p => p.id !== String(id))
  saveCarrito(carrito)
}

export function renderCarrito() {
  const contenido = document.querySelector('#contenido')
  if (!contenido) return

  const carrito = getCarrito()
  const totalCarrito = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0)

  contenido.innerHTML = `
    <section class="destacados">
      <h2>Carrito de compras</h2>
      <p class="mensajeVacio"${carrito.length ? ' style="display:none"' : ''}>
        Por el momento no has agregado un producto al carrito de compras
      </p>
      <ul class="listaProductos">
        ${carrito.map(p => `
          <li>
            <article class="producto" data-id="${p.id}">
              <figure>
                <img src="${p.thumbnail}" alt="${p.title}">
              </figure>
              <div>
                <h3>${p.title}</h3>
                <p class="precio">$${p.price}</p>
                <p class="precioTotal">Total: $${p.price * p.cantidad}</p>
                <div class="acciones">
                  <button type="button" data-action="restar" data-id="${p.id}">-</button>
                  <span class="cantidad">${p.cantidad}</span>
                  <button type="button" data-action="sumar" data-id="${p.id}">+</button>
                  <button type="button" data-action="eliminar" data-id="${p.id}">Eliminar</button>
                  <button type="button" data-id="${p.id}" class="comprarAhora">Comprar</button>
                </div>
              </div>
            </article>
          </li>
        `).join('')}
      </ul>
      <p class="totalCarrito">Total a pagar: $${totalCarrito}</p>
    </section>
  `
}


document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]')
  if (!btn) return

  const action = btn.getAttribute('data-action')
  const id = btn.getAttribute('data-id')
  if (!id) return

  if (action === 'sumar') {
    actualizarCantidad(id, 1)
    renderCarrito()
  } else if (action === 'restar') {
    actualizarCantidad(id, -1)
    renderCarrito()
  } else if (action === 'eliminar') {
    eliminarProducto(id)
    renderCarrito()
  }
})
