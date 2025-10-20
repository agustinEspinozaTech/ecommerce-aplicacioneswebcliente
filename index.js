import { getProductos, getProductoPorId  } from './servicios.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productos = await getProductos(10); // 10 productos
        renderProductos(productos);
    } catch (error) {
        console.error(error);
        document.querySelector('.listaProductos').innerHTML =
            '<p>Error al cargar los productos.</p>';
    }
});

function renderProductos(productos) {
  const contenedor = document.querySelector('.listaProductos');
  contenedor.innerHTML = productos.map(p => `
    <li>
      <article class="producto">
        <figure>
          <img src="${p.thumbnail}" alt="${p.title}">
        </figure>
        <div>
          <h3>${p.title}</h3>
          <p class="precio">$${p.price}</p>
          <div class="acciones">
            <a href="#detalleProducto" class="verDetalle" data-id="${p.id}">Ver detalle</a>
            <button>Comprar</button>
          </div>
        </div>
      </article>
    </li>
  `).join('');
}


document.addEventListener('click', async (e) => {
  const btnDetalle = e.target.closest('.verDetalle');
  if (!btnDetalle) return;

  e.preventDefault();
  const id = btnDetalle.dataset.id;
  const dialog = document.querySelector('#detalleProducto');

  try {
    const producto = await getProductoPorId(id);
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
    `;

    dialog.showModal();
  } catch (err) {
    console.error('Error al cargar detalle:', err);
  }
});


document.addEventListener('click', (e) => {
  const cerrar = e.target.closest('.cerrarX');
  if (cerrar) {
    e.preventDefault();
    cerrar.closest('dialog').close();
  }
});
