import { renderInicio } from "./js/inicio.js";
import { renderProductos } from "./js/productos.js";
import { renderContactanos } from "./js/contactanos.js";
import { renderListaDeseos } from "./js/listaDeseos.js";
import { renderCarrito } from "./js/carrito.js";
import { renderProductosAdmin } from "./js/productosAdmin.js";
import { inicializarBuscador } from "./js/buscador.js";
import { renderProductosEditar } from "./js/productosEditar.js";


function manejarNavegacion(e) {
  const link = e.target.closest('a.enlaceMenu[data-view]');
  if (!link) return;
  e.preventDefault();

  const vista = link.dataset.view;

  switch (vista) {
    case 'inicio':
      renderInicio();
      break;
    case 'productos':
      renderProductos();
      break;
    case 'contactanos':
      renderContactanos();
      break;
    case 'listaDeseos':
      renderListaDeseos();
      break;
    case 'carrito':
      renderCarrito();
      break;
    case 'productosAdmin':
      renderProductosAdmin();
      break;
    case 'productosEditar':
      renderProductosEditar()
      break
  }


  setTimeout(() => inicializarBuscador(), 100);
}

document.addEventListener('click', manejarNavegacion);


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderInicio);
} else {
  renderInicio();
}
