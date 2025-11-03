import { getProductos, postProducto, deleteProducto } from '../servicios.js';
import { mostrarConfirmacion } from './confirmacionPopup.js';



export async function renderProductosAdmin() {
  document.querySelectorAll('main').forEach(m => m.remove());

  const template = document.createElement('template');
  template.innerHTML = `
    <main>
      <section class="productos-admin">
        <div>
          <h2>Administrar Productos</h2>
          <p>Agregá nuevos productos o eliminá los existentes.</p>
        </div>
        <form id="FormularioProductos">
          <div class="grupo">
            <label for="title">Título</label>
            <input type="text" id="title" placeholder="Título del producto" required>
          </div>
          <div class="grupo">
            <label for="description">Descripción</label>
            <textarea id="description" placeholder="Descripción del producto"></textarea>
          </div>
          <div class="grupo">
            <label for="price">Precio</label>
            <input type="number" id="price" placeholder="Precio" required>
          </div>
          <div class="grupo">
            <label for="stock">Stock</label>
            <input type="number" id="stock" placeholder="Stock" required>
          </div>
          <div class="grupo">
            <label for="talle">Talle</label>
            <input type="text" id="talle" placeholder="Talle" required>
          </div>
          <div class="grupo">
            <label for="thumbnail">Imagen (URL)</label>
            <input type="url" id="thumbnail" placeholder="URL de la imagen" required>
          </div>
          <div id="botonProductos">
            <button type="submit">Agregar Producto</button>
          </div>
        </form>
        <section id="grillaProductos"></section>
      </section>
    </main>
  `.trim();

  document.body.appendChild(template.content.firstElementChild);

  const form = document.getElementById('FormularioProductos');
  const grilla = document.getElementById('grillaProductos');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nuevo = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value),
      talle: form.talle.value.trim(),
      thumbnail: form.thumbnail.value.trim()
    };
    await postProducto(nuevo);
    form.reset();
    await cargarProductos();
  });

  async function cargarProductos() {
    const productos = await getProductos();
    grilla.innerHTML = `
      <div class="grilla">
        ${productos.map(p => `
          <div class="item">
            <img src="${p.thumbnail}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <p>$${p.price}</p>
            <p>Stock: ${p.stock}</p>
            <p>Talle: ${p.talle}</p>
            <button data-id="${p.id}">Eliminar</button>
          </div>
        `).join('')}
      </div>
    `;
    grilla.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        mostrarConfirmacion('¿Estas seguro que deseas eliminar este producto?', async () => {
          await deleteProducto(btn.dataset.id);
          await cargarProductos();
        });
      });
    });
  }
  await cargarProductos();
}
