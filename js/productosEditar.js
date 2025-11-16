import { getProductos, putProducto } from '../servicios.js'
import { showToast } from './toast.js'

export async function renderProductosEditar() {
  document.querySelectorAll('main').forEach(m => m.remove())

  const template = document.createElement('template')
  template.innerHTML = `
    <main id="contenido">
      <section class="destacados">
        <h2>Editar productos</h2>
        <p>Modificá la información de los productos.</p>
        <ul class="listaProductos" id="listaProductosEditar"></ul>
      </section>

      <section class="contacto">
        <div>
          <h2>Formulario de edición</h2>
          <p>Seleccioná un producto y modificá sus datos.</p>
        </div>
        <form id="FormularioContactanos">
          <div class="grupo">
            <label for="edit_title">Título</label>
            <input type="text" id="edit_title" name="title" required>
          </div>
          <div class="grupo">
            <label for="edit_description">Descripción</label>
            <textarea id="edit_description" name="description"></textarea>
          </div>
          <div class="grupo">
            <label for="edit_price">Precio</label>
            <input type="number" id="edit_price" name="price" required>
          </div>
          <div class="grupo">
            <label for="edit_stock">Stock</label>
            <input type="number" id="edit_stock" name="stock" required>
          </div>
          <div class="grupo">
            <label for="edit_talle">Talle</label>
            <input type="text" id="edit_talle" name="talle" required>
          </div>
          <div class="grupo">
            <label for="edit_thumbnail">Imagen (URL)</label>
            <input type="url" id="edit_thumbnail" name="thumbnail" required>
          </div>
          <div id="botonContactanos">
            <button type="submit">Modificar</button>
          </div>
        </form>
      </section>
    </main>
  `.trim()

  document.body.appendChild(template.content.firstElementChild)

  const lista = document.getElementById('listaProductosEditar')
  const form = document.getElementById('FormularioContactanos')

  let productosCache = []
  let productoSeleccionadoId = null

  async function cargarProductos() {
    productosCache = await getProductos()
    lista.innerHTML = productosCache
      .map(
        p => `
        <li>
          <article class="producto" data-id="${p.id}">
            <figure>
              <img src="${p.thumbnail}" alt="${p.title}">
            </figure>
            <div>
              <h3>${p.title}</h3>
              <p class="precio">$${p.price}</p>
              <p>Stock: ${p.stock}</p>
              <p>Talle: ${p.talle}</p>
              <div class="acciones">
                <button type="button" data-action="editar" data-id="${p.id}">Editar</button>
              </div>
            </div>
          </article>
        </li>
      `
      )
      .join('')
  }

   lista.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action="editar"]')
    if (!btn) return

    const id = btn.dataset.id
    if (!id) return

    const producto = productosCache.find(p => p.id === id)
    if (!producto) return

    productoSeleccionadoId = id

    form.title.value = producto.title || ''
    form.description.value = producto.description || ''
    form.price.value = producto.price ?? ''
    form.stock.value = producto.stock ?? ''
    form.talle.value = producto.talle || ''
    form.thumbnail.value = producto.thumbnail || ''

    form.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })


  form.addEventListener('submit', async e => {
    e.preventDefault()
    if (!productoSeleccionadoId) return

    const productoActualizado = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      talle: form.talle.value.trim(),
      thumbnail: form.thumbnail.value.trim()
    }

    await putProducto(productoSeleccionadoId, productoActualizado)
     showToast('Producto editado correctamente', 'success')
    await cargarProductos()
  })

  await cargarProductos()
}
